import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Check, ArrowLeft, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
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
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setCouponCode("");
    setCouponApplied(false);
    setCouponError("");
    setIsModalOpen(true);
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError("Masukkan kode kupon");
      return;
    }
    // Simulate coupon validation (would be API call in real app)
    if (couponCode.toUpperCase() === "DISKON20") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Kode kupon tidak valid");
      setCouponApplied(false);
    }
  };

  const handleConfirmOrder = () => {
    // Handle order confirmation (would integrate with payment gateway)
    console.log("Order confirmed:", { plan: selectedPlan, coupon: couponCode });
    setIsModalOpen(false);
  };

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
                  onClick={() => !isCurrentPlan && handleSelectPlan(plan)}
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

      {/* Order Summary Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ringkasan Pesanan</DialogTitle>
            <DialogDescription>
              Periksa detail pesanan Anda sebelum melanjutkan pembayaran
            </DialogDescription>
          </DialogHeader>

          {selectedPlan && (
            <div className="space-y-6">
              {/* Plan Details */}
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{selectedPlan.name}</h4>
                  <span className="font-bold text-primary">
                    {selectedPlan.price}
                    <span className="text-sm font-normal text-muted-foreground">
                      {selectedPlan.period}
                    </span>
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{selectedPlan.description}</p>
              </div>

              {/* Coupon Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Kode Kupon</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Masukkan kode kupon"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value.toUpperCase());
                        setCouponError("");
                        setCouponApplied(false);
                      }}
                      className="pl-10"
                      maxLength={20}
                    />
                  </div>
                  <Button variant="outline" onClick={handleApplyCoupon}>
                    Terapkan
                  </Button>
                </div>
                {couponError && (
                  <p className="text-sm text-destructive">{couponError}</p>
                )}
                {couponApplied && (
                  <p className="text-sm text-green-500">Kupon berhasil diterapkan! Diskon 20%</p>
                )}
              </div>

              {/* Order Summary */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{selectedPlan.price}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-sm text-green-500">
                    <span>Diskon (20%)</span>
                    <span>- Rp {(parseInt(selectedPlan.price.replace(/\D/g, '')) * 0.2).toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total</span>
                  <span className="text-primary">
                    Rp {couponApplied 
                      ? (parseInt(selectedPlan.price.replace(/\D/g, '')) * 0.8).toLocaleString('id-ID')
                      : parseInt(selectedPlan.price.replace(/\D/g, '')).toLocaleString('id-ID')
                    }
                  </span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleConfirmOrder}>
              Lanjutkan Pembayaran
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriptionPlans;
