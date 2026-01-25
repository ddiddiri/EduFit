import { useAuth } from "@/providers/auth";
import { Button } from "@/shared/ui/Button";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabOneScreen() {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "로그아웃",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace("/login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 헤더 - 로그아웃 버튼 */}
      <View className="flex-row justify-end px-6 pt-4">
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center gap-x-1"
        >
          <Ionicons name="log-out-outline" size={20} color="#6B7280" />
          <Text className="text-body-2 text-neutral-500">로그아웃</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* 히어로 섹션 */}
        <View className="px-6 pt-8 pb-8">
          <Text className="text-display-2 text-neutral-800 tracking-tight">
            학교의 환경과 목표에 맞게{"\n"}
            AI·코딩 수업을 <Text className="text-primary-500">설계합니다.</Text>
          </Text>
          <Text className="mt-4 text-body-1 text-neutral-500">
            맞춤형 교육 신청을 통해 바로 시작해보세요.
          </Text>
        </View>

        {/* 고민 해결 섹션 */}
        <View className="px-6 mt-4">
          <Text className="text-caption-2 font-bold text-neutral-400 uppercase tracking-widest mb-4">
            이런 고민 해보신적 있으신가요?
          </Text>

          <View className="gap-y-3">
            <PointItem
              icon="document-text-outline"
              text="체계적인 커리큘럼이 없어요"
            />
            <PointItem icon="bulb-outline" text="AI 전문성이 부족해요" />
            <PointItem
              icon="tablet-landscape-outline"
              text="미활용된 디지털 기기가 있어요"
            />
            <PointItem
              icon="stats-chart-outline"
              text="학생 간 AI 수준 격차가 발생해요"
            />
          </View>
        </View>

        {/* 교사 후기 섹션 */}
        <View className="mt-12 mx-6">
          <View className="p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <View className="flex-row mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Ionicons key={i} name="star" size={16} color="#0EA5E9" />
              ))}
            </View>
            <Text className="text-body-1 text-neutral-700 leading-relaxed italic">
              "체계적인 커리큘럼 덕분에 수업 준비 시간이 50% 줄었습니다"
            </Text>
            <View className="mt-4 flex-row items-center">
              <View className="w-10 h-10 bg-primary-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="person" size={18} color="#0EA5E9" />
              </View>
              <Text className="text-body-2 text-neutral-600 font-semibold">
                OO중 김교사
              </Text>
            </View>
          </View>
        </View>

        {/* 서비스 가치 섹션 */}
        <View className="mt-16 px-6">
          <Text className="text-title-1 text-neutral-800 mb-2">
            왜 우리 서비스인가요?
          </Text>
          <Text className="text-body-2 text-neutral-500 mb-8">
            저희 서비스는 이런 방식으로 문제를 해결해요.
          </Text>

          <View className="gap-y-4">
            <SolutionItem text="단순한 계획서 제공을 넘어선 실전형 교육" />
            <SolutionItem text="학교 인프라에 최적화된 맞춤형 설계" />
            <SolutionItem text="학생 교육부터 교사 전문 연수까지 통합 지원" />
            <SolutionItem text="전과목 AI 융합이 가능한 유연한 커리큘럼" />
          </View>
        </View>

        {/* 내 신청 내역 확인 섹션 */}
        <View className="mt-12 px-6">
          <Link href="/my-submissions" asChild>
            <Button
              type="light"
              variant="fill"
              display="full"
              size="large"
              leftIcon="list"
              className="border border-neutral-100"
            >
              내 신청 내역 확인
            </Button>
          </Link>
        </View>
      </ScrollView>

      {/* 하단 고정 CTA 버튼 */}
      <View className="absolute bottom-10 left-0 right-0 px-6">
        <Button
          type="primary"
          display="full"
          size="big"
          rightIcon="arrow-forward"
          onPress={() => router.push("/form1")}
        >
          신청 시작하기
        </Button>
      </View>
    </SafeAreaView>
  );
}

/**
 * 고민 포인트 아이템 컴포넌트
 */
function PointItem({
  icon,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}) {
  return (
    <View className="flex-row items-center border border-neutral-100 bg-white p-4 rounded-xl">
      <View className="w-10 h-10 bg-neutral-50 rounded-lg items-center justify-center mr-4">
        <Ionicons name={icon} size={22} color="#6B7280" />
      </View>
      <Text className="flex-1 text-body-1 text-neutral-700">{text}</Text>
    </View>
  );
}

/**
 * 해결 방안 아이템 컴포넌트
 */
function SolutionItem({ text }: { text: string }) {
  return (
    <View className="flex-row items-start gap-x-3">
      <View className="mt-0.5">
        <Ionicons name="checkmark-circle" size={24} color="#0EA5E9" />
      </View>
      <View className="flex-1 border-b border-neutral-100 pb-4">
        <Text className="text-body-1 text-neutral-800 font-medium leading-relaxed">
          {text}
        </Text>
      </View>
    </View>
  );
}
