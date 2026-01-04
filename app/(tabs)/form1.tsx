import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormButton, FormHeader, FormInput, FormSelector } from '../../components/FormUI';

export default function Form1Screen() {
  const router = useRouter();
  const [schoolType, setSchoolType] = useState('elementary');

  const schoolOptions = [
    { label: '초등', value: 'elementary' },
    { label: '중등', value: 'middle' },
    { label: '고등', value: 'high' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FormHeader title="기본 정보 (1/3)" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        className="flex-1 px-12 pt-10"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-y-5">
          <FormSelector
            label="초중고"
            options={schoolOptions}
            selectedValue={schoolType}
            onSelect={setSchoolType}
          />

          <FormInput
            label="학교명"
            placeholder="예: 서울 OO초등학교"
          />

          <FormInput
            label="지역(시/군/구)"
            placeholder="예: 서울특별시 강서구"
          />

          <FormInput
            label="담당 교사 이름"
            placeholder="예: 홍길동"
          />

          <FormInput
            label="연락처"
            placeholder="예: 010-1234-5678"
            keyboardType="phone-pad"
          />
        </View>
      </ScrollView>

      <FormButton
        title="다음"
        onPress={() => router.push('/form2')}
      />
    </SafeAreaView>
  );
}
