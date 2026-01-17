import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "./_providers/auth";

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
        <ActivityIndicator size="large" color="#FEE500" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center px-6">
      <View className="items-center mb-12">
        <Ionicons name="school-outline" size={80} color="#4F46E5" />
        <Text className="text-3xl font-bold text-gray-900 mt-4">EduFit</Text>
        <Text className="text-gray-500 mt-2 text-center">
          선생님을 위한 맞춤형 교육 자원 매칭 서비스
        </Text>
      </View>

      <TouchableOpacity
        onPress={signInWithKakao}
        className="w-full bg-[#FEE500] flex-row justify-center items-center py-4 rounded-xl shadow-sm active:bg-[#FDD835]"
      >
        <Ionicons
          name="chatbubble"
          size={24}
          color="#381E1F"
          className="mr-3"
        />
        <Text className="text-[#381E1F] font-bold text-lg ml-2">
          카카오로 시작하기
        </Text>
      </TouchableOpacity>

      <View className="mt-8 flex-row justify-center">
        <Text className="text-gray-400 text-xs text-center px-10">
          로그인하면 서비스 이용약관 및 개인정보 처리방침에 동의하는 것으로
          간주합니다.
        </Text>
      </View>
    </SafeAreaView>
  );
}
