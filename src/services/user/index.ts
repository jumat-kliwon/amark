import api from '@/lib/axios';
import type { UserProfile, UpdatePasswordRequest, UpdatePasswordResponse } from './type';

export const UserService = {
  getProfile: async (): Promise<UserProfile> => {
    const { data } = await api.get('/auth/user');
    return data;
  },
  updatePassword: async (payload: UpdatePasswordRequest): Promise<UpdatePasswordResponse> => {
    const { data } = await api.put('/user/password', payload);
    return data;
  },
};
