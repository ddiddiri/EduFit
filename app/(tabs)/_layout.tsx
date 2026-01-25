import { Icon } from "@/shared/ui/Icon";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Platform, View } from "react-native";

import { TotalForm, TotalFormSchema } from "@/shared/model/form.schema";

export default function TabLayout() {
  const methods = useForm<TotalForm>({
    resolver: zodResolver(TotalFormSchema),
    defaultValues: {
      school_type: "초등학교",
      school_name: "",
      school_area: "",
      teacher_name: "",
      teacher_phone: "",
      student_target_grade: "1-2학년",
      student_number: "",
      student_level: "초급",
      school_resource: [],
      education_goal: [],
      education_period: "",
      education_date: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#F3F4F6",
            height: Platform.OS === "ios" ? 88 : 68,
            paddingTop: 8,
            paddingBottom: Platform.OS === "ios" ? 28 : 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.05,
            shadowRadius: 12,
            elevation: 8,
          },
          tabBarActiveTintColor: "#0EA5E9",
          tabBarInactiveTintColor: "#9CA3AF",
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
            marginTop: 4,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "홈",
            tabBarIcon: ({ color, focused }) => (
              <View>
                <Icon
                  name={focused ? "home" : "homeOutline"}
                  size={24}
                  color={color}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="form1"
          options={{
            title: "신청하기",
            tabBarIcon: ({ color, focused }) => (
              <View>
                <Icon
                  name={focused ? "edit" : "editOutline"}
                  size={24}
                  color={color}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="my-submissions"
          options={{
            title: "신청내역",
            tabBarIcon: ({ color, focused }) => (
              <View>
                <Icon
                  name={focused ? "clipboard" : "clipboardOutline"}
                  size={24}
                  color={color}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="form2"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="form3"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="result"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </FormProvider>
  );
}
