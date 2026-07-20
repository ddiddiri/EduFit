import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// expo-secure-store는 웹 미지원이므로 웹에서는 localStorage 사용
export async function getItem(key: string): Promise<string | null> {
  if (Platform.OS === "web") {
    return typeof localStorage !== "undefined" ? localStorage.getItem(key) : null;
  }
  return SecureStore.getItemAsync(key);
}

export async function setItem(key: string, value: string): Promise<void> {
  if (Platform.OS === "web") {
    if (typeof localStorage !== "undefined") localStorage.setItem(key, value);
    return;
  }
  return SecureStore.setItemAsync(key, value);
}
