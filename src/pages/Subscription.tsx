import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Crown, Calendar, CreditCard, ArrowRight, Settings, Download, Eye, RefreshCw, CheckCircle2, XCircle, Clock, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

// Mock current subscription data
const currentSubscription = {
  name: "VIP Acre 1 Tahun",
  price: "1997000.00",
  accessType: "Lifetime",
  status: "Active",
  startDate: "2026-01-15T04:22:39.000000Z",
  endDate: null,
};

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
    id: 18,
    status: 1,
    status_label: "Pending",
    invoice_number: "INV-20260115-ANKOTVPA",
    transaction_number: "TXN-20260115-MXIBWJJS",
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
    created_at: "2026-01-15T05:27:06.000000Z",
    updated_at: "2026-01-15T05:27:06.000000Z",
    method: "midtrans",
    payment_detail: {
      snap_token: "6c1ded64-3182-483b-974c-64868af1f0fd",
      midtrans_order_id: "TXN-20260115-MXIBWJJS",
      snap_redirect_url: "https://app.sandbox.midtrans.com/snap/v4/redirection/0057c631-12bf-4097-a5ca-964972b4a587",
    },
    paid_at: null,
    payment_expires_at: "2026-01-16T05:27:06.000000Z",
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
    id: 17,
    status: 1,
    status_label: "Pending",
    invoice_number: "INV-20260115-I0KGKQPZ",
    transaction_number: "TXN-20260115-0O0AYZ5U",
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
    created_at: "2026-01-15T05:23:01.000000Z",
    updated_at: "2026-01-15T05:23:01.000000Z",
    method: "midtrans",
    payment_detail: {
      snap_token: "39c11d19-c7d6-4cb5-a8bb-f85f3d12ceae",
      midtrans_order_id: "TXN-20260115-0O0AYZ5U",
      snap_redirect_url: "https://app.sandbox.midtrans.com/snap/v4/redirection/eb335e1c-e95c-478d-95a1-c23ed6678fcc",
    },
    paid_at: null,
    payment_expires_at: "2026-01-16T05:23:01.000000Z",
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
    id: 14,
    status: 1,
    status_label: "Pending",
    invoice_number: "INV-20260115-CZVW7BEA",
    transaction_number: "TXN-20260115-FG3ZI8EH",
    total_amount: "1950000.00",
    order_items: [
      {
        id: "5",
        name: "Creator Pro Upgrade - Cicilan 2 (2x Cilican)",
        price: 1950000,
        quantity: 1,
        final_price: 1950000,
        membership_type: "Lifetime",
        membership_period: null,
      },
    ],
    created_at: "2026-01-15T05:17:54.000000Z",
    updated_at: "2026-01-15T05:17:54.000000Z",
    method: "midtrans",
    payment_detail: {
      snap_token: "a1785c81-975e-4768-9e1f-3f607ea32ffe",
      midtrans_order_id: "TXN-20260115-FG3ZI8EH",
      snap_redirect_url: "https://app.sandbox.midtrans.com/snap/v4/redirection/647040f8-f827-4577-863e-5aeadbb99acb",
    },
    paid_at: null,
    payment_expires_at: "2026-01-16T05:17:54.000000Z",
    coupons: [],
  },
  {
    id: 13,
    status: 1,
    status_label: "Pending",
    invoice_number: "INV-20260115-J3RCSIBM",
    transaction_number: "TXN-20260115-8SK27VXH",
    total_amount: "1950000.00",
    order_items: [
      {
        id: "5",
        name: "Creator Pro Upgrade - Cicilan 2 (2x Cilican)",
        price: 1950000,
        quantity: 1,
        final_price: 1950000,
        membership_type: "Lifetime",
        membership_period: null,
      },
    ],
    created_at: "2026-01-15T05:16:30.000000Z",
    updated_at: "2026-01-15T05:16:31.000000Z",
    method: "midtrans",
    payment_detail: {
      snap_token: "dec9e168-986f-4d77-95ab-40dd49aa2549",
      midtrans_order_id: "TXN-20260115-8SK27VXH",
      snap_redirect_url: "https://app.sandbox.midtrans.com/snap/v4/redirection/132b1687-89ba-4b5e-b1d1-f4c3fd2adcb3",
    },
    paid_at: null,
    payment_expires_at: "2026-01-16T05:16:31.000000Z",
    coupons: [],
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
  {
    id: 4,
    status: 2,
    status_label: "Paid",
    invoice_number: "INV-20260112-IB7Y4XMV",
    transaction_number: "TXN-20260112-V70T7N1X",
    total_amount: "399000.00",
    order_items: [
      {
        id: "2",
        name: "15 Hari Viral Fast Track",
        price: 399000,
        quantity: 1,
        final_price: 399000,
        membership_type: "Lifetime",
        membership_period: null,
      },
    ],
    created_at: "2026-01-12T22:35:44.000000Z",
    updated_at: "2026-01-12T22:35:44.000000Z",
    method: "manual",
    payment_detail: null,
    paid_at: "2026-01-12T22:35:44.000000Z",
    payment_expires_at: null,
    coupons: [],
  },
  {
    id: 3,
    status: 2,
    status_label: "Paid",
    invoice_number: "INV-20260112-UCEJUHX3",
    transaction_number: "TXN-20260112-1K4PYP2F",
    total_amount: "0.00",
    order_items: [
      {
        id: "3",
        name: "Kelab Ceban",
        price: 0,
        quantity: 1,
        final_price: 0,
        membership_type: "Lifetime",
        membership_period: null,
      },
    ],
    created_at: "2026-01-12T22:35:25.000000Z",
    updated_at: "2026-01-12T22:35:25.000000Z",
    method: "manual",
    payment_detail: null,
    paid_at: "2026-01-12T22:35:25.000000Z",
    payment_expires_at: null,
    coupons: [],
  },
  {
    id: 2,
    status: 2,
    status_label: "Paid",
    invoice_number: "INV-20260112-RJWTSLPZ",
    transaction_number: "TXN-20260112-ZXACBQSW",
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
    created_at: "2026-01-12T22:35:10.000000Z",
    updated_at: "2026-01-12T22:35:10.000000Z",
    method: "manual",
    payment_detail: null,
    paid_at: "2026-01-12T22:35:10.000000Z",
    payment_expires_at: null,
    coupons: [],
  },
  {
    id: 1,
    status: 2,
    status_label: "Paid",
    invoice_number: "INV-20260112-9BB8IV5Y",
    transaction_number: "TXN-20260112-SOBPHJBS",
    total_amount: "3797000.00",
    order_items: [
      {
        id: "18",
        name: "VIP Acre Lifetime",
        price: 3797000,
        quantity: 1,
        final_price: 3797000,
        membership_type: "Lifetime",
        membership_period: null,
      },
    ],
    created_at: "2026-01-12T22:31:23.000000Z",
    updated_at: "2026-01-12T22:31:23.000000Z",
    method: "manual",
    payment_detail: null,
    paid_at: "2026-01-12T22:31:23.000000Z",
    payment_expires_at: null,
    coupons: [],
  },
];

type PaymentStatus = "Pending" | "Paid" | "Failed" | "Refunded";

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

const Subscription = () => {
  const [selectedPayment, setSelectedPayment] = useState<typeof paymentHistory[0] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

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
        <div className="mb-8 rounded-2xl border border-border bg-card overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-muted/30 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <Crown className="h-7 w-7 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">{currentSubscription.name}</h2>
                  <Badge variant="default" className="bg-green-500/20 text-green-500 hover:bg-green-500/20">
                    {currentSubscription.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatPrice(currentSubscription.price)}
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
                  <p className="font-medium">{formatDate(currentSubscription.startDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/20 p-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Berakhir</p>
                  <p className="font-medium">{currentSubscription.endDate ? formatDate(currentSubscription.endDate) : "Selamanya"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/20 p-4">
                <Crown className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Tipe Akses</p>
                  <p className="font-medium">{currentSubscription.accessType}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Actions */}
          <div className="border-t border-border bg-muted/20 p-6">
            <Button asChild>
              <Link to="/subscription/plans">
                <ArrowRight className="mr-2 h-4 w-4" />
                Upgrade Paket
              </Link>
            </Button>
          </div>
        </div>

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
};

export default Subscription;
