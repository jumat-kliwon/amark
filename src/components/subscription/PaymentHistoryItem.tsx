import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Order, OrderItem } from "@/services/order/type";

interface PaymentHistoryItemProps {
  payment: Order;
  formatDate: (dateString: string | null) => string;
  formatPrice: (price: string) => string;
  getStatusConfig: (statusLabel: string) => {
    label: string;
    icon: any;
    className: string;
  };
  getMethodLabel: (method: string) => string;
}

function getItemAttributes(item: OrderItem): { label: string; value: string }[] {
  const attrs: { label: string; value: string }[] = [];

  if (Array.isArray(item.attributes)) {
    return item.attributes;
  }
  if (item.attributes && typeof item.attributes === "object") {
    return Object.entries(item.attributes).map(([label, value]) => ({
      label,
      value: String(value),
    }));
  }

  if (item.quantity) {
    attrs.push({ label: "Jumlah", value: String(item.quantity) });
  }
  if (item.membership_type) {
    attrs.push({ label: "Tipe", value: item.membership_type });
  }
  if (item.membership_period) {
    attrs.push({ label: "Periode", value: item.membership_period });
  }

  return attrs;
}

export function PaymentHistoryItem({
  payment,
  formatDate,
  formatPrice,
  getStatusConfig,
}: PaymentHistoryItemProps) {
  const statusConfig = getStatusConfig(payment.status_label);

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Order Header - minimal: invoice + action */}
      <div className="flex items-center justify-between gap-4 p-6">
        <Link
          href={`/orders/${payment.id}`}
          className="text-lg font-semibold text-foreground hover:underline"
        >
          {payment.invoice_number}
        </Link>
        <Link href={`/orders/${payment.id}`}>
          <Button variant="outline" size="sm" className="rounded-lg">
            Lihat Pesanan
          </Button>
        </Link>
      </div>

      {/* Meta: tanggal, status, total */}
      <div className="flex flex-wrap gap-x-6 gap-y-1 px-6 pb-4 text-sm text-muted-foreground border-b border-border">
        <span>{formatDate(payment.created_at)}</span>
        <span>
          Status:{" "}
          <span
            className={
              payment.status_label === "Paid" || payment.status_label === "Delivered"
                ? "font-medium text-green-600"
                : "font-medium text-foreground"
            }
          >
            {statusConfig.label}
          </span>
        </span>
        <span>
          Total: <span className="font-semibold text-foreground">{formatPrice(payment.total_amount)}</span>
        </span>
      </div>

      {/* Order Items */}
      <div>
        {payment.order_items.map((item, index) => {
          const attrs = getItemAttributes(item);
          const itemTotal = formatPrice(String(item.final_price * item.quantity));
          const unitPrice = item.quantity > 1 ? formatPrice(String(item.final_price)) : null;

          return (
            <div
              key={item.id}
              className={`flex gap-4 p-6 ${index > 0 ? "border-t border-dotted border-border" : ""}`}
            >
              {/* Product Image - same as order detail */}
              <div className="flex-shrink-0">
                {item.image_url ? (
                  <div className="relative h-24 w-24 overflow-hidden rounded-lg border border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-lg border border-border bg-muted/50">
                    <span className="text-2xl font-semibold text-muted-foreground">
                      {item.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground">{item.name}</h4>
                <div className="mt-2 space-y-0.5">
                  {attrs.map((attr) => (
                    <p key={attr.label} className="text-sm text-muted-foreground">
                      {attr.label}: {attr.value}
                    </p>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="flex flex-col items-end justify-center flex-shrink-0">
                <p className="font-semibold text-foreground">{itemTotal}</p>
                {unitPrice && item.quantity > 1 && (
                  <p className="text-xs text-muted-foreground">
                    {unitPrice} × {item.quantity}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
