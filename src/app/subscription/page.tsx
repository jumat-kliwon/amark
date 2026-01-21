"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { useUserWithMembership } from "@/hooks/use-user";
import { useOrders } from "@/hooks/use-order";
import type { Order } from "@/services/order/type";

// Components
import { SubscriptionCard } from "@/components/subscription/SubscriptionCard";
import { EmptySubscription } from "@/components/subscription/EmptySubscription";
import { LoadingState } from "@/components/subscription/LoadingState";
import { PaymentHistory } from "@/components/subscription/PaymentHistory";
import { PaymentDetailDialog } from "@/components/subscription/PaymentDetailDialog";

// Utils
import {
  formatDate,
  formatPrice,
  getStatusConfig,
  getMethodLabel,
} from "@/lib/subscription-utils";

export default function SubscriptionPage() {
  const [selectedPayment, setSelectedPayment] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { user, membership, isLoading: isLoadingMembership } = useUserWithMembership();
  const { orders, pagination, links, isLoading: isLoadingOrders } = useOrders(currentPage);

  const goToPage = (page: number) => {
    if (page >= 1 && pagination) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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

        {/* Billing History */}
        <PaymentHistory
          orders={orders}
          isLoading={isLoadingOrders}
          pagination={pagination}
          links={links}
          currentPage={currentPage}
          onPageChange={goToPage}
          onViewDetails={setSelectedPayment}
          formatDate={formatDate}
          formatPrice={formatPrice}
          getStatusConfig={getStatusConfig}
          getMethodLabel={getMethodLabel}
        />
      </main>

      {/* Payment Detail Dialog */}
      <PaymentDetailDialog
        payment={selectedPayment}
        isOpen={!!selectedPayment}
        onClose={() => setSelectedPayment(null)}
        formatDate={formatDate}
        formatPrice={formatPrice}
        getStatusConfig={getStatusConfig}
        getMethodLabel={getMethodLabel}
      />
    </div>
  );
}
