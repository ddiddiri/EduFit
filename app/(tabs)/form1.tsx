import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ErrorMessage,
  FormButton,
  FormHeader,
  FormInput,
  FormSelector,
} from "../../components/FormUI";
import { SchoolSearchModal } from "../../components/SchoolSearchModal";
import { TotalForm } from "../../types/form.schema";

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
    <SafeAreaView className="flex-1 bg-white">
      <FormHeader title="기본 정보 (1/3)" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        className="flex-1 px-12 pt-10"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-y-5">
          <Controller
            control={control}
            name="school_type"
            render={({ field: { onChange, value } }) => (
              <>
                <FormSelector
                  label="초중고"
                  options={schoolOptions}
                  selectedValue={value}
                  onSelect={onChange}
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
                    <FormInput
                      label="학교명"
                      placeholder="학교를 검색하세요"
                      value={value}
                      readOnly
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
            render={({ field: { value } }) => (
              <>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(true)}
                  activeOpacity={1}
                >
                  <View pointerEvents="none">
                    <FormInput
                      label="지역(시/군/구) — 학교 선택 시 자동 입력"
                      placeholder="위에서 학교를 검색하면 자동으로 입력됩니다"
                      value={value}
                      readOnly
                    />
                  </View>
                </TouchableOpacity>
                <ErrorMessage message={errors.school_area?.message} />
              </>
            )}
          />

          <Controller
            control={control}
            name="teacher_name"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <FormInput
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
                <FormInput
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

      <FormButton title="다음" onPress={handleNext} />
    </SafeAreaView>
  );
}
