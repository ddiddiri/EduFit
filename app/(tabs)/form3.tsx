import { Button } from "@/shared/ui/Button";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { Header } from "@/shared/ui/Header";
import { Input } from "@/shared/ui/Input";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../shared/constant/supabase";
import { TotalForm } from "../../shared/model/form.schema";

import { CheckboxItem } from "@/shared/ui/Checkbox";
import { useAuth } from "../_providers/auth";

export default function Form3Screen() {
  const router = useRouter();
  const { user } = useAuth(); // Get user from AuthContext
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormContext<TotalForm>();

  const resourceOptions = [
    { label: "컴퓨터실 (1인 1PC)", value: "컴퓨터실" },
    { label: "노트북/태블릿 보유", value: "노트북/태블릿" },
    { label: "빔프로젝터 또는 TV", value: "빔프로젝터" },
    { label: "IoT/메이커 장비 있음", value: "IoT/메이커장비" },
    { label: "없음 (장비 지원 필요)", value: "없음" },
  ];

  const goalOptions = [
    { label: "AI 기초 체험", value: "AI기초" },
    { label: "코딩 기초", value: "코딩기초" },
    { label: "융합형 활동", value: "융합형" },
    { label: "데이터 수업", value: "데이터" },
    { label: "프로젝트형", value: "프로젝트형" },
    { label: "교사 연수", value: "교사연수" },
  ];

  const onSubmit = async (data: TotalForm) => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const { data: submission, error: subError } = await supabase
        .from("form_submissions")
        .insert([
          {
            status: "접수완료",
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (subError) throw subError;

      const submissionId = submission.id;

      const results = await Promise.all([
        supabase.from("school_info").insert([
          {
            submission_id: submissionId,
            type: data.school_type,
            name: data.school_name,
            area: data.school_area,
          },
        ]),
        supabase.from("teacher_info").insert([
          {
            submission_id: submissionId,
            name: data.teacher_name,
            phone: data.teacher_phone,
          },
        ]),
        supabase.from("student_info").insert([
          {
            submission_id: submissionId,
            target_grade: data.student_target_grade,
            student_count: parseInt(data.student_number) || 0,
            level: data.student_level,
          },
        ]),
        supabase.from("education_config").insert([
          {
            submission_id: submissionId,
            resources: data.school_resource,
            goals: data.education_goal,
            period: data.education_period,
            date: data.education_date,
          },
        ]),
      ]);

      const firstError = results.find((r) => r.error)?.error;
      if (firstError) throw firstError;

      const existingIdsJson = await SecureStore.getItemAsync("my_submissions");
      const existingIds = existingIdsJson ? JSON.parse(existingIdsJson) : [];
      const newIds = [...existingIds, submissionId];
      await SecureStore.setItemAsync("my_submissions", JSON.stringify(newIds));

      // 알림 전송: 사용자 전용 채널 (user-notif:USER_ID)
      await supabase.channel(`user-notif:${user.id}`).send({
        type: "broadcast",
        event: "submission-complete",
        payload: {
          message: `${data.teacher_name}님, ${data.school_name} 신청이 완료되었습니다!`,
        },
      });

      alert("상담 신청이 완료되었습니다!");
      reset();
      router.push("/");
    } catch (error: any) {
      console.error("Submission Error:", error);
      alert("제출 중 오류가 발생했습니다: " + error.message);
    }
  };

  const handleToggleArray = (
    value: string,
    currentArray: string[],
    onChange: (val: string[]) => void,
  ) => {
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    onChange(newArray);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="학교 자원 & 교육 목표 (3/3)" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 46,
          paddingTop: 40,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-[40px]">
          {/* 학교 자원 섹션 */}
          <View className="gap-[5px]">
            <Text className="text-sm text-black">학교 자원</Text>
            <View className="gap-[10px]">
              <Text className="text-xs text-black">
                학교 보유 자원 (복수 선택)
              </Text>
              <Controller
                control={control}
                name="school_resource"
                render={({ field: { value, onChange } }) => (
                  <View className="gap-[5px]">
                    {resourceOptions.map((opt) => (
                      <CheckboxItem
                        key={opt.value}
                        label={opt.label}
                        checked={value?.includes(opt.value)}
                        onPress={() =>
                          handleToggleArray(opt.value, value || [], onChange)
                        }
                      />
                    ))}
                    <ErrorMessage message={errors.school_resource?.message} />
                  </View>
                )}
              />
            </View>
          </View>

          {/* 교육 목표 섹션 */}
          <View className="gap-[5px]">
            <Text className="text-sm text-black">교육 목표</Text>
            <View className="gap-[10px]">
              <Text className="text-xs text-black">교육 목표 선택</Text>
              <Controller
                control={control}
                name="education_goal"
                render={({ field: { value, onChange } }) => (
                  <View className="gap-[5px]">
                    {goalOptions.map((opt) => (
                      <CheckboxItem
                        key={opt.value}
                        label={opt.label}
                        checked={value?.includes(opt.value)}
                        onPress={() =>
                          handleToggleArray(opt.value, value || [], onChange)
                        }
                      />
                    ))}
                    <ErrorMessage message={errors.education_goal?.message} />
                  </View>
                )}
              />
            </View>
          </View>

          {/* 기간 섹션 */}
          <Controller
            control={control}
            name="education_period"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  label="기간"
                  placeholder="예: 1~2차시 / 3~6차시 / 4주 프로젝트 등"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <ErrorMessage message={errors.education_period?.message} />
              </>
            )}
          />

          {/* 일정 섹션 */}
          <Controller
            control={control}
            name="education_date"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  label="일정"
                  placeholder="예: 3월 둘째 주 / 5월 10일 등"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <ErrorMessage message={errors.education_date?.message} />
              </>
            )}
          />
        </View>
      </ScrollView>

      <Button title="신청 완료" onPress={handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
}
