import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

/**
 * 하단 고정 버튼 컴포넌트
 */
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export const Button = ({ title, onPress, disabled = false }: ButtonProps) => {
  return (
    <View className="absolute bottom-10 left-0 right-0 px-12">
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
        className={`w-full h-[52px] justify-center items-center rounded-xl flex-row gap-2 ${
          disabled ? "bg-gray-400" : "bg-indigo-600"
        }`}
      >
        {disabled && <ActivityIndicator size="small" color="white" />}
        <Text className="text-base font-bold text-white">{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
