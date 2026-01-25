import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface SelectorOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectorProps {
  label?: string;
  options: SelectorOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  containerClassName?: string;
  // Legacy support
  selectedValue?: string;
  onSelect?: (value: string) => void;
}

export const Selector: React.FC<SelectorProps> = ({
  label,
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = "선택해주세요",
  error,
  disabled = false,
  containerClassName = "",
  // Legacy support
  selectedValue,
  onSelect,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  // Legacy compatibility
  const actualValue = controlledValue ?? selectedValue;
  const actualOnChange = onChange ?? onSelect;

  const isControlled = actualValue !== undefined;
  const currentValue = isControlled ? actualValue : internalValue;

  const selectedOption = options.find((opt) => opt.value === currentValue);

  const handleSelect = (value: string) => {
    if (!isControlled) {
      setInternalValue(value);
    }
    actualOnChange?.(value);
    setIsOpen(false);
  };

  const getBorderColor = () => {
    if (error) return "border-danger-500";
    if (isOpen) return "border-primary-500";
    return "border-neutral-200";
  };

  return (
    <View className={`mb-4 ${containerClassName}`}>
      {label && (
        <Text className="text-body-2 text-neutral-800 font-semibold mb-2">
          {label}
        </Text>
      )}

      <Pressable
        onPress={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        className={`
          flex-row items-center justify-between
          border rounded-lg px-3 min-h-[48px]
          ${getBorderColor()}
          ${disabled ? "bg-neutral-50 opacity-60" : "bg-white"}
        `}
      >
        <Text
          className={`text-body-1 flex-1 ${
            selectedOption ? "text-neutral-800" : "text-neutral-400"
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="#6B7280"
        />
      </Pressable>

      {error && (
        <Text className="text-caption-1 text-danger-500 mt-1 ml-1">
          {error}
        </Text>
      )}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
          className="flex-1 bg-black/50 justify-center items-center px-6"
        >
          <View className="bg-white rounded-xl w-full max-h-[70%] overflow-hidden">
            <View className="p-4 border-b border-neutral-100">
              <Text className="text-title-3 text-neutral-800 text-center">
                {label || "옵션 선택"}
              </Text>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              className="max-h-[400px]"
              renderItem={({ item }) => {
                const isSelected = item.value === currentValue;
                const isDisabled = item.disabled;

                return (
                  <Pressable
                    onPress={() => !isDisabled && handleSelect(item.value)}
                    disabled={isDisabled}
                    className={`
                      flex-row items-center justify-between p-4 border-b border-neutral-100
                      ${isSelected ? "bg-primary-50" : ""}
                      ${isDisabled ? "opacity-50" : ""}
                    `}
                  >
                    <Text
                      className={`text-body-1 flex-1 ${
                        isSelected
                          ? "text-primary-500 font-semibold"
                          : "text-neutral-800"
                      }`}
                    >
                      {item.label}
                    </Text>
                    {isSelected && (
                      <Ionicons name="checkmark" size={20} color="#0EA5E9" />
                    )}
                  </Pressable>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
