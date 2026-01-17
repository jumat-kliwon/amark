import api from '@/lib/axios';
import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from './type';

export const AuthService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await api.post('/auth/login', payload);
    return data;
  },

  logout: async () => {
    const { data } = await api.post('/auth/logout');
    return data;
  },

  register: async (
    payload: RegisterPayload
  ): Promise<RegisterResponse> => {
    const { data } = await api.post('/auth/register', payload);
    return data;
  },
};
