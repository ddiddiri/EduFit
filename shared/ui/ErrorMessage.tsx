import React from "react";
import { Text } from "react-native";

/**
 * 에러 메시지 컴포넌트
 */
export const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  return <Text className="text-red-500 text-xs mt-1">{message}</Text>;
};
