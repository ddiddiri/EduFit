import FontAwesome from '@expo/vector-icons/FontAwesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, Tabs } from 'expo-router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Pressable } from 'react-native';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { TotalForm, TotalFormSchema } from '@/types/form.schema';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const methods = useForm<TotalForm>({
    resolver: zodResolver(TotalFormSchema),
    defaultValues: {
      school_type: '초등학교',
      school_name: '',
      school_area: '',
      teacher_name: '',
      teacher_phone: '',
      student_target_grade: '1-2학년',
      student_number: '',
      student_level: '초급',
      school_resource: [],
      education_goal: [],
      education_period: '',
      education_date: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'EduFit',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
            headerRight: () => (
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={25}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name="form1"
          options={{
            href: null,
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
      </Tabs>
    </FormProvider>
  );
}
