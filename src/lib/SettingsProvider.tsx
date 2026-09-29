import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Settings } from '@/types';
import {
  SettingsContext,
  STORAGE_KEY,
  defaultSettings,
  type SettingsContextValue,
} from '@/lib/settings-context';

function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored
      ? { ...defaultSettings, ...(JSON.parse(stored) as Partial<Settings>) }
      : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(loadSettings);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = settings.theme;
    root.dataset.fontSize = settings.fontSize;
    root.dataset.glow = settings.glowEnabled ? 'on' : 'off';
    root.dataset.motion = settings.reduceAnimations ? 'reduced' : 'full';
    root.style.setProperty('--c-accent', settings.accentColor);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* storage unavailable, ignore */
    }
  }, [settings]);

  const update = useCallback<SettingsContextValue['update']>((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => setSettings(defaultSettings), []);

  const value = useMemo(() => ({ settings, update, reset }), [settings, update, reset]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}