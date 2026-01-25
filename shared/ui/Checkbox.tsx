import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface CheckboxBaseProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: number;
  label?: string;
  className?: string;
}

const CheckboxBase: React.FC<
  CheckboxBaseProps & { variant: "circle" | "square" }
> = ({
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  onCheckedChange,
  size = 24,
  label,
  className = "",
  variant,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const handlePress = () => {
    if (disabled) return;

    const newChecked = !isChecked;

    if (!isControlled) {
      setInternalChecked(newChecked);
    }

    onCheckedChange?.(newChecked);
  };

  const getCheckboxStyle = () => {
    const baseStyle = variant === "circle" ? "rounded-full" : "rounded";

    if (disabled) {
      return `${baseStyle} bg-neutral-100 border-neutral-200`;
    }

    if (isChecked) {
      return `${baseStyle} bg-primary-500 border-primary-500`;
    }

    return `${baseStyle} bg-white border-neutral-300`;
  };

  const getIconColor = () => {
    if (disabled) return "#9CA3AF";
    return "#FFFFFF";
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={`flex-row items-center ${disabled ? "opacity-50" : ""} ${className}`}
    >
      <View
        className={`
          border-2 items-center justify-center
          ${getCheckboxStyle()}
        `}
        style={{ width: size, height: size }}
      >
        {isChecked && (
          <Ionicons
            name="checkmark"
            size={size * 0.65}
            color={getIconColor()}
          />
        )}
      </View>
      {label && (
        <Text
          className={`ml-2 text-body-2 ${
            disabled ? "text-neutral-400" : "text-neutral-800"
          }`}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};

// Compound component pattern
export const Checkbox = {
  Circle: (props: CheckboxBaseProps) => (
    <CheckboxBase {...props} variant="circle" />
  ),
  Square: (props: CheckboxBaseProps) => (
    <CheckboxBase {...props} variant="square" />
  ),
};

// Legacy support - CheckboxItem for form3.tsx compatibility
interface CheckboxItemProps {
  label: string;
  checked: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export const CheckboxItem: React.FC<CheckboxItemProps> = ({
  label,
  checked,
  onPress,
  disabled = false,
}) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    className={`flex-row items-center py-2 gap-3 ${disabled ? "opacity-50" : ""}`}
  >
    <View
      className={`
        w-5 h-5 rounded border-2 items-center justify-center
        ${checked ? "bg-primary-500 border-primary-500" : "bg-white border-neutral-300"}
        ${disabled ? "bg-neutral-100 border-neutral-200" : ""}
      `}
    >
      {checked && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
    </View>
    <Text
      className={`text-body-2 flex-1 ${
        checked ? "text-neutral-800" : "text-neutral-500"
      }`}
    >
      {label}
    </Text>
  </Pressable>
);
