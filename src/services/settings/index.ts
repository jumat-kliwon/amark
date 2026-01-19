import axios from '@/lib/axios';
import { SettingsResponse } from './type';

export const SettingsService = {
  getSettings: async (): Promise<SettingsResponse> => {
    const { data } = await axios.get('/settings');
    return data;
  },
};
