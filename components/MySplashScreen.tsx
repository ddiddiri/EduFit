import { Text, View } from "./Themed";

export default function MySplashScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl text-red-500">EduFit</Text>
      <Text className="text-2xl text-red-500">AI LAB CODING</Text>
    </View>
  );
}