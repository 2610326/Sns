import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { accentPalettes, type AccentPaletteId, type ThemeMode } from '@/constants/colors';
import { useSnsSettings } from '@/context/SnsSettingsContext';
import { useColors } from '@/hooks/useColors';

const modes: { id: ThemeMode; label: string; icon: 'smartphone' | 'sun' | 'moon' }[] = [
  { id: 'system', label: '기기 설정', icon: 'smartphone' },
  { id: 'light', label: '라이트', icon: 'sun' },
  { id: 'dark', label: '다크', icon: 'moon' },
];

const palettes = Object.entries(accentPalettes).map(([id, palette]) => ({
  id: id as AccentPaletteId,
  label: palette.label,
  swatch: palette.swatch,
}));

export default function ThemeScreen() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { themeMode, accentPalette, setThemeMode, setAccentPalette } = useSnsSettings();
  const top = Platform.OS === 'web' ? 67 : insets.top;
  const bottom = Platform.OS === 'web' ? 34 : Math.max(insets.bottom, 24);

  return (
    <View style={[s.screen, { backgroundColor: c.background }]}>
      <ScrollView contentContainerStyle={[s.content, { paddingTop: top + 14, paddingBottom: bottom + 28 }]} showsVerticalScrollIndicator={false}>
        <View style={s.header}>
          <TouchableOpacity
            testID="theme-back"
            accessibilityRole="button"
            accessibilityLabel="뒤로"
            onPress={() => router.back()}
            style={[s.backButton, { backgroundColor: c.secondary }]}
          >
            <Feather name="arrow-left" size={19} color={c.primary} />
          </TouchableOpacity>
          <View style={s.headerCopy}>
            <Text style={[s.eyebrow, { color: c.primary }]}>화면 꾸미기</Text>
            <Text style={[s.title, { color: c.foreground }]}>테마 설정</Text>
          </View>
        </View>
        <Text style={[s.intro, { color: c.mutedForeground }]}>화면 모드와 파스텔 포인트 색상을 고르세요. 선택한 테마는 앱 전체에 바로 적용되고 이 기기에 저장됩니다.</Text>

        <View style={[s.card, { backgroundColor: c.card, borderColor: c.border }]}>
          <View style={s.sectionHeading}>
            <View style={[s.sectionIcon, { backgroundColor: c.secondary }]}><Feather name="monitor" size={17} color={c.primary} /></View>
            <View style={s.sectionCopy}>
              <Text style={[s.sectionTitle, { color: c.foreground }]}>화면 모드</Text>
              <Text style={[s.sectionSub, { color: c.mutedForeground }]}>원하는 밝기로 전환해요</Text>
            </View>
          </View>
          <View style={s.modeRow}>
            {modes.map((mode) => {
              const selected = themeMode === mode.id;
              return (
                <TouchableOpacity
                  key={mode.id}
                  testID={`theme-mode-${mode.id}`}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  onPress={() => setThemeMode(mode.id)}
                  style={[s.modeOption, { backgroundColor: selected ? c.secondary : c.card, borderColor: selected ? c.primary : c.border }]}
                >
                  <Feather name={mode.icon} size={17} color={selected ? c.primary : c.mutedForeground} />
                  <Text style={[s.modeLabel, { color: selected ? c.secondaryForeground : c.mutedForeground }]}>{mode.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={[s.card, { backgroundColor: c.card, borderColor: c.border }]}>
          <View style={s.sectionHeading}>
            <View style={[s.sectionIcon, { backgroundColor: c.secondary }]}><Feather name="droplet" size={17} color={c.primary} /></View>
            <View style={s.sectionCopy}>
              <Text style={[s.sectionTitle, { color: c.foreground }]}>포인트 색상</Text>
              <Text style={[s.sectionSub, { color: c.mutedForeground }]}>파스텔 팔레트 {palettes.length}가지</Text>
            </View>
          </View>
          <View style={s.paletteGrid}>
            {palettes.map((palette) => {
              const selected = accentPalette === palette.id;
              return (
                <TouchableOpacity
                  key={palette.id}
                  testID={`accent-${palette.id}`}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  accessibilityLabel={`${palette.label} 색상`}
                  onPress={() => setAccentPalette(palette.id)}
                  style={[s.paletteOption, { backgroundColor: selected ? c.secondary : c.card, borderColor: selected ? c.primary : c.border }]}
                >
                  <View style={[s.swatch, { backgroundColor: palette.swatch }]} />
                  <Text style={[s.paletteLabel, { color: c.foreground }]}>{palette.label}</Text>
                  {selected && <Feather name="check" size={15} color={c.primary} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={[s.preview, { backgroundColor: c.primary }]}>
          <View style={s.previewTop}>
            <View style={s.previewIcon}><Feather name="clock" size={16} color={c.primaryForeground} /></View>
            <Text style={[s.previewCaption, { color: c.primaryForeground }]}>미리보기</Text>
          </View>
          <Text style={[s.previewTitle, { color: c.primaryForeground }]}>나에게 맞는 화면으로</Text>
          <Text style={[s.previewBody, { color: c.primaryForeground }]}>포인트 색상과 모드를 바꾸면 이 화면처럼 앱 전체가 함께 바뀝니다.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 22, gap: 17 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 13 },
  backButton: { width: 42, height: 42, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  headerCopy: { gap: 3 },
  eyebrow: { fontFamily: 'Inter_600SemiBold', fontSize: 11, letterSpacing: 0.35 },
  title: { fontFamily: 'Inter_700Bold', fontSize: 25, letterSpacing: -0.5 },
  intro: { fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 20, marginBottom: 2 },
  card: { borderRadius: 22, borderWidth: 1, padding: 17, gap: 16 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  sectionIcon: { width: 38, height: 38, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  sectionCopy: { gap: 4 },
  sectionTitle: { fontFamily: 'Inter_700Bold', fontSize: 15 },
  sectionSub: { fontFamily: 'Inter_400Regular', fontSize: 11 },
  modeRow: { flexDirection: 'row', gap: 8 },
  modeOption: { flex: 1, minHeight: 70, borderRadius: 15, borderWidth: 1, alignItems: 'center', justifyContent: 'center', gap: 7 },
  modeLabel: { fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  paletteGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
  paletteOption: { width: '31.5%', minHeight: 50, borderRadius: 15, borderWidth: 1, paddingHorizontal: 9, flexDirection: 'row', alignItems: 'center', gap: 7 },
  swatch: { width: 20, height: 20, borderRadius: 10 },
  paletteLabel: { flex: 1, fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  preview: { borderRadius: 22, padding: 19, gap: 10 },
  previewTop: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  previewIcon: { width: 30, height: 30, borderRadius: 11, backgroundColor: 'rgba(255,255,255,0.16)', alignItems: 'center', justifyContent: 'center' },
  previewCaption: { fontFamily: 'Inter_600SemiBold', fontSize: 12, opacity: 0.82 },
  previewTitle: { fontFamily: 'Inter_700Bold', fontSize: 18, marginTop: 3 },
  previewBody: { fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18, opacity: 0.84 },
});
