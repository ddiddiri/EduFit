import { Icon, SolarIconName } from "@/shared/ui/Icon";
import React from "react";
import {
    ActivityIndicator,
    GestureResponderEvent,
    Pressable,
    Text,
    View,
} from "react-native";

type ButtonType = "primary" | "danger" | "light" | "dark";
type ButtonVariant = "fill" | "weak";
type ButtonDisplay = "inline" | "block" | "full";
type ButtonSize = "tiny" | "medium" | "large" | "big";

export interface ButtonProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  type?: ButtonType;
  variant?: ButtonVariant;
  display?: ButtonDisplay;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: SolarIconName;
  rightIcon?: SolarIconName;
  className?: string;
}

const sizeStyles = {
  tiny: {
    container: "py-2 px-3 min-h-[32px]",
    text: "text-caption-1",
    iconSize: 14,
  },
  medium: {
    container: "py-3 px-4 min-h-[40px]",
    text: "text-body-2",
    iconSize: 16,
  },
  large: {
    container: "py-4 px-5 min-h-[48px]",
    text: "text-body-1",
    iconSize: 18,
  },
  big: {
    container: "py-5 px-6 min-h-[56px]",
    text: "text-body-1",
    iconSize: 20,
  },
};

const getTypeStyles = (
  type: ButtonType,
  variant: ButtonVariant,
  pressed: boolean,
  disabled: boolean,
) => {
  if (disabled) {
    return {
      container: "bg-neutral-300",
      text: "text-neutral-400",
    };
  }

  if (variant === "weak") {
    const baseStyles = {
      primary: {
        container: pressed ? "bg-primary-200" : "bg-primary-100",
        text: "text-primary-500",
      },
      danger: {
        container: pressed ? "bg-danger-200" : "bg-danger-100",
        text: "text-danger-500",
      },
      light: {
        container: pressed ? "bg-white/20" : "bg-white/10",
        text: "text-white",
      },
      dark: {
        container: pressed ? "bg-neutral-200" : "bg-neutral-100",
        text: "text-neutral-800",
      },
    };
    return baseStyles[type];
  }

  // fill variant
  const fillStyles = {
    primary: {
      container: pressed ? "bg-primary-700" : "bg-primary-500",
      text: "text-white",
    },
    danger: {
      container: pressed ? "bg-danger-700" : "bg-danger-500",
      text: "text-white",
    },
    light: {
      container: pressed ? "bg-neutral-100" : "bg-white",
      text: "text-neutral-800",
    },
    dark: {
      container: pressed ? "bg-neutral-900" : "bg-neutral-800",
      text: "text-white",
    },
  };
  return fillStyles[type];
};

const displayStyles = {
  inline: "self-start",
  block: "self-stretch",
  full: "w-full",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  type = "primary",
  variant = "fill",
  display = "block",
  size = "big",
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = "",
}) => {
  const sizeStyle = sizeStyles[size];

  const getTextColor = () => {
    if (disabled) return "#9CA3AF";
    if (variant === "weak") {
      if (type === "primary") return "#0EA5E9";
      if (type === "danger") return "#EF4444";
      if (type === "light") return "#FFFFFF";
      return "#1F2937";
    }
    if (type === "light") return "#1F2937";
    return "#FFFFFF";
  };

  return (
    <View className={`${displayStyles[display]} ${className}`}>
      <Pressable
        onPress={disabled || loading ? undefined : onPress}
        disabled={disabled || loading}
      >
        {({ pressed }) => {
          const typeStyle = getTypeStyles(type, variant, pressed, disabled);

          if (loading) {
            return (
              <View
                className={`${sizeStyle.container} ${typeStyle.container} rounded-lg items-center justify-center flex-row ${disabled ? "opacity-50" : ""}`}
              >
                <ActivityIndicator color={getTextColor()} size="small" />
              </View>
            );
          }

          return (
            <View
              className={`${sizeStyle.container} ${typeStyle.container} rounded-lg items-center justify-center flex-row ${disabled ? "opacity-50" : ""}`}
            >
              <View className="flex-row items-center justify-center gap-2">
                {leftIcon && (
                  <Icon
                    name={leftIcon}
                    size={sizeStyle.iconSize}
                    color={getTextColor()}
                  />
                )}
                <Text
                  className={`${sizeStyle.text} ${typeStyle.text} font-semibold text-center`}
                >
                  {children}
                </Text>
                {rightIcon && (
                  <Icon
                    name={rightIcon}
                    size={sizeStyle.iconSize}
                    color={getTextColor()}
                  />
                )}
              </View>
            </View>
          );
        }}
      </Pressable>
    </View>
  );
};
