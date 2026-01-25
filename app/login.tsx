import { useAuth } from "@/providers/auth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const { signInWithKakao, session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && session) {
      router.replace("/(tabs)");
    }
  }, [session, loading]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0EA5E9" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center px-6">
      {/* 로고 섹션 */}
      <View className="items-center mb-16">
        <View className="w-24 h-24 bg-primary-100 rounded-full items-center justify-center mb-6">
          <Ionicons name="school-outline" size={48} color="#0EA5E9" />
        </View>
        <Text className="text-display-1 text-neutral-800">EduFit</Text>
        <Text className="text-body-1 text-neutral-500 mt-2 text-center">
          선생님을 위한 맞춤형 교육 자원 매칭 서비스
        </Text>
      </View>

      {/* 카카오 로그인 버튼 */}
      <View className="w-full">
        <Pressable onPress={signInWithKakao}>
          {({ pressed }) => (
            <View
              className={`py-5 px-6 min-h-[56px] rounded-lg items-center justify-center flex-row ${
                pressed ? "bg-[#E5CF00]" : "bg-[#FEE500]"
              }`}
            >
              <View className="flex-row items-center justify-center gap-2">
                <Ionicons name="chatbubble" size={20} color="#381E1F" />
                <Text className="text-[#381E1F] font-bold text-body-1">
                  카카오로 시작하기
                </Text>
              </View>
            </View>
          )}
        </Pressable>
      </View>

      {/* 약관 안내 */}
      <View className="mt-8 px-6">
        <Text className="text-caption-2 text-neutral-400 text-center leading-5">
          로그인하면 서비스 이용약관 및 개인정보 처리방침에{"\n"}동의하는 것으로
          간주합니다.
        </Text>
      </View>
    </SafeAreaView>
  );
}
