import { Text, TouchableOpacity, View } from "react-native";

/**
 * 하단 고정 버튼 컴포넌트
 */
interface ButtonProps {
  title: string;
  onPress: () => void;
}

export const Button = ({ title, onPress }: ButtonProps) => {
  return (
    <View className="absolute bottom-10 left-0 right-0 px-12">
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        className="w-full h-[52px] justify-center items-center bg-indigo-600 rounded-xl"
      >
        <Text className="text-base font-bold text-white">{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
