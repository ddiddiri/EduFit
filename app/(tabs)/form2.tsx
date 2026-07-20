import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ErrorMessage, FormButton, FormHeader, FormInput, FormSelector } from '../../components/FormUI';
import { TotalForm } from '../../types/form.schema';

const gradeOptionsBySchoolType: Record<string, { label: string; value: string }[]> = {
  초등학교: [
    { label: '1-2학년', value: '1-2학년' },
    { label: '3-4학년', value: '3-4학년' },
    { label: '5-6학년', value: '5-6학년' },
  ],
  중학교: [
    { label: '1학년', value: '중1' },
    { label: '2학년', value: '중2' },
    { label: '3학년', value: '중3' },
  ],
  고등학교: [
    { label: '1학년', value: '고1' },
    { label: '2학년', value: '고2' },
    { label: '3학년', value: '고3' },
  ],
};

export default function Form2Screen() {
  const router = useRouter();
  const { control, formState: { errors }, trigger, setValue } = useFormContext<TotalForm>();

  const schoolType = useWatch({ control, name: 'school_type' });
  const gradeOptions = gradeOptionsBySchoolType[schoolType] ?? gradeOptionsBySchoolType['초등학교'];
  const selectedGrade = useWatch({ control, name: 'student_target_grade' });

  // 학교급이 바뀌어 기존 선택 학년이 옵션에 없으면 초기화
  useEffect(() => {
    if (selectedGrade && !gradeOptions.some((o) => o.value === selectedGrade)) {
      setValue('student_target_grade', '');
    }
  }, [schoolType]);

  const levelOptions = [
    { label: '초급', value: '초급' },
    { label: '중급', value: '중급' },
    { label: '고급', value: '고급' },
  ];

  const handleNext = async () => {
    const isValid = await trigger(['student_target_grade', 'student_number', 'student_level']);
    if (isValid) {
      router.push('/form3');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FormHeader title="학생 정보 (2/3)" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 47, paddingTop: 40, paddingBottom: 100 }}
      >
        <View className="gap-5">
          <Controller
            control={control}
            name="student_target_grade"
            render={({ field: { onChange, value } }) => (
              <>
                <FormSelector
                  label={`${schoolType || '초등학교'} - 대상 학년`}
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
                <FormInput
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
                <FormSelector
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

      <FormButton
        title="다음"
        onPress={handleNext}
      />
    </SafeAreaView>
  );
}
