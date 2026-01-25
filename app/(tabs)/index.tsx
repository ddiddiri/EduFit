import { useAuth } from "@/providers/auth";
import { Icon } from "@/shared/ui/Icon";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabOneScreen() {
  const router = useRouter();
  const { signOut, user } = useAuth();

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
    <SafeAreaView className="flex-1 bg-[#FAFBFC]" edges={["top"]}>
      {/* 헤더 */}
      <View className="px-5 py-4 flex-row items-center justify-between bg-white border-b border-neutral-100">
        <View className="flex-row items-center gap-x-2">
          <View className="w-8 h-8 bg-primary-500 rounded-lg items-center justify-center">
            <Icon name="robot" size={18} color="#ffffff" />
          </View>
          <Text className="text-title-2 font-bold text-neutral-900">
            EduFit
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center gap-x-1 px-3 py-2 rounded-full bg-neutral-50"
        >
          <Icon name="logoutBold" size={18} color="#6B7280" />
          <Text className="text-caption-1 text-neutral-500">로그아웃</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* 히어로 섹션 */}
        <View className="px-5 pt-8 pb-6 bg-white">
          <View className="bg-primary-50 px-3 py-1.5 rounded-full self-start mb-4">
            <Text className="text-caption-1 font-semibold text-primary-600">
              AI·코딩 교육 전문
            </Text>
          </View>
          <Text className="text-display-2 text-neutral-900 tracking-tight leading-tight">
            학교 환경에 맞춘{"\n"}
            <Text className="text-primary-500">맞춤형 AI 교육</Text>을{"\n"}
            설계해드립니다
          </Text>
          <Text className="mt-4 text-body-1 text-neutral-500 leading-relaxed">
            학교의 인프라와 목표에 최적화된{"\n"}체계적인 커리큘럼을 제공합니다.
          </Text>

          {/* 빠른 시작 버튼 */}
          <TouchableOpacity
            onPress={() => router.push("/form1")}
            className="mt-6 bg-primary-500 py-4 px-6 rounded-2xl flex-row items-center justify-center gap-x-2 shadow-lg shadow-primary-500/30"
          >
            <Icon name="send" size={20} color="#ffffff" />
            <Text className="text-body-1 font-bold text-white">
              교육 신청 시작하기
            </Text>
          </TouchableOpacity>
        </View>

        {/* 구분선 */}
        <View className="h-2 bg-neutral-100" />

        {/* 고민 해결 섹션 */}
        <View className="px-5 pt-8 pb-6 bg-white">
          <View className="flex-row items-center gap-x-2 mb-6">
            <Icon name="bulb" size={20} color="#0EA5E9" />
            <Text className="text-title-3 font-bold text-neutral-900">
              이런 고민이 있으신가요?
            </Text>
          </View>

          <View className="gap-y-3">
            <ProblemCard
              icon="document"
              title="커리큘럼 부재"
              desc="체계적인 AI 교육 커리큘럼이 없어요"
            />
            <ProblemCard
              icon="cpu"
              title="전문성 부족"
              desc="AI·코딩 교육 경험이 부족해요"
            />
            <ProblemCard
              icon="laptop"
              title="장비 미활용"
              desc="보유 중인 디지털 기기를 활용하지 못해요"
            />
            <ProblemCard
              icon="users"
              title="수준 격차"
              desc="학생 간 AI 수준 격차가 커요"
            />
          </View>
        </View>

        {/* 구분선 */}
        <View className="h-2 bg-neutral-100" />

        {/* 교사 후기 섹션 */}
        <View className="px-5 pt-8 pb-6 bg-white">
          <View className="flex-row items-center gap-x-2 mb-6">
            <Icon name="star" size={20} color="#F59E0B" />
            <Text className="text-title-3 font-bold text-neutral-900">
              교사 후기
            </Text>
          </View>

          <View className="bg-gradient-to-br p-5 rounded-2xl border border-primary-100 bg-primary-50/50">
            <View className="flex-row mb-3 gap-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Icon key={i} name="star" size={16} color="#F59E0B" />
              ))}
            </View>
            <Text className="text-body-1 text-neutral-700 leading-relaxed">
              "체계적인 커리큘럼 덕분에{"\n"}
              <Text className="font-bold text-neutral-900">
                수업 준비 시간이 50% 줄었습니다
              </Text>
              "
            </Text>
            <View className="mt-4 flex-row items-center">
              <View className="w-10 h-10 bg-primary-100 rounded-full items-center justify-center mr-3">
                <Icon name="user" size={18} color="#0EA5E9" />
              </View>
              <View>
                <Text className="text-body-2 text-neutral-800 font-semibold">
                  OO중 김교사
                </Text>
                <Text className="text-caption-1 text-neutral-400">
                  3학년 담임
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 구분선 */}
        <View className="h-2 bg-neutral-100" />

        {/* 서비스 가치 섹션 */}
        <View className="px-5 pt-8 pb-6 bg-white">
          <View className="flex-row items-center gap-x-2 mb-2">
            <Icon name="check" size={20} color="#10B981" />
            <Text className="text-title-3 font-bold text-neutral-900">
              왜 EduFit인가요?
            </Text>
          </View>
          <Text className="text-body-2 text-neutral-500 mb-6">
            저희 서비스가 제공하는 핵심 가치입니다.
          </Text>

          <View className="gap-y-3">
            <ValueCard
              icon="target"
              title="실전형 교육"
              desc="단순한 계획서가 아닌 실전 맞춤 설계"
            />
            <ValueCard
              icon="layers"
              title="맞춤형 설계"
              desc="학교 인프라에 최적화된 커리큘럼"
            />
            <ValueCard
              icon="school"
              title="통합 지원"
              desc="학생 교육부터 교사 연수까지"
            />
            <ValueCard
              icon="code"
              title="유연한 구성"
              desc="전과목 AI 융합이 가능한 커리큘럼"
            />
          </View>
        </View>

        {/* 구분선 */}
        <View className="h-2 bg-neutral-100" />

        {/* 퀵 메뉴 섹션 */}
        <View className="px-5 pt-8 pb-6 bg-white">
          <Text className="text-title-3 font-bold text-neutral-900 mb-4">
            빠른 메뉴
          </Text>
          <View className="flex-row gap-x-3">
            <QuickMenuCard
              icon="edit"
              title="신청하기"
              desc="교육 신청"
              onPress={() => router.push("/form1")}
              primary
            />
            <QuickMenuCard
              icon="clipboard"
              title="신청내역"
              desc="내역 확인"
              onPress={() => router.push("/my-submissions")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * 문제점 카드 컴포넌트
 */
function ProblemCard({
  icon,
  title,
  desc,
}: {
  icon: "document" | "cpu" | "laptop" | "users";
  title: string;
  desc: string;
}) {
  return (
    <View className="flex-row items-center bg-neutral-50 p-4 rounded-xl">
      <View className="w-11 h-11 bg-white rounded-xl items-center justify-center mr-4 shadow-sm">
        <Icon name={icon} size={22} color="#6B7280" />
      </View>
      <View className="flex-1">
        <Text className="text-body-2 font-semibold text-neutral-800">
          {title}
        </Text>
        <Text className="text-caption-1 text-neutral-500 mt-0.5">{desc}</Text>
      </View>
    </View>
  );
}

/**
 * 가치 카드 컴포넌트
 */
function ValueCard({
  icon,
  title,
  desc,
}: {
  icon: "target" | "layers" | "school" | "code";
  title: string;
  desc: string;
}) {
  return (
    <View className="flex-row items-center p-4 rounded-xl border border-neutral-100 bg-white">
      <View className="w-10 h-10 bg-primary-50 rounded-lg items-center justify-center mr-4">
        <Icon name={icon} size={20} color="#0EA5E9" />
      </View>
      <View className="flex-1">
        <Text className="text-body-2 font-semibold text-neutral-800">
          {title}
        </Text>
        <Text className="text-caption-1 text-neutral-500 mt-0.5">{desc}</Text>
      </View>
      <Icon name="chevronRight" size={20} color="#D1D5DB" />
    </View>
  );
}

/**
 * 퀵 메뉴 카드 컴포넌트
 */
function QuickMenuCard({
  icon,
  title,
  desc,
  onPress,
  primary = false,
}: {
  icon: "edit" | "clipboard";
  title: string;
  desc: string;
  onPress: () => void;
  primary?: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-1 p-4 rounded-2xl ${
        primary ? "bg-primary-500" : "bg-neutral-100"
      }`}
    >
      <View
        className={`w-10 h-10 rounded-xl items-center justify-center mb-3 ${
          primary ? "bg-white/20" : "bg-white"
        }`}
      >
        <Icon name={icon} size={20} color={primary ? "#ffffff" : "#6B7280"} />
      </View>
      <Text
        className={`text-body-1 font-bold ${
          primary ? "text-white" : "text-neutral-800"
        }`}
      >
        {title}
      </Text>
      <Text
        className={`text-caption-1 mt-1 ${
          primary ? "text-white/70" : "text-neutral-500"
        }`}
      >
        {desc}
      </Text>
    </TouchableOpacity>
  );
}
