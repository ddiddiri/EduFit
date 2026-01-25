import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";

interface NavbarProps {
  left?: React.ReactNode;
  title?: React.ReactNode;
  right?: React.ReactNode;
}

interface BackButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
}

interface CloseButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
}

interface TextButtonProps {
  children: string;
  onPress?: (event: GestureResponderEvent) => void;
}

interface TitleProps {
  children: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={onPress ?? (() => router.back())}
      className="p-2 -ml-2 active:opacity-60"
    >
      <Ionicons name="chevron-back" size={24} color="#1F2937" />
    </Pressable>
  );
};

const CloseButton: React.FC<CloseButtonProps> = ({ onPress }) => (
  <Pressable onPress={onPress} className="p-2 -mr-2 active:opacity-60">
    <Ionicons name="close" size={24} color="#1F2937" />
  </Pressable>
);

const TextButton: React.FC<TextButtonProps> = ({ children, onPress }) => (
  <Pressable onPress={onPress} className="p-2 -mr-2 active:opacity-60">
    <Text className="text-body-1 text-primary-500 font-semibold">
      {children}
    </Text>
  </Pressable>
);

const Title: React.FC<TitleProps> = ({ children }) => (
  <Text className="text-title-3 text-neutral-800 text-center" numberOfLines={1}>
    {children}
  </Text>
);

export const Navbar: React.FC<NavbarProps> & {
  BackButton: typeof BackButton;
  CloseButton: typeof CloseButton;
  TextButton: typeof TextButton;
  Title: typeof Title;
} = ({ left, title, right }) => {
  return (
    <View className="h-14 flex-row items-center justify-between px-4 bg-white border-b border-neutral-200">
      <View className="flex-1 items-start justify-center">{left}</View>

      <View className="flex-[2] items-center justify-center">
        {typeof title === "string" ? <Title>{title}</Title> : title}
      </View>

      <View className="flex-1 items-end justify-center">{right}</View>
    </View>
  );
};

Navbar.BackButton = BackButton;
Navbar.CloseButton = CloseButton;
Navbar.TextButton = TextButton;
Navbar.Title = Title;

// Legacy Header component for backward compatibility
interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = true,
  rightAction,
}) => {
  return (
    <Navbar
      left={showBack ? <Navbar.BackButton /> : undefined}
      title={title}
      right={rightAction}
    />
  );
};
