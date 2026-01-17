import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

/**
 * 상단 헤더 컴포넌트
 */
interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const router = useRouter();
  return (
    <View className="flex-row items-center h-[60px] px-[15px] bg-[#d9d9d9]">
      <TouchableOpacity
        onPress={() => router.back()}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <View className="absolute left-0 right-0 items-center -z-10">
        <Text className="text-2xl font-bold text-black" numberOfLines={1}>
          {title}
        </Text>
      </View>
    </View>
  );
};
