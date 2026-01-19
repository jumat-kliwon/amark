"use client";

import { Bell, CheckCheck, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useNotifications, useMarkNotificationAsRead, useMarkAllNotificationsAsRead, useDeleteNotification } from "@/hooks/use-notification";
import { formatTimeAgo } from "@/lib/helpers";

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [currentPage, setCurrentPage] = useState(1);
  
  const { notifications, pagination, isLoading } = useNotifications({ page: currentPage, limit: 15 });
  const markAsReadMutation = useMarkNotificationAsRead();
  const markAllAsReadMutation = useMarkAllNotificationsAsRead();
  const deleteNotificationMutation = useDeleteNotification();

  const unreadCount = notifications.filter((n) => !n.read_at).length;
  const filteredNotifications = filter === "all" 
    ? notifications 
    : notifications.filter((n) => !n.read_at);

  const markAsRead = (id: string) => {
    markAsReadMutation.mutate(id);
  };

  const markAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const deleteNotification = (id: string) => {
    deleteNotificationMutation.mutate(id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10">
              <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Notifikasi</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {unreadCount > 0
                  ? `${unreadCount} notifikasi belum dibaca`
                  : "Semua notifikasi telah dibaca"}
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={markAllAsRead} 
              className="w-full sm:w-auto"
              disabled={markAllAsReadMutation.isPending}
            >
              <CheckCheck className="mr-2 h-4 w-4" />
              Tandai Semua Dibaca
            </Button>
          )}
        </div>

        {/* Filter Header */}
        <div className="mb-6 flex items-center gap-2">
          <span className="text-sm font-medium">Semua Notifikasi</span>
          <Badge variant="secondary">
            {isLoading ? "..." : notifications.length}
          </Badge>
        </div>

        {/* Notification List */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 sm:py-16 px-4">
              <Loader2 className="mb-4 h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50 animate-spin" />
              <p className="text-base sm:text-lg font-medium text-muted-foreground text-center">
                Memuat notifikasi...
              </p>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 sm:py-16 px-4">
              <Bell className="mb-4 h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50" />
              <p className="text-base sm:text-lg font-medium text-muted-foreground text-center">
                Tidak ada notifikasi
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground/70 text-center">
                {filter === "unread"
                  ? "Semua notifikasi telah dibaca"
                  : "Anda belum memiliki notifikasi"}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const isUnread = !notification.read_at;
              return (
                <div
                  key={notification.id}
                  className={cn(
                    "group relative flex flex-col sm:flex-row gap-3 sm:gap-4 rounded-lg border border-border p-3 sm:p-4 transition-colors hover:bg-accent/50",
                    isUnread && "bg-accent/30 border-primary/20"
                  )}
                >
                  {/* Unread Indicator */}
                  {isUnread && (
                    <div className="absolute left-2 top-4 sm:top-1/2 h-2 w-2 sm:-translate-y-1/2 rounded-full bg-primary" />
                  )}

                  {/* Top row: Icon + Content */}
                  <div className="flex gap-3 sm:gap-4 flex-1 min-w-0">
                    {/* Icon */}
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-hover:bg-destructive group-hover:text-destructive-foreground">
                      <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={cn("text-sm sm:text-base font-medium", isUnread && "font-semibold")}>
                          {notification.data.title}
                        </h3>
                        <span className="shrink-0 text-xs text-muted-foreground hidden sm:block">
                          {formatTimeAgo(notification.created_at)}
                        </span>
                      </div>
                      <p className="mt-1 text-xs sm:text-sm text-muted-foreground line-clamp-2">
                        {notification.data.body}
                      </p>
                      <span className="text-xs text-muted-foreground mt-1 block sm:hidden">
                        {formatTimeAgo(notification.created_at)}
                      </span>
                    </div>
                  </div>

                  {/* Actions - always visible on mobile */}
                  <div className="flex shrink-0 items-center gap-1 sm:opacity-0 transition-opacity sm:group-hover:opacity-100 self-end sm:self-center">
                    {isUnread && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => markAsRead(notification.id)}
                        title="Tandai sudah dibaca"
                        disabled={markAsReadMutation.isPending}
                      >
                        <CheckCheck className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => deleteNotification(notification.id)}
                      title="Hapus notifikasi"
                      disabled={deleteNotificationMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
