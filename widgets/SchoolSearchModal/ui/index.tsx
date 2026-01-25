import { Icon } from "@/shared/ui/Icon";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchSchools } from "../../../entities/school/api/neis";
import { School } from "../../../entities/school/model/neis_school.type";
import { SchoolSearchModalProps } from "../model";

export const SchoolSearchModal = ({
  isVisible,
  onClose,
  onSelect,
}: SchoolSearchModalProps) => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
    let type: "초등학교" | "중학교" | "고등학교" = "초등학교";
    if (school.SCHUL_KND_SC_NM.includes("중학교")) type = "중학교";
    else if (school.SCHUL_KND_SC_NM.includes("고등학교")) type = "고등학교";

    onSelect({
      name: school.SCHUL_NM,
      area: school.LCTN_NM,
      type,
    });
    onClose();
    setSearchText("");
    setResults([]);
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={false}>
      <SafeAreaView className="flex-1 bg-[#FAFBFC]">
        {/* Header */}
        <View className="flex-row items-center h-[60px] px-4 border-b border-neutral-100 bg-white">
          <TouchableOpacity
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            className="p-2 -ml-2"
          >
            <Icon name="close" size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text className="flex-1 text-center text-title-2 font-bold text-neutral-900 mr-6">
            학교 검색
          </Text>
        </View>

        {/* Search Bar */}
        <View className="p-4 bg-white">
          <View className="flex-row items-center bg-neutral-100 rounded-xl px-4 h-12">
            <Icon name="search" size={20} color="#9CA3AF" />
            <TextInput
              placeholder="학교명을 입력하세요 (2글자 이상)"
              className="flex-1 ml-3 text-body-1 text-neutral-800"
              placeholderTextColor="#9CA3AF"
              value={searchText}
              onChangeText={setSearchText}
              autoFocus
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText("")}>
                <Icon name="closeBold" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Loading */}
        {isLoading && (
          <View className="items-center py-8">
            <ActivityIndicator size="small" color="#0EA5E9" />
            <Text className="text-caption-1 text-neutral-500 mt-2">
              검색 중...
            </Text>
          </View>
        )}

        {/* Results */}
        <FlatList
          data={results}
          keyExtractor={(item) => item.SD_SCHUL_CODE}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              className="py-4 px-4 mb-2 bg-white rounded-xl border border-neutral-100"
            >
              <View className="flex-row items-center gap-x-3">
                <View className="w-10 h-10 bg-primary-50 rounded-lg items-center justify-center">
                  <Icon name="school" size={20} color="#0EA5E9" />
                </View>
                <View className="flex-1">
                  <Text className="text-body-1 font-bold text-neutral-900">
                    {item.SCHUL_NM}
                  </Text>
                  <Text className="text-caption-1 text-neutral-500 mt-0.5">
                    {item.ORG_RDNMA}
                  </Text>
                </View>
                <Icon name="chevronRight" size={20} color="#D1D5DB" />
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            searchText.length >= 2 && !isLoading ? (
              <View className="items-center mt-10">
                <View className="w-16 h-16 bg-neutral-100 rounded-full items-center justify-center mb-4">
                  <Icon name="searchBold" size={32} color="#D1D5DB" />
                </View>
                <Text className="text-body-2 text-neutral-500">
                  검색 결과가 없습니다.
                </Text>
                <Text className="text-caption-1 text-neutral-400 mt-1">
                  학교명을 다시 확인해주세요.
                </Text>
              </View>
            ) : searchText.length < 2 && !isLoading ? (
              <View className="items-center mt-10">
                <View className="w-16 h-16 bg-primary-50 rounded-full items-center justify-center mb-4">
                  <Icon name="search" size={32} color="#0EA5E9" />
                </View>
                <Text className="text-body-2 text-neutral-700">
                  학교명을 검색해주세요
                </Text>
                <Text className="text-caption-1 text-neutral-500 mt-1">
                  2글자 이상 입력하면 검색됩니다.
                </Text>
              </View>
            ) : null
          }
        />
      </SafeAreaView>
    </Modal>
  );
};
