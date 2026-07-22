import { supabase } from "@/constants/supabase";
import { getEditingSubmissionId, setEditingSubmissionId } from "@/services/editSession";
import { getItem } from "@/services/storage";
import { Tables } from "@/types/database.types";
import { TotalForm } from "@/types/form.schema";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFormContext } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";

type Submission = Tables<"form_submissions"> & {
  school_info: Pick<Tables<"school_info">, "name" | "type" | "area">[];
  student_info: Pick<
    Tables<"student_info">,
    "target_grade" | "student_count" | "level"
  >[];
  education_config: Pick<
    Tables<"education_config">,
    "resources" | "goals" | "period" | "date"
  >[];
};

const CANCELLED = "취소됨";

export default function MySubmissionsScreen() {
  const router = useRouter();
  const { reset } = useFormContext<TotalForm>();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // 로그인 없이 운영하므로, 이 기기에서 제출한 신청 ID 목록을 로컬 저장소에서 읽어 조회
  const fetchSubmissions = async () => {
    try {
      const idsJson = await getItem("my_submissions");
      const ids: string[] = idsJson ? JSON.parse(idsJson) : [];

      if (ids.length === 0) {
        setSubmissions([]);
        return;
      }

      const { data, error } = await supabase
        .from("form_submissions")
        .select(
          "*, school_info(name, type, area), student_info(target_grade, student_count, level), education_config(resources, goals, period, date)",
        )
        .in("id", ids)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setSubmissions(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const confirm = (message: string, onOk: () => void) => {
    if (Platform.OS === "web") {
      if (window.confirm(message)) onOk();
    } else {
      Alert.alert("확인", message, [
        { text: "아니오", style: "cancel" },
        { text: "예", onPress: onOk },
      ]);
    }
  };

  const notify = (message: string) => {
    if (Platform.OS === "web") {
      alert(message);
    } else {
      Alert.alert("알림", message);
    }
  };

  // 신청 취소: status만 변경 (RLS가 status 컬럼 update만 허용)
  const handleCancel = (item: Submission) => {
    confirm("이 신청을 취소하시겠습니까?", async () => {
      setBusyId(item.id);
      try {
        const { error } = await supabase
          .from("form_submissions")
          .update({ status: CANCELLED })
          .eq("id", item.id);
        if (error) throw error;
        setSubmissions((prev) =>
          prev.map((s) => (s.id === item.id ? { ...s, status: CANCELLED } : s)),
        );
      } catch (error: any) {
        console.error("Cancel error:", error);
        notify("취소 처리 중 오류가 발생했습니다: " + error.message);
      } finally {
        setBusyId(null);
      }
    });
  };

  // 신청 수정: 기존 내용을 폼에 채워 재신청 → 제출 완료 시 기존 건은 자동 취소됨.
  // 교사 이름/연락처는 개인정보 보호를 위해 조회가 차단되어 있어 다시 입력해야 함.
  const handleEdit = (item: Submission) => {
    confirm(
      "기존 내용을 불러와 수정 후 다시 제출합니다.\n(담당 교사 이름과 연락처는 개인정보 보호를 위해 다시 입력해주세요)\n계속하시겠습니까?",
      () => {
        const school = item.school_info?.[0];
        const student = item.student_info?.[0];
        const edu = item.education_config?.[0];
        reset({
          school_type: (school?.type as TotalForm["school_type"]) || "초등학교",
          school_name: school?.name || "",
          school_area: school?.area || "",
          teacher_name: "",
          teacher_phone: "",
          student_target_grade: student?.target_grade || "",
          student_number:
            student?.student_count != null ? String(student.student_count) : "",
          student_level: student?.level || "초급",
          school_resource: (edu?.resources as string[]) || [],
          education_goal: (edu?.goals as string[]) || [],
          education_period: edu?.period || "",
          education_date: edu?.date || "",
        });
        setEditingSubmissionId(item.id);
        router.push("/form1");
      },
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fafaf8]">
      <View className="px-6 py-4 flex-row items-center border-b border-gray-100 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-black">내 신청 내역</Text>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4F46E5" />
        </View>
      ) : submissions.length === 0 ? (
        <View className="flex-1 justify-center items-center px-10">
          <Ionicons name="document-text-outline" size={64} color="#D1D5DB" />
          <Text className="mt-4 text-lg text-gray-500 font-medium text-center">
            이 기기에서 신청하신 내역이 없습니다.
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/form1")}
            className="mt-6 bg-indigo-600 px-8 py-3 rounded-xl"
          >
            <Text className="text-white font-bold">첫 신청 시작하기</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView className="flex-1 px-6 pt-6">
          <View className="gap-y-4 pb-10">
            {submissions.map((item) => {
              const cancelled = item.status === CANCELLED;
              return (
                <View
                  key={item.id}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100"
                >
                  <View className="flex-row justify-between items-start mb-3">
                    <View>
                      <Text className="text-xs text-gray-400 font-semibold mb-1">
                        신청일:{" "}
                        {new Date(item.created_at).toLocaleDateString("ko-KR")}
                      </Text>
                      <Text className="text-lg font-bold text-gray-800">
                        {item.school_info?.[0]?.name || "학교명 미입력"}
                      </Text>
                    </View>
                    <View
                      className={`px-3 py-1 rounded-full ${cancelled ? "bg-gray-100" : "bg-indigo-50"}`}
                    >
                      <Text
                        className={`text-xs font-bold ${cancelled ? "text-gray-400" : "text-indigo-600"}`}
                      >
                        {item.status || "상태 없음"}
                      </Text>
                    </View>
                  </View>

                  <View className="bg-gray-50 p-3 rounded-xl mb-3">
                    <View className="flex-row justify-between mb-2">
                      <Text className="text-sm text-gray-500">대상 학년</Text>
                      <Text className="text-sm font-medium text-gray-800">
                        {item.student_info?.[0]?.target_grade || "-"}
                      </Text>
                    </View>
                    <View className="flex-row justify-between mb-2">
                      <Text className="text-sm text-gray-500">인원</Text>
                      <Text className="text-sm font-medium text-gray-800">
                        {item.student_info?.[0]?.student_count
                          ? `${item.student_info[0].student_count}명`
                          : "-"}
                      </Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-sm text-gray-500">수준</Text>
                      <Text className="text-sm font-medium text-gray-800">
                        {item.student_info?.[0]?.level || "-"}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center mt-2 pt-3 border-t border-gray-50">
                    <Text className="text-sm text-gray-500">신청 ID: </Text>
                    <Text className="text-sm text-gray-400 font-mono">
                      {item.id.substring(0, 8)}...
                    </Text>
                  </View>

                  {!cancelled && (
                    <View className="flex-row gap-x-3 mt-4">
                      <TouchableOpacity
                        onPress={() => handleEdit(item)}
                        disabled={busyId === item.id}
                        className="flex-1 h-11 justify-center items-center rounded-xl border border-indigo-600"
                      >
                        <Text className="text-sm font-bold text-indigo-600">
                          수정하기
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleCancel(item)}
                        disabled={busyId === item.id}
                        className="flex-1 h-11 justify-center items-center rounded-xl border border-red-300"
                      >
                        <Text className="text-sm font-bold text-red-500">
                          {busyId === item.id ? "처리 중..." : "신청 취소"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
