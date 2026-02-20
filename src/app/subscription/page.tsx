"use client";

import Header from "@/components/Header";
import { useUserWithMembership } from "@/hooks/use-user";

// Components
import { SubscriptionCard } from "@/components/subscription/SubscriptionCard";
import { EmptySubscription } from "@/components/subscription/EmptySubscription";
import { LoadingState } from "@/components/subscription/LoadingState";

// Utils
import { formatDate, formatPrice } from "@/lib/subscription-utils";

export default function SubscriptionPage() {
  const { membership, isLoading: isLoadingMembership } = useUserWithMembership();

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
          <LoadingState message="Memuat data subscription..." />
        ) : membership && membership.name ? (
          <SubscriptionCard
            membership={membership}
            formatDate={formatDate}
            formatPrice={formatPrice}
          />
        ) : (
          <EmptySubscription />
        )}
      </main>
    </div>
  );
}
