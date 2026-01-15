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

// More detailed payment history (extended for pagination demo)
const paymentHistory = [
  { 
    id: "INV-2024-1210",
    date: "10 Desember 2024", 
    amount: "Rp 99.000", 
    status: "success",
    method: "BCA Virtual Account",
    plan: "Basic",
    period: "10 Des 2024 - 10 Jan 2025",
  },
  { 
    id: "INV-2024-1110",
    date: "10 November 2024", 
    amount: "Rp 99.000", 
    status: "success",
    method: "GoPay",
    plan: "Basic",
    period: "10 Nov 2024 - 10 Des 2024",
  },
  { 
    id: "INV-2024-1010",
    date: "10 Oktober 2024", 
    amount: "Rp 99.000", 
    status: "success",
    method: "BCA Virtual Account",
    plan: "Basic",
    period: "10 Okt 2024 - 10 Nov 2024",
  },
  { 
    id: "INV-2024-0910",
    date: "10 September 2024", 
    amount: "Rp 99.000", 
    status: "failed",
    method: "Credit Card",
    plan: "Basic",
    period: "10 Sep 2024 - 10 Okt 2024",
    failureReason: "Kartu ditolak oleh bank penerbit",
  },
  { 
    id: "INV-2024-0810",
    date: "10 Agustus 2024", 
    amount: "Rp 99.000", 
    status: "refunded",
    method: "OVO",
    plan: "Basic",
    period: "10 Agu 2024 - 10 Sep 2024",
    refundReason: "Permintaan pengguna",
  },
  { 
    id: "INV-2024-0710",
    date: "10 Juli 2024", 
    amount: "Rp 99.000", 
    status: "success",
    method: "DANA",
    plan: "Basic",
    period: "10 Jul 2024 - 10 Agu 2024",
  },
  { 
    id: "INV-2024-0610",
    date: "10 Juni 2024", 
    amount: "Rp 99.000", 
    status: "success",
    method: "BCA Virtual Account",
    plan: "Basic",
    period: "10 Jun 2024 - 10 Jul 2024",
  },
  { 
    id: "INV-2024-0510",
    date: "10 Mei 2024", 
    amount: "Rp 99.000", 
    status: "success",
    method: "GoPay",
    plan: "Basic",
    period: "10 Mei 2024 - 10 Jun 2024",
  },
];

type PaymentStatus = "success" | "pending" | "failed" | "refunded";

const getStatusConfig = (status: PaymentStatus) => {
  switch (status) {
    case "success":
      return {
        label: "Berhasil",
        icon: CheckCircle2,
        className: "bg-green-500/10 text-green-500 border-green-500/30",
      };
    case "pending":
      return {
        label: "Menunggu",
        icon: Clock,
        className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
      };
    case "failed":
      return {
        label: "Gagal",
        icon: XCircle,
        className: "bg-red-500/10 text-red-500 border-red-500/30",
      };
    case "refunded":
      return {
        label: "Dikembalikan",
        icon: RefreshCw,
        className: "bg-blue-500/10 text-blue-500 border-blue-500/30",
      };
    default:
      return {
        label: status,
        icon: AlertCircle,
        className: "bg-muted text-muted-foreground",
      };
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
          <div className="flex flex-col gap-3 border-t border-border bg-muted/20 p-6 sm:flex-row">
            <Button asChild>
              <Link to="/subscription/plans">
                <ArrowRight className="mr-2 h-4 w-4" />
                Upgrade Paket
              </Link>
            </Button>
            <Button variant="outline">
              <CreditCard className="mr-2 h-4 w-4" />
              Kelola Pembayaran
            </Button>
            <Button variant="ghost" className="text-destructive hover:text-destructive">
              Batalkan Subscription
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
              const statusConfig = getStatusConfig(payment.status as PaymentStatus);
              const StatusIcon = statusConfig.icon;
              
              return (
                <div key={payment.id} className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: Payment Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        payment.status === "success" ? "bg-green-500/10" : 
                        payment.status === "failed" ? "bg-red-500/10" : 
                        payment.status === "refunded" ? "bg-blue-500/10" : "bg-muted"
                      }`}>
                        <StatusIcon className={`h-5 w-5 ${
                          payment.status === "success" ? "text-green-500" : 
                          payment.status === "failed" ? "text-red-500" : 
                          payment.status === "refunded" ? "text-blue-500" : "text-muted-foreground"
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{payment.amount}</p>
                          <Badge variant="outline" className={statusConfig.className}>
                            {statusConfig.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{payment.date}</p>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span>ID: {payment.id}</span>
                          <span>•</span>
                          <span>{payment.method}</span>
                          <span>•</span>
                          <span>Paket {payment.plan}</span>
                        </div>
                        {payment.failureReason && (
                          <p className="mt-2 text-xs text-red-400">
                            <AlertCircle className="inline h-3 w-3 mr-1" />
                            {payment.failureReason}
                          </p>
                        )}
                        {payment.refundReason && (
                          <p className="mt-2 text-xs text-blue-400">
                            <RefreshCw className="inline h-3 w-3 mr-1" />
                            {payment.refundReason}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setSelectedPayment(payment)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {payment.status === "success" && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      {payment.status === "failed" && (
                        <Button variant="outline" size="sm" className="text-xs">
                          <RefreshCw className="mr-1 h-3 w-3" />
                          Coba Lagi
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
                selectedPayment.status === "success" ? "bg-green-500/10" : 
                selectedPayment.status === "failed" ? "bg-red-500/10" : 
                selectedPayment.status === "refunded" ? "bg-blue-500/10" : "bg-muted"
              }`}>
                <div className="flex items-center gap-3">
                  {(() => {
                    const config = getStatusConfig(selectedPayment.status as PaymentStatus);
                    const Icon = config.icon;
                    return <Icon className={`h-6 w-6 ${
                      selectedPayment.status === "success" ? "text-green-500" : 
                      selectedPayment.status === "failed" ? "text-red-500" : 
                      selectedPayment.status === "refunded" ? "text-blue-500" : "text-muted-foreground"
                    }`} />;
                  })()}
                  <div>
                    <p className="font-semibold">{getStatusConfig(selectedPayment.status as PaymentStatus).label}</p>
                    <p className="text-sm text-muted-foreground">{selectedPayment.date}</p>
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div className="text-center py-4 border-b border-border">
                <p className="text-3xl font-bold">{selectedPayment.amount}</p>
                <p className="text-sm text-muted-foreground">Paket {selectedPayment.plan}</p>
              </div>

              {/* Details Grid */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Invoice ID</span>
                  <span className="font-medium">{selectedPayment.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Metode Pembayaran</span>
                  <span className="font-medium">{selectedPayment.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Periode</span>
                  <span className="font-medium text-right text-sm">{selectedPayment.period}</span>
                </div>
                {selectedPayment.failureReason && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Alasan Gagal</span>
                    <span className="font-medium text-red-400 text-right text-sm">{selectedPayment.failureReason}</span>
                  </div>
                )}
                {selectedPayment.refundReason && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Alasan Refund</span>
                    <span className="font-medium text-blue-400 text-right text-sm">{selectedPayment.refundReason}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setSelectedPayment(null)}>
                  Tutup
                </Button>
                {selectedPayment.status === "success" && (
                  <Button className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Unduh Invoice
                  </Button>
                )}
                {selectedPayment.status === "failed" && (
                  <Button className="flex-1">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Coba Bayar Lagi
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
