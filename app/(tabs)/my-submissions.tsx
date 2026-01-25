import { useSubmissions } from "@/entities/submission/model/useSubmissions";
import { useAuth } from "@/providers/auth";
import { useRefreshOnFocus } from "@/shared/hooks/useRefreshOnFocus";
import { Icon } from "@/shared/ui/Icon";
import { useRouter } from "expo-router";
import React from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MySubmissionsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: submissions = [], isLoading: loading } = useSubmissions(
    user?.id,
  );

  // 화면 포커스 시 리패치
  useRefreshOnFocus(user?.id ? ["submissions", user.id] : ["submissions"]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "접수완료":
        return { bg: "bg-primary-50", text: "text-primary-600" };
      case "검토중":
        return { bg: "bg-amber-50", text: "text-amber-600" };
      case "승인":
        return { bg: "bg-green-50", text: "text-green-600" };
      case "반려":
        return { bg: "bg-red-50", text: "text-red-600" };
      default:
        return { bg: "bg-neutral-100", text: "text-neutral-600" };
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFBFC]" edges={["top"]}>
      {/* 헤더 */}
      <View className="px-5 py-4 flex-row items-center bg-white border-b border-neutral-100">
        <View className="flex-row items-center gap-x-3">
          <View className="w-8 h-8 bg-primary-50 rounded-lg items-center justify-center">
            <Icon name="clipboard" size={18} color="#0EA5E9" />
          </View>
          <Text className="text-title-2 font-bold text-neutral-900">
            신청 내역
          </Text>
        </View>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0EA5E9" />
          <Text className="mt-4 text-body-2 text-neutral-500">
            신청 내역을 불러오는 중...
          </Text>
        </View>
      ) : submissions.length === 0 ? (
        <View className="flex-1 justify-center items-center px-10">
          <View className="w-20 h-20 bg-neutral-100 rounded-full items-center justify-center mb-4">
            <Icon name="documentOutline" size={40} color="#D1D5DB" />
          </View>
          <Text className="text-title-3 text-neutral-800 font-semibold text-center">
            아직 신청 내역이 없습니다
          </Text>
          <Text className="mt-2 text-body-2 text-neutral-500 text-center">
            교육 신청을 시작해보세요!
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/form1")}
            className="mt-6 bg-primary-500 px-6 py-3.5 rounded-xl flex-row items-center gap-x-2"
          >
            <Icon name="add" size={20} color="#ffffff" />
            <Text className="text-body-1 text-white font-bold">
              첫 신청 시작하기
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* 신청 통계 */}
          <View className="flex-row gap-x-3 mb-6">
            <View className="flex-1 bg-white p-4 rounded-xl border border-neutral-100">
              <Text className="text-caption-1 text-neutral-500 mb-1">
                전체 신청
              </Text>
              <Text className="text-title-1 font-bold text-neutral-900">
                {submissions.length}건
              </Text>
            </View>
            <View className="flex-1 bg-primary-50 p-4 rounded-xl border border-primary-100">
              <Text className="text-caption-1 text-primary-600 mb-1">
                진행중
              </Text>
              <Text className="text-title-1 font-bold text-primary-600">
                {
                  submissions.filter(
                    (s) => s.status === "접수완료" || s.status === "검토중",
                  ).length
                }
                건
              </Text>
            </View>
          </View>

          {/* 신청 목록 */}
          <View className="gap-y-4">
            {submissions.map((item, index) => {
              const statusStyle = getStatusColor(item.status || "접수완료");
              return (
                <View
                  key={item.id}
                  className="bg-white rounded-2xl border border-neutral-100 overflow-hidden"
                >
                  {/* 카드 헤더 */}
                  <View className="p-4 border-b border-neutral-50">
                    <View className="flex-row justify-between items-start">
                      <View className="flex-1">
                        <View className="flex-row items-center gap-x-2 mb-2">
                          <View className="w-6 h-6 bg-primary-100 rounded-md items-center justify-center">
                            <Icon name="school" size={14} color="#0EA5E9" />
                          </View>
                          <Text className="text-title-3 font-bold text-neutral-900">
                            {item.school_info?.[0]?.name || "학교명 미입력"}
                          </Text>
                        </View>
                        <Text className="text-caption-1 text-neutral-400">
                          신청일:{" "}
                          {new Date(item.created_at).toLocaleDateString(
                            "ko-KR",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </Text>
                      </View>
                      <View
                        className={`px-3 py-1.5 rounded-full ${statusStyle.bg}`}
                      >
                        <Text
                          className={`text-caption-1 font-bold ${statusStyle.text}`}
                        >
                          {item.status || "접수완료"}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* 카드 바디 */}
                  <View className="p-4">
                    <View className="flex-row">
                      <View className="flex-1">
                        <View className="flex-row items-center gap-x-2 mb-3">
                          <Icon name="usersOutline" size={16} color="#9CA3AF" />
                          <Text className="text-caption-1 text-neutral-500">
                            대상 학년
                          </Text>
                        </View>
                        <Text className="text-body-2 font-semibold text-neutral-800">
                          {item.student_info?.[0]?.target_grade || "-"}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <View className="flex-row items-center gap-x-2 mb-3">
                          <Icon name="userOutline" size={16} color="#9CA3AF" />
                          <Text className="text-caption-1 text-neutral-500">
                            인원
                          </Text>
                        </View>
                        <Text className="text-body-2 font-semibold text-neutral-800">
                          {item.student_info?.[0]?.student_count
                            ? `${item.student_info[0].student_count}명`
                            : "-"}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <View className="flex-row items-center gap-x-2 mb-3">
                          <Icon name="chartOutline" size={16} color="#9CA3AF" />
                          <Text className="text-caption-1 text-neutral-500">
                            수준
                          </Text>
                        </View>
                        <Text className="text-body-2 font-semibold text-neutral-800">
                          {item.student_info?.[0]?.level || "-"}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* 카드 푸터 */}
                  <View className="px-4 py-3 bg-neutral-50 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-x-1">
                      <Icon name="copyOutline" size={14} color="#9CA3AF" />
                      <Text className="text-caption-2 text-neutral-400 font-mono">
                        #{item.id.substring(0, 8)}
                      </Text>
                    </View>
                    <TouchableOpacity className="flex-row items-center gap-x-1">
                      <Text className="text-caption-1 text-primary-500 font-semibold">
                        상세보기
                      </Text>
                      <Icon name="chevronRight" size={14} color="#0EA5E9" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>

          {/* 하단 여백 */}
          <View className="h-6" />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
