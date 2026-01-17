import { Text, TouchableOpacity, View } from "react-native";

interface Option {
  label: string;
  value: string;
}

interface SelectorProps {
  label: string;
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

/**
 * 옵션 선택 버튼 그룹 컴포넌트
 */
export const Selector = ({
  label,
  options,
  selectedValue,
  onSelect,
}: SelectorProps) => {
  return (
    <View className="gap-y-1.5 w-full">
      <Text className="text-xs text-black">{label}</Text>
      <View className="flex-row gap-x-3">
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            onPress={() => onSelect(option.value)}
            className={`flex-1 h-9 justify-center items-center rounded-sm ${
              selectedValue === option.value ? "bg-indigo-600" : "bg-gray-200"
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                selectedValue === option.value ? "text-white" : "text-black"
              }`}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
