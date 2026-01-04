import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResultScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center h-[60px] px-[15px] bg-[#d9d9d9]">
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="flex-1 text-2xl font-bold text-center text-black pr-[24px]">
          신청이 접수되었습니다!
        </Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View className="p-6 items-center">
          <Ionicons name="checkmark-circle" size={80} color="#4f46e5" />
          <Text className="text-xl font-bold text-gray-800 mt-4 text-center">
            정상적으로 접수되었습니다.
          </Text>
          <Text className="text-gray-500 mt-2 text-center">
            확인 후 빠른 시일 내에 연락드리겠습니다.
          </Text>
        </View>
      </ScrollView>

      {/* Home Button */}
      <View className="p-10">
        <TouchableOpacity
          onPress={() => router.replace('/')}
          className="w-full h-[52px] justify-center items-center bg-indigo-600 rounded-xl"
        >
          <Text className="text-base font-bold text-white">홈으로 돌아가기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
