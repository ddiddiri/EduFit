import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface ErrorMessageProps {
  message?: string;
  variant?: "inline" | "block";
  icon?: boolean;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  variant = "inline",
  icon = true,
  className = "",
}) => {
  if (!message) return null;

  if (variant === "inline") {
    return (
      <View className={`flex-row items-center mt-1 ${className}`}>
        {icon && (
          <View className="mr-1">
            <Ionicons name="alert-circle" size={14} color="#EF4444" />
          </View>
        )}
        <Text className="text-caption-1 text-danger-500 flex-1">{message}</Text>
      </View>
    );
  }

  // block variant
  return (
    <View
      className={`
        flex-row items-start
        bg-danger-50 border-l-4 border-l-danger-500
        rounded-sm p-3 my-2
        ${className}
      `}
    >
      {icon && (
        <View className="mr-2 mt-0.5">
          <Ionicons name="alert-circle" size={18} color="#EF4444" />
        </View>
      )}
      <Text className="text-body-2 text-danger-500 flex-1">{message}</Text>
    </View>
  );
};
