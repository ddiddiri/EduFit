import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckboxItem, FormButton, FormHeader, FormInput } from '../../components/FormUI';

export default function Form3Screen() {
  const router = useRouter();

  const [resources, setResources] = useState({
    computer: true,
    laptop: false,
    projector: true,
    iot: false,
    none: false,
  });

  const [goals, setGoals] = useState({
    ai: true,
    coding: false,
    fusion: true,
    data: false,
    project: false,
    teacher: true,
  });

  const toggleResource = (key: keyof typeof resources) => {
    setResources(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleGoal = (key: keyof typeof goals) => {
    setGoals(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FormHeader title="학교 자원 & 교육 목표 (3/3)" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 46, paddingTop: 40, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-[40px]">
          {/* 학교 자원 섹션 */}
          <View className="gap-[5px]">
            <Text className="text-sm text-black">학교 자원</Text>
            <View className="gap-[10px]">
              <Text className="text-xs text-black">학교 보유 자원 (복수 선택)</Text>
              <View className="gap-[5px]">
                <CheckboxItem
                  label="컴퓨터실 (1인 1PC)"
                  checked={resources.computer}
                  onPress={() => toggleResource('computer')}
                />
                <CheckboxItem
                  label="노트북/태블릿 보유"
                  checked={resources.laptop}
                  onPress={() => toggleResource('laptop')}
                />
                <CheckboxItem
                  label="빔프로젝터 또는 TV"
                  checked={resources.projector}
                  onPress={() => toggleResource('projector')}
                />
                <CheckboxItem
                  label="IoT/메이커 장비 있음"
                  checked={resources.iot}
                  onPress={() => toggleResource('iot')}
                />
                <CheckboxItem
                  label="없음 (장비 지원 필요)"
                  checked={resources.none}
                  onPress={() => toggleResource('none')}
                />
              </View>
            </View>
          </View>

          {/* 교육 목표 섹션 */}
          <View className="gap-[5px]">
            <Text className="text-sm text-black">교육 목표</Text>
            <View className="gap-[10px]">
              <Text className="text-xs text-black">교육 목표 선택</Text>
              <View className="gap-[5px]">
                <CheckboxItem
                  label="AI 기초 체험"
                  checked={goals.ai}
                  onPress={() => toggleGoal('ai')}
                />
                <CheckboxItem
                  label="코딩 기초"
                  checked={goals.coding}
                  onPress={() => toggleGoal('coding')}
                />
                <CheckboxItem
                  label="융합형 활동"
                  checked={goals.fusion}
                  onPress={() => toggleGoal('fusion')}
                />
                <CheckboxItem
                  label="데이터 수업"
                  checked={goals.data}
                  onPress={() => toggleGoal('data')}
                />
                <CheckboxItem
                  label="프로젝트형"
                  checked={goals.project}
                  onPress={() => toggleGoal('project')}
                />
                <CheckboxItem
                  label="교사 연수"
                  checked={goals.teacher}
                  onPress={() => toggleGoal('teacher')}
                />
              </View>
            </View>
          </View>

          {/* 기간 섹션 */}
          <FormInput
            label="기간"
            placeholder="예: 1~2차시 / 3~6차시 / 4주 프로젝트 등"
          />

          {/* 일정 섹션 */}
          <FormInput
            label="일정"
            placeholder="예: 3월 둘째 주 / 5월 10일 등"
          />
        </View>
      </ScrollView>

      <FormButton
        title="신청 완료"
        onPress={() => router.push('/result')}
      />
    </SafeAreaView>
  );
}
