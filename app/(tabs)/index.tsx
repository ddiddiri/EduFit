import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabOneScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#fafaf8]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* 히어로 섹션 */}
        <View className="px-6 pt-12 pb-8">
          <Text className="text-[28px] font-bold text-black leading-[38px] tracking-tight">
            학교의 환경과 목표에 맞게{"\n"}
            AI·코딩 수업을 <Text className="text-indigo-600">설계합니다.</Text>
          </Text>
          <Text className="mt-4 text-base text-gray-500 font-medium">
            맞춤형 교육 신청을 통해 바로 시작해보세요.
          </Text>
        </View>

        {/* 고민 해결 섹션 */}
        <View className="px-6 mt-4">
          <Text className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
            이런 고민 해보신적 있으신가요?
          </Text>

          <View className="gap-y-4">
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

        {/* 슬로건 섹션 */}
        <View className="mt-12 mx-6">
          <View className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100 flex-col">
            <Text className="text-[15px] text-gray-800 leading-relaxed font-medium italic">
              "수업은 찾아가고, 주제는 학교에 맞춥니다"
            </Text>
            <View className="mt-4 flex-row items-center">
              <View className="w-8 h-8 bg-indigo-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="school" size={16} color="#4F46E5" />
              </View>
              <Text className="text-sm text-gray-500 font-semibold">
                ClassFit AI — 찾아가는 학교 맞춤형 AI 코딩융합 교육
              </Text>
            </View>
          </View>
        </View>

        {/* 서비스 가치 섹션 */}
        <View className="mt-16 px-6">
          <Text className="text-2xl font-bold text-black mb-2">
            왜 우리 서비스인가요?
          </Text>
          <Text className="text-sm font-medium text-gray-500 mb-8">
            저희 서비스는 이런 방식으로 문제를 해결해요.
          </Text>

          <View className="gap-y-5">
            <SolutionItem text="단순한 계획서 제공을 넘어선 실전형 교육" />
            <SolutionItem text="학교 인프라에 최적화된 맞춤형 설계" />
            <SolutionItem text="학생 교육부터 교사 전문 연수까지 통합 지원" />
            <SolutionItem text="전과목 AI 융합이 가능한 유연한 커리큘럼" />
          </View>
        </View>

        {/* 내 신청 내역 확인 섹션 */}
        <View className="mt-12 px-6">
          <Link href="/my-submissions" asChild>
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm"
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-indigo-50 rounded-full items-center justify-center mr-4">
                  <Ionicons name="list" size={20} color="#6366f1" />
                </View>
                <View>
                  <Text className="text-base font-bold text-gray-800">
                    내 신청 내역 확인
                  </Text>
                  <Text className="text-xs text-gray-400">
                    기존에 신청한 내용을 확인하세요
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>

      {/* 하단 고정 CTA 버튼 */}
      <View className="absolute bottom-10 left-0 right-0 px-6">
        <Link href="/form1" asChild>
          <TouchableOpacity
            activeOpacity={0.9}
            className="bg-indigo-600 h-16 rounded-2xl flex-row justify-center items-center shadow-xl shadow-indigo-400"
          >
            <Text className="text-lg font-bold text-white">신청 시작하기</Text>
            <Ionicons
              name="arrow-forward"
              size={20}
              color="white"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

/**
 * 고민 포인트 아이템 컴포넌트
 */
function PointItem({ icon, text }: { icon: any; text: string }) {
  return (
    <View className="flex-row items-center border border-gray-100 bg-white p-4 rounded-xl">
      <View className="w-10 h-10 bg-gray-50 rounded-lg items-center justify-center mr-4">
        <Ionicons name={icon} size={22} color="#4b5563" />
      </View>
      <Text className="flex-1 text-base text-gray-700 font-medium">{text}</Text>
    </View>
  );
}

/**
 * 해결 방안 아이템 컴포넌트
 */
function SolutionItem({ text }: { text: string }) {
  return (
    <View className="flex-row items-start gap-x-4">
      <View className="mt-1">
        <Ionicons name="checkmark-circle" size={24} color="#6366f1" />
      </View>
      <View className="flex-1 border-b border-gray-100 pb-4">
        <Text className="text-base text-gray-800 font-semibold leading-relaxed">
          {text}
        </Text>
      </View>
    </View>
  );
}
