import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../constants/supabase';

interface Submission {
  id: string;
  created_at: string;
  status: string;
  school_info: { name: string }[];
}

export default function MySubmissionsScreen() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const idsJson = await SecureStore.getItemAsync('my_submissions');
      if (!idsJson) {
        setSubmissions([]);
        setLoading(false);
        return;
      }

      const ids = JSON.parse(idsJson);

      const { data, error } = await supabase
        .from('form_submissions')
        .select(`
          id,
          created_at,
          status,
          school_info ( name )
        `)
        .in('id', ids)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fafaf8]">
      <View className="px-6 py-4 flex-row items-center border-b border-gray-100 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-black">내 신청 내역</Text>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4F46E5" />
        </View>
      ) : submissions.length === 0 ? (
        <View className="flex-1 justify-center items-center px-10">
          <Ionicons name="document-text-outline" size={64} color="#D1D5DB" />
          <Text className="mt-4 text-lg text-gray-500 font-medium text-center">
            아직 신청하신 내역이 없습니다.
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/form1')}
            className="mt-6 bg-indigo-600 px-8 py-3 rounded-xl"
          >
            <Text className="text-white font-bold">첫 신청 시작하기</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView className="flex-1 px-6 pt-6">
          <View className="gap-y-4 pb-10">
            {submissions.map((item) => (
              <View key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <View className="flex-row justify-between items-start mb-3">
                  <View>
                    <Text className="text-xs text-gray-400 font-semibold mb-1">
                      {new Date(item.created_at).toLocaleDateString('ko-KR')}
                    </Text>
                    <Text className="text-lg font-bold text-gray-800">
                      {item.school_info?.[0]?.name || '학교명 미입력'}
                    </Text>
                  </View>
                  <View className="bg-indigo-50 px-3 py-1 rounded-full">
                    <Text className="text-xs font-bold text-indigo-600">{item.status}</Text>
                  </View>
                </View>
                <View className="flex-row items-center mt-2 pt-3 border-t border-gray-50">
                  <Text className="text-sm text-gray-500">신청 ID: </Text>
                  <Text className="text-sm text-gray-400 font-mono">{item.id.substring(0, 8)}...</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
