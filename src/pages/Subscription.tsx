import Header from "@/components/Header";
import { Check, Crown, Calendar, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "Rp 99.000",
    period: "/bulan",
    description: "Cocok untuk pemula yang ingin belajar",
    features: [
      "Akses 5 course dasar",
      "Sertifikat digital",
      "Forum komunitas",
      "Update materi bulanan",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "Rp 199.000",
    period: "/bulan",
    description: "Untuk creator yang serius berkembang",
    features: [
      "Akses semua course",
      "Sertifikat digital",
      "Forum komunitas",
      "Update materi bulanan",
      "Konsultasi 1-on-1",
      "Akses ke live session",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Rp 499.000",
    period: "/bulan",
    description: "Untuk tim dan perusahaan",
    features: [
      "Semua fitur Pro",
      "Akses untuk 5 anggota tim",
      "Dashboard admin",
      "Laporan progress tim",
      "Priority support",
      "Custom training",
    ],
  },
];

// Mock current subscription data
const currentSubscription = {
  plan: "basic",
  status: "active",
  startDate: "10 Desember 2024",
  nextBillingDate: "10 Januari 2025",
  price: "Rp 99.000",
};

const Subscription = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Current Subscription Info */}
        <div className="mb-12 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <Crown className="h-7 w-7 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">Subscription Aktif</h2>
                  <Badge variant="default" className="bg-green-500/20 text-green-500 hover:bg-green-500/20">
                    {currentSubscription.status === "active" ? "Aktif" : "Tidak Aktif"}
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  Paket <span className="font-semibold text-foreground">{plans.find(p => p.id === currentSubscription.plan)?.name}</span>
                </p>
              </div>
            </div>
            <Button variant="outline">Kelola Subscription</Button>
          </div>

          <div className="mt-6 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Mulai Berlangganan</p>
                <p className="font-medium">{currentSubscription.startDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Tagihan Berikutnya</p>
                <p className="font-medium">{currentSubscription.nextBillingDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Biaya Bulanan</p>
                <p className="font-medium">{currentSubscription.price}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Upgrade Paket Anda</h1>
          <p className="text-lg text-muted-foreground">
            Tingkatkan skill Anda dengan akses penuh ke semua materi pembelajaran
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => {
            const isCurrentPlan = plan.id === currentSubscription.plan;
            
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-8 transition-all hover:shadow-lg ${
                  plan.popular
                    ? "border-primary bg-card shadow-lg"
                    : isCurrentPlan
                    ? "border-green-500 bg-card"
                    : "border-border bg-card"
                }`}
              >
                {plan.popular && !isCurrentPlan && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                      Paling Populer
                    </span>
                  </div>
                )}
                
                {isCurrentPlan && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-green-500 px-4 py-1 text-xs font-semibold text-white">
                      Paket Anda
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="mb-2 text-xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={isCurrentPlan ? "outline" : plan.popular ? "default" : "outline"}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? "Paket Aktif" : "Pilih Paket"}
                </Button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Subscription;
