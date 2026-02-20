import { Package, Loader2 } from "lucide-react";
import { PaymentHistoryItem } from "./PaymentHistoryItem";
import { Pagination } from "./Pagination";
import type { Order } from "@/services/order/type";

interface PaymentHistoryProps {
  orders: Order[];
  isLoading: boolean;
  pagination: {
    from: number;
    to: number;
    per_page: number;
    current_page: number;
  } | null;
  links: {
    next: string | null;
    prev: string | null;
  } | null;
  currentPage: number;
  onPageChange: (page: number) => void;
  formatDate: (dateString: string | null) => string;
  formatPrice: (price: string) => string;
  getStatusConfig: (statusLabel: string) => {
    label: string;
    icon: any;
    className: string;
  };
  getMethodLabel: (method: string) => string;
}

export function PaymentHistory({
  orders,
  isLoading,
  pagination,
  links,
  currentPage,
  onPageChange,
  formatDate,
  formatPrice,
  getStatusConfig,
  getMethodLabel,
}: PaymentHistoryProps) {
  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="mt-3 text-muted-foreground">Memuat riwayat pesanan...</p>
        </div>
      ) : orders.length > 0 ? (
        <>
          <div className="space-y-6">
            {orders.map((payment) => (
              <PaymentHistoryItem
                key={payment.id}
                payment={payment}
                formatDate={formatDate}
                formatPrice={formatPrice}
                getStatusConfig={getStatusConfig}
                getMethodLabel={getMethodLabel}
              />
            ))}
          </div>

          {pagination && (links?.next || links?.prev || pagination.current_page > 1) && (
            <Pagination
              pagination={pagination}
              links={links}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12">
          <Package className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <h3 className="mb-2 text-lg font-semibold">Belum ada riwayat pesanan</h3>
          <p className="text-sm text-muted-foreground">
            Riwayat pesanan Anda akan muncul di sini
          </p>
        </div>
      )}
    </div>
  );
}
