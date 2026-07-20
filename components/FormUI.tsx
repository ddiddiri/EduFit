import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

/**
 * 하단 고정 버튼 컴포넌트
 */
interface FormButtonProps {
  title: string;
  onPress: () => void;
}

export const FormButton = ({ title, onPress }: FormButtonProps) => {
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

/**
 * 상단 헤더 컴포넌트
 */
interface FormHeaderProps {
  title: string;
}

export const FormHeader = ({ title }: FormHeaderProps) => {
  const router = useRouter();
  return (
    <View className="flex-row items-center h-[60px] px-[15px] bg-[#d9d9d9]">
      <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
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

/**
 * 텍스트 입력 필드 컴포넌트 (Label + TextInput)
 */
interface FormInputProps extends TextInputProps {
  label: string;
}

export const FormInput = ({ label, ...props }: FormInputProps) => {
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

/**
 * 옵션 선택 버튼 그룹 컴포넌트
 */
interface Option {
  label: string;
  value: string;
}

interface FormSelectorProps {
  label: string;
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export const FormSelector = ({ label, options, selectedValue, onSelect }: FormSelectorProps) => {
  return (
    <View className="gap-y-1.5 w-full">
      <Text className="text-xs text-black">{label}</Text>
      <View className="flex-row gap-x-3">
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            onPress={() => onSelect(option.value)}
            className={`flex-1 h-9 justify-center items-center rounded-sm ${selectedValue === option.value ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
          >
            <Text
              className={`text-sm font-medium ${selectedValue === option.value ? 'text-white' : 'text-black'
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

/**
 * 체크박스 아이템 컴포넌트 (Form3에서 사용)
 */
interface CheckboxItemProps {
  label: string;
  checked: boolean;
  onPress: () => void;
}

export const CheckboxItem = ({ label, checked, onPress }: CheckboxItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    className="flex-row items-center py-1.5 gap-[5px]"
  >
    <View
      className={`w-4 h-4 border rounded-sm items-center justify-center ${checked ? 'border-indigo-600 bg-indigo-600' : 'border-gray-400'
        }`}
    >
      {checked && <MaterialIcons name="check" size={12} color="white" />}
    </View>
    <Text className={`text-xs flex-1 ${checked ? 'text-black font-medium' : 'text-gray-600'}`}>
      {label}
    </Text>
  </TouchableOpacity>
);

/**
 * 에러 메시지 컴포넌트
 */
export const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  return <Text className="text-red-500 text-xs mt-1">{message}</Text>;
};
