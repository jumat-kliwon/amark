import Header from "@/components/Header";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
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

const Subscription = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Pilih Paket Subscription</h1>
          <p className="text-lg text-muted-foreground">
            Tingkatkan skill Anda dengan akses penuh ke semua materi pembelajaran
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 transition-all hover:shadow-lg ${
                plan.popular
                  ? "border-primary bg-card shadow-lg"
                  : "border-border bg-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    Paling Populer
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
                variant={plan.popular ? "default" : "outline"}
              >
                Pilih Paket
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Subscription;
