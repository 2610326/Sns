import { useColorScheme } from 'react-native';
import colors, { accentPalettes } from '@/constants/colors';
import { useSnsSettings } from '@/context/SnsSettingsContext';

/** Returns the saved theme mode and accent palette as app-wide design tokens. */
export function useColors() {
  const systemScheme = useColorScheme();
  const { themeMode, accentPalette } = useSnsSettings();
  const scheme = themeMode === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : themeMode;
  const base = colors[scheme];
  return { ...base, ...accentPalettes[accentPalette][scheme], radius: colors.radius };
}
