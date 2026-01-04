import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormButton, FormHeader, FormInput, FormSelector } from '../../components/FormUI';

export default function Form2Screen() {
  const router = useRouter();
  const [grade, setGrade] = useState('1-2');
  const [level, setLevel] = useState('basic');

  const gradeOptions = [
    { label: '1-2학년', value: '1-2' },
    { label: '3-4학년', value: '3-4' },
    { label: '5-6학년', value: '5-6' },
  ];

  const levelOptions = [
    { label: '초급', value: 'basic' },
    { label: '중급', value: 'intermediate' },
    { label: '고급', value: 'advanced' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FormHeader title="학생 정보 (2/3)" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 47, paddingTop: 40, paddingBottom: 100 }}
      >
        <View className="gap-5">
          <FormSelector
            label="초등 - 대상 학년"
            options={gradeOptions}
            selectedValue={grade}
            onSelect={setGrade}
          />

          <FormInput
            label="학생 수"
            placeholder="예: 25"
            keyboardType="numeric"
          />

          <FormSelector
            label="학생 수준"
            options={levelOptions}
            selectedValue={level}
            onSelect={setLevel}
          />
        </View>
      </ScrollView>

      <FormButton
        title="다음"
        onPress={() => router.push('/form3')}
      />
    </SafeAreaView>
  );
}
