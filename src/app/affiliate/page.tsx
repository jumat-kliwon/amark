"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { Copy, Users, Wallet, TrendingUp, ArrowUpRight, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface WithdrawRequest {
  id: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  status: "pending" | "processing" | "completed" | "rejected";
  createdAt: string;
  note?: string;
}

const stats = [
  { label: "Total Referral", value: "24", icon: Users },
  { label: "Pendapatan", value: "Rp 2.400.000", icon: Wallet },
  { label: "Konversi", value: "12%", icon: TrendingUp },
];

const initialWithdrawRequests: WithdrawRequest[] = [
  {
    id: "1",
    amount: 500000,
    bankName: "BCA",
    accountNumber: "1234567890",
    accountName: "Asdi Prasetya",
    status: "completed",
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    amount: 750000,
    bankName: "BNI",
    accountNumber: "0987654321",
    accountName: "Asdi Prasetya",
    status: "processing",
    createdAt: "2024-01-15",
  },
  {
    id: "3",
    amount: 300000,
    bankName: "Mandiri",
    accountNumber: "1122334455",
    accountName: "Asdi Prasetya",
    status: "pending",
    createdAt: "2024-01-18",
  },
  {
    id: "4",
    amount: 200000,
    bankName: "BRI",
    accountNumber: "5566778899",
    accountName: "Asdi Prasetya",
    status: "rejected",
    createdAt: "2024-01-05",
    note: "Nomor rekening tidak valid",
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const getStatusConfig = (status: WithdrawRequest["status"]) => {
  switch (status) {
    case "pending":
      return {
        label: "Menunggu",
        variant: "secondary" as const,
        icon: Clock,
        className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      };
    case "processing":
      return {
        label: "Diproses",
        variant: "secondary" as const,
        icon: AlertCircle,
        className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      };
    case "completed":
      return {
        label: "Selesai",
        variant: "secondary" as const,
        icon: CheckCircle2,
        className: "bg-green-500/10 text-green-500 border-green-500/20",
      };
    case "rejected":
      return {
        label: "Ditolak",
        variant: "destructive" as const,
        icon: XCircle,
        className: "bg-destructive/10 text-destructive border-destructive/20",
      };
  }
};

export default function AffiliatePage() {
  const { toast } = useToast();
  const affiliateLink = "https://akademicreator.com/ref/asditap";
  const availableBalance = 2400000;

  const [withdrawRequests, setWithdrawRequests] = useState<WithdrawRequest[]>(initialWithdrawRequests);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [withdrawForm, setWithdrawForm] = useState({
    amount: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink);
    toast({
      title: "Link disalin!",
      description: "Link referral berhasil disalin ke clipboard",
    });
  };

  const handleWithdrawSubmit = () => {
    const amount = parseInt(withdrawForm.amount);
    
    if (!amount || amount < 50000) {
      toast({
        title: "Jumlah tidak valid",
        description: "Minimal penarikan adalah Rp 50.000",
        variant: "destructive",
      });
      return;
    }

    if (amount > availableBalance) {
      toast({
        title: "Saldo tidak cukup",
        description: "Jumlah penarikan melebihi saldo tersedia",
        variant: "destructive",
      });
      return;
    }

    if (!withdrawForm.bankName || !withdrawForm.accountNumber || !withdrawForm.accountName) {
      toast({
        title: "Data tidak lengkap",
        description: "Mohon lengkapi semua data rekening",
        variant: "destructive",
      });
      return;
    }

    const newRequest: WithdrawRequest = {
      id: Date.now().toString(),
      amount,
      bankName: withdrawForm.bankName,
      accountNumber: withdrawForm.accountNumber,
      accountName: withdrawForm.accountName,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setWithdrawRequests([newRequest, ...withdrawRequests]);
    setWithdrawForm({ amount: "", bankName: "", accountNumber: "", accountName: "" });
    setIsDialogOpen(false);

    toast({
      title: "Request berhasil!",
      description: "Permintaan penarikan sedang diproses",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">Program Affiliate</h1>
          <p className="text-lg text-muted-foreground">
            Dapatkan komisi 20% untuk setiap referral yang berlangganan
          </p>
        </div>

        {/* Stats */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Affiliate Link */}
        <div className="rounded-xl border border-border bg-card p-8">
          <h2 className="mb-4 text-xl font-semibold">Link Referral Anda</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Bagikan link ini kepada teman atau followers Anda. Anda akan mendapat komisi 20%
            untuk setiap orang yang berlangganan melalui link Anda.
          </p>

          <div className="flex gap-3">
            <Input
              value={affiliateLink}
              readOnly
              className="flex-1 bg-background"
            />
            <Button onClick={copyToClipboard}>
              <Copy className="mr-2 h-4 w-4" />
              Salin Link
            </Button>
          </div>
        </div>

        {/* Withdraw Section */}
        <div className="mt-12 rounded-xl border border-border bg-card p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Penarikan Dana</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Saldo tersedia: <span className="font-semibold text-foreground">{formatCurrency(availableBalance)}</span>
              </p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Request Withdraw
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Request Penarikan Dana</DialogTitle>
                  <DialogDescription>
                    Masukkan jumlah dan detail rekening untuk penarikan komisi Anda.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Jumlah Penarikan</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Minimal Rp 50.000"
                      value={withdrawForm.amount}
                      onChange={(e) => setWithdrawForm({ ...withdrawForm, amount: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Saldo tersedia: {formatCurrency(availableBalance)}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankName">Nama Bank</Label>
                    <Input
                      id="bankName"
                      placeholder="Contoh: BCA, BNI, Mandiri"
                      value={withdrawForm.bankName}
                      onChange={(e) => setWithdrawForm({ ...withdrawForm, bankName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Nomor Rekening</Label>
                    <Input
                      id="accountNumber"
                      placeholder="Masukkan nomor rekening"
                      value={withdrawForm.accountNumber}
                      onChange={(e) => setWithdrawForm({ ...withdrawForm, accountNumber: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountName">Nama Pemilik Rekening</Label>
                    <Input
                      id="accountName"
                      placeholder="Sesuai buku tabungan"
                      value={withdrawForm.accountName}
                      onChange={(e) => setWithdrawForm({ ...withdrawForm, accountName: e.target.value })}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={handleWithdrawSubmit}>
                    Kirim Request
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Withdraw Request List */}
          <div className="space-y-4">
            <h3 className="font-medium text-muted-foreground">Riwayat Penarikan</h3>
            
            {withdrawRequests.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border py-8 text-center">
                <p className="text-muted-foreground">Belum ada riwayat penarikan</p>
              </div>
            ) : (
              <div className="space-y-3">
                {withdrawRequests.map((request) => {
                  const statusConfig = getStatusConfig(request.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <div
                      key={request.id}
                      className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${statusConfig.className}`}>
                          <StatusIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold">{formatCurrency(request.amount)}</p>
                          <p className="text-sm text-muted-foreground">
                            {request.bankName} • {request.accountNumber}
                          </p>
                          {request.note && (
                            <p className="mt-1 text-xs text-destructive">{request.note}</p>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <Badge variant={statusConfig.variant} className={statusConfig.className}>
                          {statusConfig.label}
                        </Badge>
                        <p className="mt-1 text-xs text-muted-foreground">{request.createdAt}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* How it works */}
        <div className="mt-12">
          <h2 className="mb-6 text-xl font-semibold">Cara Kerja</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mb-2 font-semibold">Bagikan Link</h3>
              <p className="text-sm text-muted-foreground">
                Bagikan link referral Anda di media sosial atau langsung ke teman
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mb-2 font-semibold">Teman Berlangganan</h3>
              <p className="text-sm text-muted-foreground">
                Ketika seseorang mendaftar melalui link Anda dan berlangganan
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mb-2 font-semibold">Dapatkan Komisi</h3>
              <p className="text-sm text-muted-foreground">
                Anda akan menerima 20% komisi dari pembayaran mereka
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
