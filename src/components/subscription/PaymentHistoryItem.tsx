import { Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Order } from "@/services/order/type";

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
    onViewDetails: (payment: Order) => void;
}

export function PaymentHistoryItem({
    payment,
    formatDate,
    formatPrice,
    getStatusConfig,
    getMethodLabel,
    onViewDetails,
}: PaymentHistoryItemProps) {
    const statusConfig = getStatusConfig(payment.status_label);
    const StatusIcon = statusConfig.icon;
    const orderItemName = payment.order_items[0]?.name || "-";

    return (
        <div className="p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between gap-4">
                {/* Left: Payment Info */}
                <div className="flex items-start gap-4 flex-1">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${payment.status_label === "Paid" ? "bg-green-500/10" :
                            payment.status_label === "Failed" ? "bg-red-500/10" :
                                payment.status_label === "Refunded" ? "bg-blue-500/10" : "bg-yellow-500/10"
                        }`}>
                        <StatusIcon className={`h-5 w-5 ${payment.status_label === "Paid" ? "text-green-500" :
                                payment.status_label === "Failed" ? "text-red-500" :
                                    payment.status_label === "Refunded" ? "text-blue-500" : "text-yellow-500"
                            }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{formatPrice(payment.total_amount)}</p>
                            <Badge variant="outline" className={statusConfig.className}>
                                {statusConfig.label}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{formatDate(payment.created_at)}</p>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            <span>{payment.invoice_number}</span>
                            <span>•</span>
                            <span>{getMethodLabel(payment.method)}</span>
                            <span>•</span>
                            <span>{orderItemName}</span>
                        </div>
                        {payment.status_label === "Pending" && payment.payment_expires_at && (
                            <p className="mt-2 text-xs text-yellow-400">
                                <Clock className="inline h-3 w-3 mr-1" />
                                Kedaluwarsa: {formatDate(payment.payment_expires_at)}
                            </p>
                        )}
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => onViewDetails(payment)}
                    >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                    </Button>
                    {payment.status_label === "Pending" && payment.payment_detail?.snap_redirect_url && (
                        <Button
                            size="sm"
                            className="text-xs"
                            onClick={() => window.open(payment.payment_detail?.snap_redirect_url, '_blank')}
                        >
                            Bayar Sekarang
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
