import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { Order } from "@/services/order/type";

interface PaymentDetailDialogProps {
    payment: Order | null;
    isOpen: boolean;
    onClose: () => void;
    formatDate: (dateString: string | null) => string;
    formatPrice: (price: string) => string;
    getStatusConfig: (statusLabel: string) => {
        label: string;
        icon: any;
        className: string;
    };
    getMethodLabel: (method: string) => string;
}

export function PaymentDetailDialog({
    payment,
    isOpen,
    onClose,
    formatDate,
    formatPrice,
    getStatusConfig,
    getMethodLabel,
}: PaymentDetailDialogProps) {
    if (!payment) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Detail Pembayaran</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Status Banner */}
                    <div className={`rounded-lg p-4 ${payment.status_label === "Paid" ? "bg-green-500/10" :
                            payment.status_label === "Failed" ? "bg-red-500/10" :
                                payment.status_label === "Refunded" ? "bg-blue-500/10" : "bg-yellow-500/10"
                        }`}>
                        <div className="flex items-center gap-3">
                            {(() => {
                                const config = getStatusConfig(payment.status_label);
                                const Icon = config.icon;
                                return <Icon className={`h-6 w-6 ${payment.status_label === "Paid" ? "text-green-500" :
                                        payment.status_label === "Failed" ? "text-red-500" :
                                            payment.status_label === "Refunded" ? "text-blue-500" : "text-yellow-500"
                                    }`} />;
                            })()}
                            <div>
                                <p className="font-semibold">{getStatusConfig(payment.status_label).label}</p>
                                <p className="text-sm text-muted-foreground">{formatDate(payment.created_at)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Amount */}
                    <div className="text-center py-4 border-b border-border">
                        <p className="text-3xl font-bold">{formatPrice(payment.total_amount)}</p>
                        <p className="text-sm text-muted-foreground">{payment.order_items[0]?.name || "-"}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Invoice</span>
                            <span className="font-medium text-sm">{payment.invoice_number}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Transaksi</span>
                            <span className="font-medium text-sm">{payment.transaction_number}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Metode Pembayaran</span>
                            <span className="font-medium">{getMethodLabel(payment.method)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Tipe Akses</span>
                            <span className="font-medium">{payment.order_items[0]?.membership_type || "-"}</span>
                        </div>
                        {payment.paid_at && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Dibayar Pada</span>
                                <span className="font-medium text-sm">{formatDate(payment.paid_at)}</span>
                            </div>
                        )}
                        {payment.payment_expires_at && !payment.paid_at && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Kedaluwarsa</span>
                                <span className="font-medium text-sm text-yellow-400">{formatDate(payment.payment_expires_at)}</span>
                            </div>
                        )}
                        {/* Coupon Info */}
                        {payment.coupons && !Array.isArray(payment.coupons) && (
                            <div className="border-t border-border pt-3 mt-3 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Kupon</span>
                                    <span className="font-medium text-primary">{payment.coupons.code}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Diskon</span>
                                    <span className="font-medium text-green-500">-{formatPrice(String(payment.coupons.discount_amount))}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <Button variant="outline" className="flex-1" onClick={onClose}>
                            Tutup
                        </Button>
                        {payment.status_label === "Paid" && (
                            <Button className="flex-1">
                                <Download className="mr-2 h-4 w-4" />
                                Unduh Invoice
                            </Button>
                        )}
                        {payment.status_label === "Pending" && payment.payment_detail?.snap_redirect_url && (
                            <Button
                                className="flex-1"
                                onClick={() => window.open(payment.payment_detail?.snap_redirect_url, '_blank')}
                            >
                                Bayar Sekarang
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
