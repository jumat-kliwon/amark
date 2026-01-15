import { Bell, CheckCheck, Trash2 } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const notifications = [
  {
    id: 1,
    type: "course",
    title: "Materi Baru Tersedia",
    message: "Modul 5: Advanced React Patterns telah ditambahkan ke kursus React Mastery.",
    time: "5 menit lalu",
    read: false,
  },
  {
    id: 2,
    type: "payment",
    title: "Pembayaran Berhasil",
    message: "Pembayaran langganan bulanan Anda sebesar Rp 99.000 telah berhasil diproses.",
    time: "1 jam lalu",
    read: false,
  },
  {
    id: 3,
    type: "certificate",
    title: "Sertifikat Diterbitkan",
    message: "Selamat! Sertifikat untuk kursus UI/UX Design Fundamentals telah diterbitkan.",
    time: "2 jam lalu",
    read: false,
  },
  {
    id: 4,
    type: "discussion",
    title: "Balasan Diskusi Baru",
    message: "Mentor telah membalas pertanyaan Anda di forum diskusi React Hooks.",
    time: "5 jam lalu",
    read: true,
  },
  {
    id: 5,
    type: "course",
    title: "Pengingat Belajar",
    message: "Anda belum melanjutkan kursus JavaScript Basics selama 3 hari. Yuk lanjutkan!",
    time: "1 hari lalu",
    read: true,
  },
  {
    id: 6,
    type: "payment",
    title: "Langganan Akan Berakhir",
    message: "Langganan Anda akan berakhir dalam 7 hari. Perpanjang sekarang untuk akses tanpa gangguan.",
    time: "2 hari lalu",
    read: true,
  },
];

const Notifications = () => {
  const [notificationList, setNotificationList] = useState(notifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notificationList.filter((n) => !n.read).length;
  const filteredNotifications = filter === "all" 
    ? notificationList 
    : notificationList.filter((n) => !n.read);

  const markAsRead = (id: number) => {
    setNotificationList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotificationList((prev) => prev.filter((n) => n.id !== id));
  };

  const getTypeColor = () => {
    return "bg-muted text-muted-foreground";
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
            <Button variant="outline" size="sm" onClick={markAllAsRead} className="w-full sm:w-auto">
              <CheckCheck className="mr-2 h-4 w-4" />
              Tandai Semua Dibaca
            </Button>
          )}
        </div>

        {/* Filter Header */}
        <div className="mb-6 flex items-center gap-2">
          <span className="text-sm font-medium">Semua Notifikasi</span>
          <Badge variant="secondary">
            {notificationList.length}
          </Badge>
        </div>

        {/* Notification List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
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
            filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "group relative flex flex-col sm:flex-row gap-3 sm:gap-4 rounded-lg border border-border p-3 sm:p-4 transition-colors hover:bg-accent/50",
                    !notification.read && "bg-accent/30 border-primary/20"
                  )}
                >
                  {/* Unread Indicator */}
                  {!notification.read && (
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
                        <h3 className={cn("text-sm sm:text-base font-medium", !notification.read && "font-semibold")}>
                          {notification.title}
                        </h3>
                        <span className="shrink-0 text-xs text-muted-foreground hidden sm:block">
                          {notification.time}
                        </span>
                      </div>
                      <p className="mt-1 text-xs sm:text-sm text-muted-foreground line-clamp-2">
                        {notification.message}
                      </p>
                      <span className="text-xs text-muted-foreground mt-1 block sm:hidden">
                        {notification.time}
                      </span>
                    </div>
                  </div>

                  {/* Actions - always visible on mobile */}
                  <div className="flex shrink-0 items-center gap-1 sm:opacity-0 transition-opacity sm:group-hover:opacity-100 self-end sm:self-center">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => markAsRead(notification.id)}
                        title="Tandai sudah dibaca"
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
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
