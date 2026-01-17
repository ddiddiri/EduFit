import { Text, TextInput, TextInputProps, View } from "react-native";

/**
 * 텍스트 입력 필드 컴포넌트 (Label + TextInput)
 */
interface InputProps extends TextInputProps {
  label: string;
}

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <View className="gap-y-1.5 w-full">
      <Text className="text-xs text-black">{label}</Text>
      <TextInput
        placeholderTextColor="#9ca3af"
        className="w-full h-12 px-4 rounded-lg border border-gray-300 text-sm text-black"
        {...props}
      />
    </View>
  );
};
