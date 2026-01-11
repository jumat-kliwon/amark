import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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

// Current plan ID (would come from user state/API)
const currentPlanId = "basic";

const SubscriptionPlans = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-6xl px-6 py-12">
        <Link
          to="/subscription"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Subscription
        </Link>

        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Pilih Paket yang Tepat</h1>
          <p className="text-lg text-muted-foreground">
            Tingkatkan skill Anda dengan akses penuh ke semua materi pembelajaran
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => {
            const isCurrentPlan = plan.id === currentPlanId;
            
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
                      Paket Anda Saat Ini
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

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Punya pertanyaan? {" "}
            <Link to="/affiliate" className="text-primary hover:underline">
              Hubungi tim support kami
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SubscriptionPlans;
