import { SettingsResponse } from '@/services/settings/type';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://lms.acrehub.lol/api';

export async function getSettingsServer(): Promise<SettingsResponse | null> {
  try {
    const response = await fetch(`${API_URL}/settings`, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!response.ok) {
      return null;
    }

    const data: SettingsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    return null;
  }
}
