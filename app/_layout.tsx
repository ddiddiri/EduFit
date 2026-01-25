import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import "./global.css";

import { AuthProvider, useAuth } from "@/components/AuthContext";
import MySplashScreen from "@/components/MySplashScreen";
import { useColorScheme } from "@/components/useColorScheme";
import { supabase } from "@/constants/supabase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import { ActivityIndicator, Platform, View } from "react-native";

const queryClient = new QueryClient();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PretendardVariable: require("../assets/fonts/PretendardVariable.ttf"),
    ...FontAwesome.font,
  });
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      setTimeout(() => {
        setIsSplashVisible(false);
      }, 2000);
    }
  }, [loaded]);

  if (!loaded || isSplashVisible) {
    return <MySplashScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const isLoginScreen = segments.join("/") === "login";

    if (!session && !isLoginScreen) {
      router.replace("/login");
    } else if (session && isLoginScreen) {
      router.replace("/(tabs)");
    }
  }, [session, loading, segments]);

  useEffect(() => {
    // 알림 권한 요청
    async function requestPermissions() {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return;
      }
    }

    requestPermissions();

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  }, []);

  useEffect(() => {
    if (!session?.user?.id) return;

    // 사용자 전용 채널 구독: user-notif:USER_ID
    const channel = supabase
      .channel(`user-notif:${session.user.id}`)
      .on("broadcast", { event: "submission-complete" }, (payload) => {
        console.log("Broadcast received:", payload);
        Notifications.scheduleNotificationAsync({
          content: {
            title: "신청 완료 🔔",
            body: payload.payload.message,
          },
          trigger: null, // 즉시 발송
        });
      })
      .subscribe((status) => {
        console.log(`Channel status for user ${session.user.id}:`, status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.user?.id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
