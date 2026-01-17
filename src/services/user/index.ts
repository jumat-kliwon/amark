import api from '@/lib/axios';
import type { UserProfile } from './type';

export const UserService = {
  getProfile: async (): Promise<UserProfile> => {
    const { data } = await api.get('/auth/user');
    return data;
  },
};
