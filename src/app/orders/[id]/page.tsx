"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/hooks/use-order";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  formatDate,
  formatPrice,
  getStatusConfig,
  getMethodLabel,
} from "@/lib/subscription-utils";
import type {
  CouponDetail,
  OrderItem,
  BundleOrderItem,
} from "@/services/order/type";

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
  if (item.weight) {
    attrs.push({ label: "Berat", value: `${item.weight} kg` });
  }
  if (item.membership_type) {
    attrs.push({ label: "Tipe", value: item.membership_type });
  }
  if (item.membership_period) {
    attrs.push({ label: "Periode", value: item.membership_period });
  }

  return attrs;
}

function getProductTypeLabel(type: BundleOrderItem["product_type"]): string {
  const labels: Record<BundleOrderItem["product_type"], string> = {
    digital: "Digital",
    membership: "Membership",
    physical: "Fisik",
  };
  return labels[type] ?? type;
}

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { order, isLoading } = useOrder(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col items-center justify-center py-24">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="mt-4 text-muted-foreground">Memuat detail pesanan...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-6xl px-6 py-12">
          <div className="text-center py-24">
            <h1 className="text-2xl font-bold">Pesanan tidak ditemukan</h1>
            <Link
              href="/orders"
              className="mt-4 inline-block text-primary hover:underline"
            >
              Kembali ke Riwayat Pesanan
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const statusConfig = getStatusConfig(order.status_label);
  const paymentMethod = order.payment_method ?? order.method ?? "-";
  const productsTotal = order.order_items.reduce(
    (sum, item) => sum + item.final_price * item.quantity,
    0
  );
  const shippingCostNum = order.shipping_cost
    ? parseFloat(order.shipping_cost)
    : 0;
  const hasShipping = shippingCostNum > 0;
  const canPay =
    order.status_label === "Pending" &&
    order.payment_detail?.snap_redirect_url;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Beranda</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/orders">Riwayat Pesanan</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{order.invoice_number}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Order Title & Actions */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">
                Pesanan Anda #{order.invoice_number}
              </h1>
            </div>
          </div>
          <div className="flex gap-2">
            {canPay && (
              <Button
                className="rounded-lg bg-primary hover:bg-primary/90"
                asChild
              >
                <a
                  href={order.payment_detail!.snap_redirect_url!}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bayar Sekarang
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Ordered Items */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-6 text-lg font-semibold">
                Item Pesanan ({order.order_items.length})
              </h2>
              <div className="space-y-6">
                {order.order_items.map((item, index) => {
                  const attrs = getItemAttributes(item);
                  const itemTotal = formatPrice(
                    String(item.final_price * item.quantity)
                  );
                  const unitPrice =
                    item.quantity > 1
                      ? formatPrice(String(item.final_price))
                      : null;
                  const isBundle = item.type === "bundle" && item.items?.length;

                  return (
                    <div
                      key={item.id}
                      className={`flex gap-4 ${
                        index > 0 ? "border-t border-dotted border-border pt-6" : ""
                      }`}
                    >
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
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold">{item.name}</h3>
                        {isBundle && (
                          <ul className="mt-3 space-y-2 rounded-lg border border-border bg-muted/30 p-3">
                            {item.items!.map((subItem, subIndex) => (
                              <li
                                key={`${subItem.product_id}-${subIndex}`}
                                className="flex flex-wrap items-baseline justify-between gap-2 text-sm"
                              >
                                <span className="font-medium text-foreground">
                                  {subItem.name}
                                </span>
                                <span className="text-muted-foreground">
                                  {subItem.quantity} ×{" "}
                                  {formatPrice(String(subItem.price))}
                                  {" · "}
                                  {getProductTypeLabel(subItem.product_type)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {!isBundle && (
                          <div className="mt-2 space-y-0.5">
                            {attrs.map((attr) => (
                              <p
                                key={attr.label}
                                className="text-sm text-muted-foreground"
                              >
                                {attr.label}: {attr.value}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="font-semibold">{itemTotal}</p>
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

            {/* Shipping Address & Info */}
            {/* Informasi Pengiriman - selalu tampil, kosong pakai '-' */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-3 text-lg font-semibold">
                Informasi Pengiriman
              </h2>
              <div className="space-y-1 text-sm">
                <p className="font-medium">
                  Nama Penerima:{" "}
                  <span className="text-foreground">
                    {order.shipping_address?.recipient_name ||
                      order.shipping_info?.recipient_name ||
                      "-"}
                  </span>
                </p>
                <p className="text-muted-foreground">
                  No. Telepon:{" "}
                  <span className="text-foreground">
                    {order.shipping_address?.recipient_phone ||
                      order.shipping_info?.phone ||
                      "-"}
                  </span>
                </p>
                <p className="text-muted-foreground">
                  Alamat:{" "}
                  <span className="text-foreground">
                    {order.shipping_address
                      ? [
                          order.shipping_address.address,
                          [
                            order.shipping_address.sub_district_name,
                            order.shipping_address.district_name,
                            order.shipping_address.province_name,
                          ]
                            .filter(Boolean)
                            .join(", "),
                          order.shipping_address.postal_code,
                        ]
                          .filter(Boolean)
                          .join(" ") || "-"
                      : order.shipping_info?.address || "-"}
                  </span>
                </p>
              </div>
              <div className="mt-4 space-y-1 border-t border-border pt-4 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Kurir:</span>{" "}
                  {order.shipping_courier || "-"}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Layanan:
                  </span>{" "}
                  {order.shipping_service || "-"}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">
                    No. Resi:
                  </span>{" "}
                  {order.tracking_number || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Ringkasan Pesanan</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span
                    className={`font-medium ${
                      statusConfig.className.includes("green")
                        ? "text-green-600"
                        : statusConfig.className.includes("blue")
                        ? "text-blue-600"
                        : ""
                    }`}
                  >
                    {statusConfig.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">No. Invoice</span>
                  <span className="font-medium">{order.invoice_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">No. Transaksi</span>
                  <span className="font-medium">
                    {order.transaction_number || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tanggal Pesanan</span>
                  <span className="font-medium">
                    {formatDate(order.created_at)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Metode Pembayaran</span>
                  <span className="font-medium">
                    {getMethodLabel(paymentMethod) || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Batas Pembayaran
                  </span>
                  <span className="font-medium">
                    {order.payment_expires_at
                      ? formatDate(order.payment_expires_at)
                      : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dibayar Pada</span>
                  <span className="font-medium">
                    {order.paid_at ? formatDate(order.paid_at) : "-"}
                  </span>
                </div>
              </div>

              <div className="my-4 border-t border-border" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Total Produk ({order.order_items.length})
                  </span>
                  <span className="font-medium">
                    {formatPrice(String(productsTotal))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ongkos Kirim</span>
                  <span className="font-medium">
                    {hasShipping && order.shipping_cost
                      ? formatPrice(order.shipping_cost)
                      : "-"}
                  </span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span className="text-muted-foreground">Diskon</span>
                  <span className="font-medium">
                    {order.coupons &&
                    !Array.isArray(order.coupons) &&
                    "discount_amount" in order.coupons
                      ? `-${formatPrice(
                          String(
                            (order.coupons as CouponDetail).discount_amount
                          )
                        )}`
                      : "-"}
                  </span>
                </div>
              </div>

              <div className="mt-4 border-t border-border pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>
                    {formatPrice(order.total_amount)}
                    {order.currency && order.currency !== "IDR" && (
                      <span className="ml-1 text-sm font-normal text-muted-foreground">
                        {order.currency}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-2 text-lg font-semibold">
                Ada pertanyaan tentang pesanan Anda?
              </h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Tim support kami siap membantu dengan status pesanan, pembayaran,
                pengiriman, dan pertanyaan lainnya.
              </p>
              <Link href="/info">
                <Button variant="outline" className="w-full rounded-lg">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Hubungi Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
