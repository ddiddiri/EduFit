import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

/**
 * 체크박스 아이템 컴포넌트 (Form3에서 사용)
 */
interface CheckboxItemProps {
  label: string;
  checked: boolean;
  onPress: () => void;
}

export const CheckboxItem = ({
  label,
  checked,
  onPress,
}: CheckboxItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    className="flex-row items-center py-1.5 gap-[5px]"
  >
    <View
      className={`w-3 h-3 border items-center justify-center ${
        checked ? "border-black" : "border-[#E5E7EB]"
      }`}
    >
      {checked && <MaterialIcons name="check" size={10} color="black" />}
    </View>
    <Text className={`text-xs ${checked ? "text-black" : "text-gray-200"}`}>
      {label}
    </Text>
  </TouchableOpacity>
);
