import { useAuth } from "@/providers/auth";
import { Icon } from "@/shared/ui/Icon";
import { FontAwesome } from "@expo/vector-icons";
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
    <SafeAreaView className="flex-1 bg-[#FAFBFC] justify-center items-center px-6">
      {/* 로고 섹션 */}
      <View className="items-center mb-16">
        <View className="w-24 h-24 bg-primary-500 rounded-3xl items-center justify-center mb-6 shadow-lg shadow-primary-500/30">
          <Icon name="robot" size={48} color="#ffffff" />
        </View>
        <Text className="text-display-1 text-neutral-900 font-bold">
          EduFit
        </Text>
        <Text className="text-body-1 text-neutral-500 mt-2 text-center">
          선생님을 위한 맞춤형 AI·코딩 교육 서비스
        </Text>
      </View>

      {/* 기능 미리보기 */}
      <View className="w-full bg-white rounded-2xl p-5 mb-8 border border-neutral-100">
        <View className="flex-row items-center gap-x-4 mb-4">
          <View className="w-10 h-10 bg-primary-50 rounded-xl items-center justify-center">
            <Icon name="school" size={20} color="#0EA5E9" />
          </View>
          <View className="flex-1">
            <Text className="text-body-2 font-semibold text-neutral-800">
              맞춤형 커리큘럼 설계
            </Text>
            <Text className="text-caption-1 text-neutral-500">
              학교 환경에 최적화된 교육
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-x-4 mb-4">
          <View className="w-10 h-10 bg-amber-50 rounded-xl items-center justify-center">
            <Icon name="users" size={20} color="#D97706" />
          </View>
          <View className="flex-1">
            <Text className="text-body-2 font-semibold text-neutral-800">
              수준별 맞춤 교육
            </Text>
            <Text className="text-caption-1 text-neutral-500">
              학생 수준에 맞는 난이도 조절
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-x-4">
          <View className="w-10 h-10 bg-green-50 rounded-xl items-center justify-center">
            <Icon name="clipboard" size={20} color="#059669" />
          </View>
          <View className="flex-1">
            <Text className="text-body-2 font-semibold text-neutral-800">
              간편한 신청 관리
            </Text>
            <Text className="text-caption-1 text-neutral-500">
              신청 내역 실시간 확인
            </Text>
          </View>
        </View>
      </View>

      {/* 카카오 로그인 버튼 */}
      <View className="w-full">
        <Pressable onPress={signInWithKakao}>
          {({ pressed }) => (
            <View
              className={`py-5 px-6 min-h-[56px] rounded-2xl items-center justify-center flex-row ${
                pressed ? "bg-[#E5CF00]" : "bg-[#FEE500]"
              }`}
            >
              <View className="flex-row items-center justify-center gap-x-2">
                <FontAwesome name="comment" size={24} color="#381E1F" />
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
