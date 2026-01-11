import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Crown, Calendar, CreditCard, ArrowRight, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock current subscription data
const currentSubscription = {
  plan: "Basic",
  status: "active",
  startDate: "10 Desember 2024",
  nextBillingDate: "10 Januari 2025",
  price: "Rp 99.000",
  features: [
    "Akses 5 course dasar",
    "Sertifikat digital",
    "Forum komunitas",
    "Update materi bulanan",
  ],
};

const Subscription = () => {
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
                  <h2 className="text-xl font-bold">Paket {currentSubscription.plan}</h2>
                  <Badge variant="default" className="bg-green-500/20 text-green-500 hover:bg-green-500/20">
                    {currentSubscription.status === "active" ? "Aktif" : "Tidak Aktif"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {currentSubscription.price}/bulan
                </p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/20 p-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Mulai Berlangganan</p>
                  <p className="font-medium">{currentSubscription.startDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/20 p-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Tagihan Berikutnya</p>
                  <p className="font-medium">{currentSubscription.nextBillingDate}</p>
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
            <h3 className="font-semibold">Riwayat Pembayaran</h3>
            <Button variant="ghost" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Pengaturan
            </Button>
          </div>
          <div className="divide-y divide-border">
            {[
              { date: "10 Desember 2024", amount: "Rp 99.000", status: "Berhasil" },
              { date: "10 November 2024", amount: "Rp 99.000", status: "Berhasil" },
              { date: "10 Oktober 2024", amount: "Rp 99.000", status: "Berhasil" },
            ].map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">{payment.amount}</p>
                  <p className="text-sm text-muted-foreground">{payment.date}</p>
                </div>
                <Badge variant="outline" className="text-green-500 border-green-500/30">
                  {payment.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Subscription;
