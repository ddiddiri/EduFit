import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { School, fetchSchools } from '../services/neis';

interface SchoolSearchModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (school: { name: string; area: string; type: '초등학교' | '중학교' | '고등학교' }) => void;
}

export const SchoolSearchModal = ({ isVisible, onClose, onSelect }: SchoolSearchModalProps) => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchText.length >= 2) {
        setIsLoading(true);
        const schools = await fetchSchools(searchText);
        setResults(schools);
        setIsLoading(false);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const handleSelect = (school: School) => {
    let type: '초등학교' | '중학교' | '고등학교' = '초등학교';
    if (school.SCHUL_KND_SC_NM.includes('중학교')) type = '중학교';
    else if (school.SCHUL_KND_SC_NM.includes('고등학교')) type = '고등학교';

    onSelect({
      name: school.SCHUL_NM,
      area: school.LCTN_NM,
      type,
    });
    onClose();
    setSearchText('');
    setResults([]);
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={false}>
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center h-[60px] px-[15px] border-b border-gray-100">
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text className="flex-1 text-center text-lg font-bold mr-6">학교 검색</Text>
        </View>

        {/* Search Bar */}
        <View className="p-4">
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 h-12">
            <Ionicons name="search" size={20} color="#9ca3af" />
            <TextInput
              placeholder="학교명을 입력하세요 (2글자 이상)"
              className="flex-1 ml-2 text-sm text-black"
              value={searchText}
              onChangeText={setSearchText}
              autoFocus
            />
          </View>
        </View>

        {/* Results */}
        <FlatList
          data={results}
          keyExtractor={(item) => item.SD_SCHUL_CODE}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              className="py-4 border-b border-gray-100"
            >
              <Text className="text-sm font-bold text-black">{item.SCHUL_NM}</Text>
              <Text className="text-xs text-gray-500 mt-1">{item.ORG_RDNMA}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            searchText.length >= 2 && !isLoading ? (
              <View className="items-center mt-10">
                <Text className="text-sm text-gray-400">검색 결과가 없습니다.</Text>
              </View>
            ) : null
          }
        />
      </SafeAreaView>
    </Modal>
  );
};
