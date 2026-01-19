"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { Crown, Calendar, CreditCard, ArrowRight, Settings, Download, Eye, RefreshCw, CheckCircle2, XCircle, Clock, AlertCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
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

// Payment history data from API
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  final_price: number;
  membership_type: string;
  membership_period: string | null;
}

interface Coupon {
  id: number;
  code: string;
  discount_type: number;
  discount_value: string;
  discount_amount: number;
  original_price: number;
  final_price: number;
}

interface PaymentHistoryItem {
  id: number;
  status: number;
  status_label: string;
  invoice_number: string;
  transaction_number: string;
  total_amount: string;
  order_items: OrderItem[];
  created_at: string;
  updated_at: string;
  method: string;
  payment_detail: {
    snap_token?: string;
    midtrans_order_id?: string;
    snap_redirect_url?: string;
  } | null;
  paid_at: string | null;
  payment_expires_at: string | null;
  coupons: Coupon | Coupon[];
}

const paymentHistory: PaymentHistoryItem[] = [
  {
    id: 19,
    status: 1,
    status_label: "Pending",
    invoice_number: "INV-20260115-TW4SA7WX",
    transaction_number: "TXN-20260115-P97H4ODW",
    total_amount: "1657500.00",
    order_items: [
      {
        id: "5",
        name: "Creator Pro Upgrade - Cicilan 2 (2x Cilican)",
        price: 1950000,
        quantity: 1,
        final_price: 1657500,
        membership_type: "Lifetime",
        membership_period: null,
      },
    ],
    created_at: "2026-01-15T07:22:45.000000Z",
    updated_at: "2026-01-15T07:22:46.000000Z",
    method: "midtrans",
    payment_detail: {
      snap_token: "baa097d5-5a2d-4cfd-a8d8-aef92ac815e0",
      midtrans_order_id: "TXN-20260115-P97H4ODW",
      snap_redirect_url: "https://app.sandbox.midtrans.com/snap/v4/redirection/fbfd246f-2c45-480c-9980-79da559261f7",
    },
    paid_at: null,
    payment_expires_at: "2026-01-16T07:22:46.000000Z",
    coupons: {
      id: 1,
      code: "GRATIS100",
      discount_type: 1,
      discount_value: "15.00",
      discount_amount: 292500,
      original_price: 1950000,
      final_price: 1657500,
    },
  },
  {
    id: 8,
    status: 2,
    status_label: "Paid",
    invoice_number: "INV-20260115-2VHG34HZ",
    transaction_number: "TXN-20260115-KCBKXPFK",
    total_amount: "1997000.00",
    order_items: [
      {
        id: "4",
        name: "VIP Acre 1 Tahun",
        price: 1997000,
        quantity: 1,
        final_price: 1997000,
        membership_type: "Lifetime",
        membership_period: null,
      },
    ],
    created_at: "2026-01-15T04:22:39.000000Z",
    updated_at: "2026-01-15T04:22:39.000000Z",
    method: "manual",
    payment_detail: null,
    paid_at: "2026-01-15T04:22:39.000000Z",
    payment_expires_at: null,
    coupons: [],
  },
];

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

const ITEMS_PER_PAGE = 3;

export default function SubscriptionPage() {
  const [selectedPayment, setSelectedPayment] = useState<typeof paymentHistory[0] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { user, membership, isLoading: isLoadingMembership } = useUserWithMembership();

  const totalPages = Math.ceil(paymentHistory.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPayments = paymentHistory.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
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
              <p className="text-sm text-muted-foreground">{paymentHistory.length} transaksi</p>
            </div>
            <Button variant="ghost" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Pengaturan
            </Button>
          </div>
          <div className="divide-y divide-border">
            {paginatedPayments.map((payment) => {
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
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-border p-4">
              <p className="text-sm text-muted-foreground">
                Menampilkan {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, paymentHistory.length)} dari {paymentHistory.length} transaksi
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
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
