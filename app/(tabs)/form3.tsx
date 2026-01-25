import { useCreateSubmission } from "@/entities/submission/model/useCreateSubmission";
import { useAuth } from "@/providers/auth";
import { TotalForm } from "@/shared/model/form.schema";
import { Button } from "@/shared/ui/Button";
import { CheckboxItem } from "@/shared/ui/Checkbox";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { Header } from "@/shared/ui/Header";
import { Input } from "@/shared/ui/Input";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Form3Screen() {
  const router = useRouter();
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormContext<TotalForm>();
  const createSubmission = useCreateSubmission();

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
      Alert.alert("알림", "로그인이 필요합니다.");
      return;
    }

    createSubmission.mutate(
      { data, userId: user.id },
      {
        onSuccess: () => {
          Alert.alert("알림", "상담 신청이 완료되었습니다!");
          reset();
          router.push("/");
        },
        onError: (error: any) => {
          console.error("Submission Error:", error);
          Alert.alert("오류", "제출 중 오류가 발생했습니다: " + error.message);
        },
      },
    );
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
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <Header title="학교 자원 & 교육 목표 (3/3)" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 32,
          paddingBottom: 140,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-y-8">
          {/* 학교 자원 섹션 */}
          <View className="gap-y-3">
            <Text className="text-title-3 text-neutral-800">학교 자원</Text>
            <View className="gap-y-2">
              <Text className="text-body-2 text-neutral-500">
                학교 보유 자원 (복수 선택 가능)
              </Text>
              <Controller
                control={control}
                name="school_resource"
                render={({ field: { value, onChange } }) => (
                  <View className="bg-neutral-50 rounded-lg p-4 gap-y-1">
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
                  </View>
                )}
              />
              <ErrorMessage message={errors.school_resource?.message} />
            </View>
          </View>

          {/* 교육 목표 섹션 */}
          <View className="gap-y-3">
            <Text className="text-title-3 text-neutral-800">교육 목표</Text>
            <View className="gap-y-2">
              <Text className="text-body-2 text-neutral-500">
                희망하는 교육 목표 (복수 선택 가능)
              </Text>
              <Controller
                control={control}
                name="education_goal"
                render={({ field: { value, onChange } }) => (
                  <View className="bg-neutral-50 rounded-lg p-4 gap-y-1">
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
                  </View>
                )}
              />
              <ErrorMessage message={errors.education_goal?.message} />
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
                  helperText="희망하는 교육 기간을 입력해주세요"
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
                  helperText="희망하는 교육 일정을 입력해주세요"
                />
                <ErrorMessage message={errors.education_date?.message} />
              </>
            )}
          />
        </View>
      </ScrollView>

      <View className="absolute bottom-10 left-0 right-0 px-6">
        <Button
          type="primary"
          display="full"
          size="big"
          onPress={handleSubmit(onSubmit)}
          loading={createSubmission.isPending}
          disabled={createSubmission.isPending}
        >
          {createSubmission.isPending ? "신청 중..." : "신청 완료"}
        </Button>
      </View>
    </SafeAreaView>
  );
}
