import { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import { hasSnsUsageNative, snsUsageNative } from '../modules/sns-usage/src';
export interface AndroidUsageSnapshot { nativeAvailable: boolean; usageAccess: boolean; accessibilityAccess: boolean; usageSeconds: Record<string, number>; }
const EMPTY: AndroidUsageSnapshot = { nativeAvailable: false, usageAccess: false, accessibilityAccess: false, usageSeconds: {} };
export function useAndroidUsage() {
  const [snapshot, setSnapshot] = useState<AndroidUsageSnapshot>(EMPTY);
  const refresh = useCallback(async () => {
    if (Platform.OS !== 'android' || !snsUsageNative) { setSnapshot(EMPTY); return EMPTY; }
    try {
      const nativeAvailable = hasSnsUsageNative();
      const usageAccess = snsUsageNative.hasUsageAccess();
      const accessibilityAccess = snsUsageNative.hasAccessibilityAccess();
      const usageSeconds = usageAccess ? await snsUsageNative.getTodayUsage() : {};
      const next = { nativeAvailable, usageAccess, accessibilityAccess, usageSeconds };
      setSnapshot(next);
      return next;
    } catch { const next = { ...EMPTY, nativeAvailable: true }; setSnapshot(next); return next; }
  }, []);
  const openUsageSettings = useCallback(() => snsUsageNative?.openUsageAccessSettings(), []);
  const openAccessibilitySettings = useCallback(() => snsUsageNative?.openAccessibilitySettings(), []);
  return { snapshot, refresh, openUsageSettings, openAccessibilitySettings };
}
