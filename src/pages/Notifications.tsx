import { Bell, CheckCheck, Trash2, MessageCircle, CreditCard, Award, BookOpen } from "lucide-react";
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
    icon: BookOpen,
  },
  {
    id: 2,
    type: "payment",
    title: "Pembayaran Berhasil",
    message: "Pembayaran langganan bulanan Anda sebesar Rp 99.000 telah berhasil diproses.",
    time: "1 jam lalu",
    read: false,
    icon: CreditCard,
  },
  {
    id: 3,
    type: "certificate",
    title: "Sertifikat Diterbitkan",
    message: "Selamat! Sertifikat untuk kursus UI/UX Design Fundamentals telah diterbitkan.",
    time: "2 jam lalu",
    read: false,
    icon: Award,
  },
  {
    id: 4,
    type: "discussion",
    title: "Balasan Diskusi Baru",
    message: "Mentor telah membalas pertanyaan Anda di forum diskusi React Hooks.",
    time: "5 jam lalu",
    read: true,
    icon: MessageCircle,
  },
  {
    id: 5,
    type: "course",
    title: "Pengingat Belajar",
    message: "Anda belum melanjutkan kursus JavaScript Basics selama 3 hari. Yuk lanjutkan!",
    time: "1 hari lalu",
    read: true,
    icon: BookOpen,
  },
  {
    id: 6,
    type: "payment",
    title: "Langganan Akan Berakhir",
    message: "Langganan Anda akan berakhir dalam 7 hari. Perpanjang sekarang untuk akses tanpa gangguan.",
    time: "2 hari lalu",
    read: true,
    icon: CreditCard,
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
      <main className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Notifikasi</h1>
              <p className="text-sm text-muted-foreground">
                {unreadCount > 0
                  ? `${unreadCount} notifikasi belum dibaca`
                  : "Semua notifikasi telah dibaca"}
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <CheckCheck className="mr-2 h-4 w-4" />
              Tandai Semua Dibaca
            </Button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            Semua
            <Badge variant="secondary" className="ml-2">
              {notificationList.length}
            </Badge>
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("unread")}
          >
            Belum Dibaca
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Notification List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
              <Bell className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <p className="text-lg font-medium text-muted-foreground">
                Tidak ada notifikasi
              </p>
              <p className="text-sm text-muted-foreground/70">
                {filter === "unread"
                  ? "Semua notifikasi telah dibaca"
                  : "Anda belum memiliki notifikasi"}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={cn(
                    "group relative flex gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-accent/50",
                    !notification.read && "bg-accent/30 border-primary/20"
                  )}
                >
                  {/* Unread Indicator */}
                  {!notification.read && (
                    <div className="absolute left-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary" />
                  )}

                  {/* Icon */}
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                      getTypeColor()
                    )}
                  >
                    <IconComponent className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={cn("font-medium", !notification.read && "font-semibold")}>
                        {notification.title}
                      </h3>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
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
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
