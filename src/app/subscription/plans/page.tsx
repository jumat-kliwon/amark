"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { Check, ArrowLeft, Tag, Loader2 } from "lucide-react";
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
import { useMembership } from "@/hooks/use-membership";
import { useUserWithMembership } from "@/hooks/use-user";
import { formatPrice } from "@/lib/subscription-utils";
import type { Membership } from "@/services/order/type";

export default function SubscriptionPlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<Membership | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const {
    membership,
    loadingMembership,
    checkCoupon,
    loadingCheckCoupon,
    couponValid,
    setCouponValid,
    coupons,
    setCoupons,
    newOrder,
    loadingNewOrder
  } = useMembership();

  const { membership: currentMembership } = useUserWithMembership();

  const handleSelectPlan = (plan: Membership) => {
    setSelectedPlan(plan);
    setCouponCode("");
    setCouponValid(true);
    setCoupons(null);
    setIsModalOpen(true);
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponValid(false);
      return;
    }
    if (selectedPlan) {
      checkCoupon({
        membership_id: selectedPlan.id,
        coupon: couponCode,
      });
    }
  };

  const handleConfirmOrder = () => {
    if (selectedPlan) {
      newOrder({
        membership_id: selectedPlan.id,
        coupon: couponCode,
      });
      setIsModalOpen(false);
    }
  };

  const isCurrentPlan = (planName: string) => {
    return currentMembership?.name === planName;
  };

  // Parse benefits from description or use default
  const getPlanFeatures = (plan: Membership): string[] => {
    if (plan.benefit && Array.isArray(plan.benefit)) {
      return plan.benefit;
    }
    // Default features based on access type
    return [
      "Akses penuh ke semua materi",
      "Sertifikat digital",
      "Forum komunitas",
      "Update materi berkala",
    ];
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-12">
        <Link
          href="/subscription"
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

        {loadingMembership ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="ml-3 text-muted-foreground">Memuat paket membership...</p>
          </div>
        ) : membership?.data && membership.data.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {membership.data
              .filter((plan) => plan.is_public && plan.is_active)
              .map((plan, index) => {
                const isPlanCurrent = isCurrentPlan(plan.name);
                const isPopular = index === 1; // Middle plan is popular

                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-2xl border-2 p-8 transition-all duration-300 ${isPopular
                        ? "border-primary bg-gradient-to-br from-primary/5 via-card to-card shadow-xl scale-105"
                        : isPlanCurrent
                          ? "border-green-500 bg-gradient-to-br from-green-500/5 to-card shadow-lg"
                          : "border-border bg-card hover:border-primary/50 hover:shadow-lg"
                      }`}
                  >
                    {/* Badge */}
                    {isPopular && !isPlanCurrent && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-primary/80 px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                          </span>
                          Paling Populer
                        </span>
                      </div>
                    )}

                    {isPlanCurrent && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-green-500 to-green-600 px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
                          <Check className="h-3 w-3" />
                          Paket Aktif
                        </span>
                      </div>
                    )}

                    {/* Plan Header */}
                    <div className="mb-6 pt-2">
                      <h3 className="mb-3 text-2xl font-bold tracking-tight">{plan.name}</h3>
                      <div
                        className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]"
                        dangerouslySetInnerHTML={{ __html: plan.description || "Paket membership terbaik untuk Anda" }}
                      />
                    </div>

                    {/* Price */}
                    <div className="mb-8 pb-6 border-b border-border">
                      <div className="flex items-baseline gap-2">
                        <span className={`text-4xl font-bold tracking-tight ${isPopular ? 'text-primary' : ''}`}>
                          {formatPrice(plan.price)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {plan.access_type_label === "Lifetime"
                          ? "Akses selamanya"
                          : `Akses selama ${plan.duration} hari`
                        }
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="mb-8 space-y-3">
                      {getPlanFeatures(plan).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <div className={`mt-0.5 rounded-full p-0.5 ${isPopular ? 'bg-primary/10' : 'bg-muted'}`}>
                            <Check className={`h-3.5 w-3.5 ${isPopular ? 'text-primary' : 'text-foreground'}`} />
                          </div>
                          <span className="flex-1">{feature}</span>
                        </li>
                      ))}
                      <li className="flex items-start gap-3 text-sm font-medium">
                        <div className={`mt-0.5 rounded-full p-0.5 ${isPopular ? 'bg-primary/10' : 'bg-muted'}`}>
                          <Check className={`h-3.5 w-3.5 ${isPopular ? 'text-primary' : 'text-foreground'}`} />
                        </div>
                        <span className="flex-1">Akses {plan.access_type_label}</span>
                      </li>
                    </ul>

                    {/* CTA Button */}
                    <Button
                      className={`w-full ${isPopular && !isPlanCurrent ? 'shadow-lg shadow-primary/25' : ''}`}
                      size="lg"
                      variant={isPlanCurrent ? "outline" : isPopular ? "default" : "outline"}
                      disabled={isPlanCurrent}
                      onClick={() => !isPlanCurrent && handleSelectPlan(plan)}
                    >
                      {isPlanCurrent ? "Paket Aktif" : "Pilih Paket"}
                    </Button>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Tidak ada paket membership yang tersedia saat ini.</p>
          </div>
        )}

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Punya pertanyaan? {" "}
            <Link href="/affiliate" className="text-primary hover:underline">
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
                    {formatPrice(selectedPlan.price)}
                  </span>
                </div>
                <div
                  className="text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: selectedPlan.description || "" }}
                />
              </div>

              {/* Coupon Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Kode Kupon (Opsional)</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Masukkan kode kupon"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value.toUpperCase());
                        setCouponValid(true);
                        setCoupons(null);
                      }}
                      className="pl-10"
                      maxLength={20}
                      disabled={loadingCheckCoupon}
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleApplyCoupon}
                    disabled={loadingCheckCoupon || !couponCode.trim()}
                  >
                    {loadingCheckCoupon ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Terapkan"
                    )}
                  </Button>
                </div>
                {!couponValid && !coupons && couponCode && (
                  <p className="text-sm text-destructive">Kode kupon tidak valid</p>
                )}
                {coupons && couponValid && (
                  <p className="text-sm text-green-500">
                    Kupon berhasil diterapkan! Diskon {formatPrice(String(coupons.data.discount_amount))}
                  </p>
                )}
              </div>

              {/* Order Summary */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(selectedPlan.price)}</span>
                </div>
                {coupons && couponValid && (
                  <div className="flex justify-between text-sm text-green-500">
                    <span>Diskon</span>
                    <span>- {formatPrice(String(coupons.data.discount_amount))}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total</span>
                  <span className="text-primary">
                    {coupons && couponValid
                      ? formatPrice(String(coupons.data.final_price))
                      : formatPrice(selectedPlan.price)
                    }
                  </span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={loadingNewOrder}
            >
              Batal
            </Button>
            <Button
              onClick={handleConfirmOrder}
              disabled={loadingNewOrder}
            >
              {loadingNewOrder ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Lanjutkan Pembayaran"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

