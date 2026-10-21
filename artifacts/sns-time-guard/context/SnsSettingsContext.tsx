import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { syncSnsRules } from '../modules/sns-usage/src';
export const SOCIAL_APPS = [
  { id: 'instagram', name: 'Instagram', icon: 'camera' as const },
  { id: 'tiktok', name: 'TikTok', icon: 'music' as const },
  { id: 'youtube', name: 'YouTube', icon: 'youtube' as const },
  { id: 'x', name: 'X', icon: 'message-circle' as const },
  { id: 'facebook', name: 'Facebook', icon: 'users' as const },
] as const;
export type SocialAppId = (typeof SOCIAL_APPS)[number]['id'];
type Limits = Record<SocialAppId, number>;
const STORAGE_KEY = 'sns-time-guard:settings:v1';
const DISCLOSURE_KEY = 'sns-time-guard:accessibility-disclosure:v1';
const DEFAULT_LIMITS: Limits = { instagram: 60, tiktok: 45, youtube: 60, x: 30, facebook: 30 };
const DEFAULT_SELECTED: SocialAppId[] = SOCIAL_APPS.map((app) => app.id);
interface SettingsContextValue { limits: Limits; selectedApps: SocialAppId[]; isHydrated: boolean; storageError: boolean; accessibilityDisclosureAccepted: boolean; acceptAccessibilityDisclosure: () => Promise<void>; setLimit: (id: SocialAppId, minutes: number) => void; toggleApp: (id: SocialAppId) => void; }
const SettingsContext = createContext<SettingsContextValue | null>(null);
export function SnsSettingsProvider({ children }: { children: ReactNode }) {
  const [limits, setLimits] = useState<Limits>(DEFAULT_LIMITS);
  const [selectedApps, setSelectedApps] = useState<SocialAppId[]>(DEFAULT_SELECTED);
  const [isHydrated, setHydrated] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [accessibilityDisclosureAccepted, setDisclosureAccepted] = useState(false);
  const queue = useRef<Promise<void>>(Promise.resolve());
  useEffect(() => {
    let active = true;
    Promise.all([AsyncStorage.getItem(STORAGE_KEY), AsyncStorage.getItem(DISCLOSURE_KEY)]).then(([raw, disclosure]) => {
      if (!active) return;
      if (raw) {
        const saved = JSON.parse(raw) as { limits?: Partial<Limits>; selectedApps?: unknown };
        if (saved.limits && typeof saved.limits === 'object') {
          const next = { ...DEFAULT_LIMITS };
          for (const app of SOCIAL_APPS) { const value = saved.limits[app.id]; if (typeof value === 'number' && Number.isFinite(value)) next[app.id] = Math.max(5, Math.min(240, Math.round(value))); }
          setLimits(next);
        }
        if (Array.isArray(saved.selectedApps)) setSelectedApps(saved.selectedApps.filter((id): id is SocialAppId => SOCIAL_APPS.some((app) => app.id === id)));
      }
      setDisclosureAccepted(disclosure === 'accepted');
    }).catch(() => { if (active) setStorageError(true); }).finally(() => { if (active) setHydrated(true); });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    if (!isHydrated) return;
    const payload = JSON.stringify({ limits, selectedApps });
    queue.current = queue.current.then(() => AsyncStorage.setItem(STORAGE_KEY, payload)).catch(() => setStorageError(true));
    try { syncSnsRules(selectedApps, limits); } catch { setStorageError(true); }
  }, [isHydrated, limits, selectedApps]);
  const value = useMemo<SettingsContextValue>(() => ({
    limits, selectedApps, isHydrated, storageError, accessibilityDisclosureAccepted,
    setLimit: (id, minutes) => setLimits((current) => ({ ...current, [id]: Math.max(5, Math.min(240, Math.round(minutes))) })),
    toggleApp: (id) => setSelectedApps((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]),
    acceptAccessibilityDisclosure: async () => {
      try { await AsyncStorage.setItem(DISCLOSURE_KEY, 'accepted'); setDisclosureAccepted(true); }
      catch { setStorageError(true); }
    },
  }), [limits, selectedApps, isHydrated, storageError, accessibilityDisclosureAccepted]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
export function useSnsSettings() { const value = useContext(SettingsContext); if (!value) throw new Error('useSnsSettings must be used within SnsSettingsProvider'); return value; }
