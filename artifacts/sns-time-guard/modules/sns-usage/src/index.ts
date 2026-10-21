import { requireOptionalNativeModule } from 'expo';
export interface SnsUsageNativeModule {
  isNativeAvailable(): boolean;
  hasUsageAccess(): boolean;
  hasAccessibilityAccess(): boolean;
  getTodayUsage(): Promise<Record<string, number>>;
  setRules(rawRules: string): void;
  openUsageAccessSettings(): void;
  openAccessibilitySettings(): void;
}
export const snsUsageNative = requireOptionalNativeModule<SnsUsageNativeModule>('SnsUsage');
export const hasSnsUsageNative = (): boolean => Boolean(snsUsageNative?.isNativeAvailable());
export function syncSnsRules(selectedApps: string[], limits: Record<string, number>) {
  snsUsageNative?.setRules(JSON.stringify({ selectedApps, limits }));
}
