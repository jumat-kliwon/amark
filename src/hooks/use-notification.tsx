'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { NotificationService } from '@/services/notification';
import { toast } from 'sonner';

interface GetNotificationsParams {
  page?: number;
  limit?: number;
}

export const useNotifications = (params?: GetNotificationsParams) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['notifications', params?.page, params?.limit],
    queryFn: () => NotificationService.getNotifications(params),
  });

  return {
    notifications: data?.data || [],
    pagination: data?.meta,
    links: data?.links,
    isLoading,
    error,
  };
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => NotificationService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: () => {
      toast.error('Gagal menandai notifikasi sebagai dibaca');
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => NotificationService.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('Semua notifikasi ditandai sebagai dibaca');
    },
    onError: () => {
      toast.error('Gagal menandai semua notifikasi sebagai dibaca');
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => NotificationService.deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('Notifikasi dihapus');
    },
    onError: () => {
      toast.error('Gagal menghapus notifikasi');
    },
  });
};
