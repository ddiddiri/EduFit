import { Button } from "@/shared/ui/Button";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { Icon } from "@/shared/ui/Icon";
import { Input } from "@/shared/ui/Input";
import { Selector } from "@/shared/ui/Selector";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TotalForm } from "../../shared/model/form.schema";
import { SchoolSearchModal } from "../../widgets/SchoolSearchModal/ui";

export default function Form1Screen() {
  const router = useRouter();
  const {
    control,
    formState: { errors },
    trigger,
    setValue,
  } = useFormContext<TotalForm>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const schoolOptions = [
    { label: "초등학교", value: "초등학교" },
    { label: "중학교", value: "중학교" },
    { label: "고등학교", value: "고등학교" },
  ];

  const handleNext = async () => {
    const isValid = await trigger([
      "school_type",
      "school_name",
      "school_area",
      "teacher_name",
      "teacher_phone",
    ]);
    if (isValid) {
      router.push("/form2");
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
            기본 정보
          </Text>
          <Text className="text-caption-1 text-neutral-500">Step 1 of 3</Text>
        </View>
        {/* Progress indicator */}
        <View className="flex-row gap-x-1.5">
          <View className="w-8 h-1.5 rounded-full bg-primary-500" />
          <View className="w-8 h-1.5 rounded-full bg-neutral-200" />
          <View className="w-8 h-1.5 rounded-full bg-neutral-200" />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        className="flex-1 px-5 pt-6"
        showsVerticalScrollIndicator={false}
      >
        {/* 섹션 안내 */}
        <View className="bg-primary-50 p-4 rounded-xl mb-6 flex-row items-start gap-x-3">
          <View className="w-8 h-8 bg-primary-100 rounded-lg items-center justify-center">
            <Icon name="school" size={18} color="#0EA5E9" />
          </View>
          <View className="flex-1">
            <Text className="text-body-2 font-semibold text-primary-700">
              학교 및 교사 정보를 입력해주세요
            </Text>
            <Text className="text-caption-1 text-primary-600 mt-1">
              입력하신 정보를 바탕으로 맞춤 커리큘럼을 설계합니다.
            </Text>
          </View>
        </View>

        <View className="gap-y-2">
          <Controller
            control={control}
            name="school_type"
            render={({ field: { onChange, value } }) => (
              <>
                <Selector
                  label="학교 구분"
                  options={schoolOptions}
                  selectedValue={value}
                  onSelect={onChange}
                  placeholder="학교 구분을 선택해주세요"
                />
                <ErrorMessage message={errors.school_type?.message} />
              </>
            )}
          />

          <Controller
            control={control}
            name="school_name"
            render={({ field: { value } }) => (
              <>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(true)}
                  activeOpacity={1}
                >
                  <View pointerEvents="none">
                    <Input
                      label="학교명"
                      placeholder="학교를 검색하세요"
                      value={value}
                      readOnly
                      rightIcon="search"
                    />
                  </View>
                </TouchableOpacity>
                <ErrorMessage message={errors.school_name?.message} />
              </>
            )}
          />

          <SchoolSearchModal
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onSelect={(school) => {
              setValue("school_name", school.name, { shouldValidate: true });
              setValue("school_area", school.area, { shouldValidate: true });
              setValue("school_type", school.type, { shouldValidate: true });
            }}
          />

          <Controller
            control={control}
            name="school_area"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  label="지역(시/군/구)"
                  placeholder="예: 서울특별시 강서구"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <ErrorMessage message={errors.school_area?.message} />
              </>
            )}
          />

          <Controller
            control={control}
            name="teacher_name"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  label="담당 교사 이름"
                  placeholder="예: 홍길동"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <ErrorMessage message={errors.teacher_name?.message} />
              </>
            )}
          />

          <Controller
            control={control}
            name="teacher_phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  label="연락처"
                  placeholder="예: 010-1234-5678"
                  keyboardType="phone-pad"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <ErrorMessage message={errors.teacher_phone?.message} />
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
