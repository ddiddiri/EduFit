import { Button } from "@/shared/ui/Button";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { Icon } from "@/shared/ui/Icon";
import { Input } from "@/shared/ui/Input";
import { Selector } from "@/shared/ui/Selector";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TotalForm } from "../../shared/model/form.schema";

export default function Form2Screen() {
  const router = useRouter();
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext<TotalForm>();

  const gradeOptions = [
    { label: "1-2학년", value: "1-2학년" },
    { label: "3-4학년", value: "3-4학년" },
    { label: "5-6학년", value: "5-6학년" },
  ];

  const levelOptions = [
    { label: "초급", value: "초급" },
    { label: "중급", value: "중급" },
    { label: "고급", value: "고급" },
  ];

  const handleNext = async () => {
    const isValid = await trigger([
      "student_target_grade",
      "student_number",
      "student_level",
    ]);
    if (isValid) {
      router.push("/form3");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFBFC]" edges={["top"]}>
      {/* 헤더 */}
      <View className="px-5 py-4 flex-row items-center bg-white border-b border-neutral-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 -ml-2 mr-2"
        >
          <Icon name="chevronLeft" size={24} color="#1F2937" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-title-2 font-bold text-neutral-900">
            학생 정보
          </Text>
          <Text className="text-caption-1 text-neutral-500">Step 2 of 3</Text>
        </View>
        {/* Progress indicator */}
        <View className="flex-row gap-x-1.5">
          <View className="w-8 h-1.5 rounded-full bg-primary-500" />
          <View className="w-8 h-1.5 rounded-full bg-primary-500" />
          <View className="w-8 h-1.5 rounded-full bg-neutral-200" />
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 120,
        }}
      >
        {/* 섹션 안내 */}
        <View className="bg-amber-50 p-4 rounded-xl mb-6 flex-row items-start gap-x-3">
          <View className="w-8 h-8 bg-amber-100 rounded-lg items-center justify-center">
            <Icon name="users" size={18} color="#D97706" />
          </View>
          <View className="flex-1">
            <Text className="text-body-2 font-semibold text-amber-700">
              교육 대상 학생 정보를 입력해주세요
            </Text>
            <Text className="text-caption-1 text-amber-600 mt-1">
              학생 수준에 맞는 난이도로 커리큘럼을 구성합니다.
            </Text>
          </View>
        </View>

        <View className="gap-y-2">
          <Controller
            control={control}
            name="student_target_grade"
            render={({ field: { onChange, value } }) => (
              <>
                <Selector
                  label="대상 학년"
                  options={gradeOptions}
                  selectedValue={value}
                  onSelect={onChange}
                  placeholder="대상 학년을 선택해주세요"
                />
                <ErrorMessage message={errors.student_target_grade?.message} />
              </>
            )}
          />

          <Controller
            control={control}
            name="student_number"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  label="학생 수"
                  placeholder="예: 25"
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  helperText="수업에 참여할 학생 수를 입력해주세요"
                  leftIcon="usersOutline"
                />
                <ErrorMessage message={errors.student_number?.message} />
              </>
            )}
          />

          <Controller
            control={control}
            name="student_level"
            render={({ field: { onChange, value } }) => (
              <>
                <Selector
                  label="학생 수준"
                  options={levelOptions}
                  selectedValue={value}
                  onSelect={onChange}
                  placeholder="학생 수준을 선택해주세요"
                />
                <ErrorMessage message={errors.student_level?.message} />
              </>
            )}
          />
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-100 px-5 py-4 pb-10">
        <Button
          type="primary"
          display="full"
          size="big"
          rightIcon="arrowRight"
          onPress={handleNext}
        >
          다음 단계
        </Button>
      </View>
    </SafeAreaView>
  );
}
