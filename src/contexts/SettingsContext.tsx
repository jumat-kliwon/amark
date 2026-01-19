'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSettings } from '@/hooks/use-settings';
import { SettingsData } from '@/services/settings/type';

interface SettingsContextType {
  settings: SettingsData | undefined;
  isLoading: boolean;
  error: Error | null;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { settings, isLoading, error } = useSettings();

  return (
    <SettingsContext.Provider value={{ settings, isLoading, error }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettingsContext() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettingsContext must be used within a SettingsProvider');
  }
  return context;
}
