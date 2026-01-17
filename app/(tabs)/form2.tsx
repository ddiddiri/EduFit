import { Button } from "@/shared/ui/Button";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { Header } from "@/shared/ui/Header";
import { Input } from "@/shared/ui/Input";
import { Selector } from "@/shared/ui/Selector";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ScrollView, View } from "react-native";
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
    <SafeAreaView className="flex-1 bg-white">
      <Header title="학생 정보 (2/3)" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 47,
          paddingTop: 40,
          paddingBottom: 100,
        }}
      >
        <View className="gap-5">
          <Controller
            control={control}
            name="student_target_grade"
            render={({ field: { onChange, value } }) => (
              <>
                <Selector
                  label="초등 - 대상 학년"
                  options={gradeOptions}
                  selectedValue={value}
                  onSelect={onChange}
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
                />
                <ErrorMessage message={errors.student_level?.message} />
              </>
            )}
          />
        </View>
      </ScrollView>

      <Button title="다음" onPress={handleNext} />
    </SafeAreaView>
  );
}
