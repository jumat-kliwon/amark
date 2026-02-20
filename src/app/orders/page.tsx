"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { useOrders } from "@/hooks/use-order";

// Components
import { PaymentHistory } from "@/components/subscription/PaymentHistory";

// Utils
import {
  formatDate,
  formatPrice,
  getStatusConfig,
  getMethodLabel,
} from "@/lib/subscription-utils";

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { orders, pagination, links, isLoading } = useOrders(currentPage);

  const goToPage = (page: number) => {
    if (page >= 1 && pagination) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Riwayat Pesanan</h1>
          <p className="text-muted-foreground">
            Lihat semua pesanan dan riwayat pembayaran Anda
          </p>
        </div>

        <PaymentHistory
          orders={orders}
          isLoading={isLoading}
          pagination={pagination}
          links={links}
          currentPage={currentPage}
          onPageChange={goToPage}
          formatDate={formatDate}
          formatPrice={formatPrice}
          getStatusConfig={getStatusConfig}
          getMethodLabel={getMethodLabel}
        />
      </main>
    </div>
  );
}
