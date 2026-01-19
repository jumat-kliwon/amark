"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { Crown, Calendar, CreditCard, ArrowRight, Download, Eye, RefreshCw, CheckCircle2, XCircle, Clock, AlertCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useUserWithMembership } from "@/hooks/use-user";
import { useOrders } from "@/hooks/use-order";
import type { Order } from "@/services/order/type";

// Helper function to format date
const formatDate = (dateString: string | null) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Helper function to format price
const formatPrice = (price: string) => {
  const numPrice = parseFloat(price);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(numPrice);
};


const getStatusConfig = (statusLabel: string) => {
  switch (statusLabel) {
    case "Paid":
      return {
        label: "Berhasil",
        icon: CheckCircle2,
        className: "bg-green-500/10 text-green-500 border-green-500/30",
      };
    case "Pending":
      return {
        label: "Menunggu",
        icon: Clock,
        className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
      };
    case "Failed":
      return {
        label: "Gagal",
        icon: XCircle,
        className: "bg-red-500/10 text-red-500 border-red-500/30",
      };
    case "Refunded":
      return {
        label: "Dikembalikan",
        icon: RefreshCw,
        className: "bg-blue-500/10 text-blue-500 border-blue-500/30",
      };
    default:
      return {
        label: statusLabel,
        icon: AlertCircle,
        className: "bg-muted text-muted-foreground",
      };
  }
};

const getMethodLabel = (method: string) => {
  switch (method) {
    case "midtrans":
      return "Midtrans";
    case "manual":
      return "Manual";
    default:
      return method;
  }
};

export default function SubscriptionPage() {
  const [selectedPayment, setSelectedPayment] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { user, membership, isLoading: isLoadingMembership } = useUserWithMembership();
  const { orders, pagination, links, isLoading: isLoadingOrders } = useOrders(currentPage);

  const goToPage = (page: number) => {
    if (page >= 1 && pagination) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const totalPages = pagination ? Math.ceil((pagination.to || 0) / pagination.per_page) : 1;
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Subscription Saya</h1>
          <p className="text-muted-foreground">
            Kelola subscription dan lihat detail paket Anda
          </p>
        </div>

        {/* Current Subscription Card */}
        {isLoadingMembership ? (
          <div className="mb-8 flex items-center justify-center rounded-2xl border border-border bg-card p-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="ml-3 text-muted-foreground">Memuat data subscription...</p>
          </div>
        ) : membership ? (
          <div className="mb-8 rounded-2xl border border-border bg-card overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-muted/30 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <Crown className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">{membership.name}</h2>
                    <Badge variant="default" className="bg-green-500/20 text-green-500 hover:bg-green-500/20">
                      Aktif
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(membership.price)}
                  </p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-6">
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/20 p-4">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Mulai Berlangganan</p>
                    <p className="font-medium">{formatDate(membership.start_date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/20 p-4">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Berakhir</p>
                    <p className="font-medium">{membership.end_date ? formatDate(membership.end_date) : "Selamanya"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/20 p-4">
                  <Crown className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Tipe Akses</p>
                    <p className="font-medium">{membership.access_type}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-border bg-muted/20 p-6">
              {membership.access_type === "Lifetime" ? (
                <Button disabled className="opacity-50 cursor-not-allowed">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Upgrade Paket
                </Button>
              ) : (
                <Button asChild>
                  <Link href="/subscription/plans">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Upgrade Paket
                  </Link>
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="mb-8 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
            <Crown className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="mb-2 text-lg font-semibold">Belum ada subscription aktif</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Berlangganan paket untuk mendapatkan akses ke semua konten
            </p>
            <Button asChild>
              <Link href="/subscription/plans">
                <ArrowRight className="mr-2 h-4 w-4" />
                Lihat Paket
              </Link>
            </Button>
          </div>
        )}

        {/* Billing History */}
        <div className="rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-6">
            <div>
              <h3 className="font-semibold">Riwayat Pembayaran</h3>
              <p className="text-sm text-muted-foreground">
                {isLoadingOrders ? "Memuat..." : `${pagination?.to || 0} transaksi`}
              </p>
            </div>
          </div>
          
          {isLoadingOrders ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="ml-3 text-muted-foreground">Memuat riwayat pembayaran...</p>
            </div>
          ) : orders.length > 0 ? (
            <>
              <div className="divide-y divide-border">
                {orders.map((payment) => {
                  const statusConfig = getStatusConfig(payment.status_label);
                  const StatusIcon = statusConfig.icon;
                  const orderItemName = payment.order_items[0]?.name || "-";
                  
                  return (
                    <div key={payment.id} className="p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        {/* Left: Payment Info */}
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            payment.status_label === "Paid" ? "bg-green-500/10" : 
                            payment.status_label === "Failed" ? "bg-red-500/10" : 
                            payment.status_label === "Refunded" ? "bg-blue-500/10" : "bg-yellow-500/10"
                          }`}>
                            <StatusIcon className={`h-5 w-5 ${
                              payment.status_label === "Paid" ? "text-green-500" : 
                              payment.status_label === "Failed" ? "text-red-500" : 
                              payment.status_label === "Refunded" ? "text-blue-500" : "text-yellow-500"
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold">{formatPrice(payment.total_amount)}</p>
                              <Badge variant="outline" className={statusConfig.className}>
                                {statusConfig.label}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{formatDate(payment.created_at)}</p>
                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                              <span>{payment.invoice_number}</span>
                              <span>•</span>
                              <span>{getMethodLabel(payment.method)}</span>
                              <span>•</span>
                              <span>{orderItemName}</span>
                            </div>
                            {payment.status_label === "Pending" && payment.payment_expires_at && (
                              <p className="mt-2 text-xs text-yellow-400">
                                <Clock className="inline h-3 w-3 mr-1" />
                                Kedaluwarsa: {formatDate(payment.payment_expires_at)}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-xs"
                            onClick={() => setSelectedPayment(payment)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {payment.status_label === "Pending" && payment.payment_detail?.snap_redirect_url && (
                            <Button 
                              size="sm" 
                              className="text-xs"
                              onClick={() => window.open(payment.payment_detail?.snap_redirect_url, '_blank')}
                            >
                              Bayar Sekarang
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {pagination && (links?.next || links?.prev || pagination.current_page > 1) && (
                <div className="flex items-center justify-between border-t border-border p-4">
                  <p className="text-sm text-muted-foreground">
                    Menampilkan {pagination.from || 0}-{pagination.to || 0} dari {pagination.to || 0} transaksi
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={!links?.prev}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {pagination.current_page && (
                      <Button
                        variant="default"
                        size="icon"
                        className="h-8 w-8"
                      >
                        {pagination.current_page}
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={!links?.next}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-12">
              <CreditCard className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="mb-2 text-lg font-semibold">Belum ada riwayat pembayaran</h3>
              <p className="text-sm text-muted-foreground">
                Riwayat pembayaran Anda akan muncul di sini
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Payment Detail Dialog */}
      <Dialog open={!!selectedPayment} onOpenChange={() => setSelectedPayment(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detail Pembayaran</DialogTitle>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="space-y-4">
              {/* Status Banner */}
              <div className={`rounded-lg p-4 ${
                selectedPayment.status_label === "Paid" ? "bg-green-500/10" : 
                selectedPayment.status_label === "Failed" ? "bg-red-500/10" : 
                selectedPayment.status_label === "Refunded" ? "bg-blue-500/10" : "bg-yellow-500/10"
              }`}>
                <div className="flex items-center gap-3">
                  {(() => {
                    const config = getStatusConfig(selectedPayment.status_label);
                    const Icon = config.icon;
                    return <Icon className={`h-6 w-6 ${
                      selectedPayment.status_label === "Paid" ? "text-green-500" : 
                      selectedPayment.status_label === "Failed" ? "text-red-500" : 
                      selectedPayment.status_label === "Refunded" ? "text-blue-500" : "text-yellow-500"
                    }`} />;
                  })()}
                  <div>
                    <p className="font-semibold">{getStatusConfig(selectedPayment.status_label).label}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(selectedPayment.created_at)}</p>
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div className="text-center py-4 border-b border-border">
                <p className="text-3xl font-bold">{formatPrice(selectedPayment.total_amount)}</p>
                <p className="text-sm text-muted-foreground">{selectedPayment.order_items[0]?.name || "-"}</p>
              </div>

              {/* Details Grid */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Invoice</span>
                  <span className="font-medium text-sm">{selectedPayment.invoice_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaksi</span>
                  <span className="font-medium text-sm">{selectedPayment.transaction_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Metode Pembayaran</span>
                  <span className="font-medium">{getMethodLabel(selectedPayment.method)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tipe Akses</span>
                  <span className="font-medium">{selectedPayment.order_items[0]?.membership_type || "-"}</span>
                </div>
                {selectedPayment.paid_at && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dibayar Pada</span>
                    <span className="font-medium text-sm">{formatDate(selectedPayment.paid_at)}</span>
                  </div>
                )}
                {selectedPayment.payment_expires_at && !selectedPayment.paid_at && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Kedaluwarsa</span>
                    <span className="font-medium text-sm text-yellow-400">{formatDate(selectedPayment.payment_expires_at)}</span>
                  </div>
                )}
                {/* Coupon Info */}
                {selectedPayment.coupons && !Array.isArray(selectedPayment.coupons) && (
                  <div className="border-t border-border pt-3 mt-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Kupon</span>
                      <span className="font-medium text-primary">{selectedPayment.coupons.code}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Diskon</span>
                      <span className="font-medium text-green-500">-{formatPrice(String(selectedPayment.coupons.discount_amount))}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setSelectedPayment(null)}>
                  Tutup
                </Button>
                {selectedPayment.status_label === "Paid" && (
                  <Button className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Unduh Invoice
                  </Button>
                )}
                {selectedPayment.status_label === "Pending" && selectedPayment.payment_detail?.snap_redirect_url && (
                  <Button 
                    className="flex-1"
                    onClick={() => window.open(selectedPayment.payment_detail?.snap_redirect_url, '_blank')}
                  >
                    Bayar Sekarang
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
