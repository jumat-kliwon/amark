import api from '@/lib/axios';
import type { UserProfile, UserWithMembership, UpdatePasswordRequest, UpdatePasswordResponse, UpdateProfileRequest, UpdateProfileResponse, DiscordResponse, DiscordCallbackResponse, DiscordDisconnectResponse } from './type';

export const UserService = {
  getProfile: async (): Promise<UserProfile> => {
    const { data } = await api.get('/auth/user');
    return data;
  },
  getUserWithMembership: async (): Promise<{ data: UserWithMembership }> => {
    const { data } = await api.get('/user');
    return data;
  },
  updatePassword: async (payload: UpdatePasswordRequest): Promise<UpdatePasswordResponse> => {
    const { data } = await api.put('/user/password', payload);
    return data;
  },
  updateProfile: async (payload: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
    const { data } = await api.put('/user', payload);
    return data;
  },
  getDiscord: async (): Promise<DiscordResponse> => {
    const { data } = await api.get('/discord/connect');
    return data;
  },
  getDiscordCallback: async (code: string): Promise<DiscordCallbackResponse> => {
    const { data } = await api.get(`/discord/callback?code=${code}`);
    return data;
  },
  disconnectDiscord: async (): Promise<DiscordDisconnectResponse> => {
    const { data } = await api.post('/discord/disconnect');
    return data;
  },
};
