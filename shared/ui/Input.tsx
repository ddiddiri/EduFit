import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  disabled = false,
  secureTextEntry,
  containerClassName = "",
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecureVisible, setIsSecureVisible] = useState(false);

  const showPasswordToggle = secureTextEntry !== undefined;
  const actualSecureEntry = secureTextEntry && !isSecureVisible;

  const getBorderColor = () => {
    if (error) return "border-danger-500";
    if (isFocused) return "border-primary-500";
    return "border-neutral-200";
  };

  return (
    <View className={`mb-4 ${containerClassName}`}>
      {label && (
        <Text className="text-body-2 text-neutral-800 font-semibold mb-2">
          {label}
        </Text>
      )}

      <View
        className={`
          flex-row items-center
          border rounded-lg px-3 min-h-[48px]
          ${getBorderColor()}
          ${disabled ? "bg-neutral-50 opacity-60" : "bg-white"}
        `}
      >
        {leftIcon && (
          <View className="mr-2">
            <Ionicons name={leftIcon} size={20} color="#6B7280" />
          </View>
        )}

        <TextInput
          {...textInputProps}
          secureTextEntry={actualSecureEntry}
          editable={!disabled}
          className="flex-1 text-body-1 text-neutral-800 py-3"
          placeholderTextColor="#9CA3AF"
          onFocus={(e) => {
            setIsFocused(true);
            textInputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            textInputProps.onBlur?.(e);
          }}
        />

        {showPasswordToggle && (
          <Pressable
            className="p-1 ml-2"
            onPress={() => setIsSecureVisible(!isSecureVisible)}
          >
            <Ionicons
              name={isSecureVisible ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#6B7280"
            />
          </Pressable>
        )}

        {!showPasswordToggle && rightIcon && (
          <View className="ml-2">
            <Ionicons name={rightIcon} size={20} color="#6B7280" />
          </View>
        )}
      </View>

      {(error || helperText) && (
        <Text
          className={`text-caption-1 mt-1 ml-1 ${
            error ? "text-danger-500" : "text-neutral-500"
          }`}
        >
          {error || helperText}
        </Text>
      )}
    </View>
  );
};
