import api from '@/lib/axios';
import type { NotificationListResponse } from './type';

interface GetNotificationsParams {
  page?: number;
  limit?: number;
}

export const NotificationService = {
  getNotifications: async (params?: GetNotificationsParams): Promise<NotificationListResponse> => {
    const { data } = await api.get('/notifications', { params });
    return data;
  },

  markAsRead: async (id: string): Promise<void> => {
    await api.post(`/notifications/${id}/mark-as-read`);
  },

  markAllAsRead: async (): Promise<void> => {
    await api.put('/notifications/read-all');
  },

  deleteNotification: async (id: string): Promise<void> => {
    await api.delete(`/notifications/${id}`);
  },
};
