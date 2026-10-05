import { createContext } from 'react';
import type { Settings } from '@/types';

export const STORAGE_KEY = 'portfolio-settings';

export const defaultSettings: Settings = {
  theme: 'dark',
  accentColor: '#11ba82',
  glowEnabled: true,
  reduceAnimations: false,
  sidebarCollapsed: false,
  fontSize: 'sm',
};

export const accentPresets = [
  '#11ba82',
  '#3b82f6',
  '#8b5cf6',
  '#f97316',
  '#ec4899',
  '#06b6d4',
] as const;

export interface SettingsContextValue {
  settings: Settings;
  update: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  reset: () => void;
}

export const SettingsContext = createContext<SettingsContextValue | null>(null);