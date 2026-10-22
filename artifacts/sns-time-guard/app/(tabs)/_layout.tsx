import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Tabs } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { SymbolView } from 'expo-symbols';
import React from 'react';
import { Platform, StyleSheet, useColorScheme, View } from 'react-native';
import { useSnsSettings } from '@/context/SnsSettingsContext';
import { useColors } from '@/hooks/useColors';

function NativeTabLayout() {
  const c = useColors();
  return (
    <NativeTabs tintColor={c.primary}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} />
        <NativeTabs.Trigger.Label>홈</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="limits">
        <NativeTabs.Trigger.Icon sf={{ default: 'timer', selected: 'timer' }} />
        <NativeTabs.Trigger.Label>한도</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="permissions">
        <NativeTabs.Trigger.Icon sf={{ default: 'lock.shield', selected: 'lock.shield.fill' }} />
        <NativeTabs.Trigger.Label>권한</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

function ClassicTabLayout() {
  const c = useColors();
  const systemScheme = useColorScheme();
  const { themeMode } = useSnsSettings();
  const dark = themeMode === 'dark' || (themeMode === 'system' && systemScheme === 'dark');
  const ios = Platform.OS === 'ios';
  const web = Platform.OS === 'web';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: c.primary,
        tabBarInactiveTintColor: c.mutedForeground,
        tabBarLabelStyle: { fontFamily: 'Inter_500Medium', fontSize: 10 },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: ios ? 'transparent' : c.background,
          borderTopWidth: web ? 1 : StyleSheet.hairlineWidth,
          borderTopColor: c.border,
          elevation: 0,
          ...(web ? { height: 84 } : {}),
        },
        tabBarBackground: () =>
          ios ? (
            <BlurView intensity={100} tint={dark ? 'dark' : 'light'} style={StyleSheet.absoluteFill} />
          ) : web ? (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: c.background }]} />
          ) : null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: '홈', tabBarIcon: ({ color }) => ios ? <SymbolView name="house" tintColor={color} size={22} /> : <Feather name="home" size={21} color={color} /> }}
      />
      <Tabs.Screen
        name="limits"
        options={{ title: '한도', tabBarIcon: ({ color }) => ios ? <SymbolView name="timer" tintColor={color} size={22} /> : <Feather name="clock" size={21} color={color} /> }}
      />
      <Tabs.Screen
        name="permissions"
        options={{ title: '권한', tabBarIcon: ({ color }) => ios ? <SymbolView name="lock.shield" tintColor={color} size={22} /> : <Feather name="shield" size={21} color={color} /> }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  return isLiquidGlassAvailable() ? <NativeTabLayout /> : <ClassicTabLayout />;
}
