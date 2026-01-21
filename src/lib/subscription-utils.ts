import { CheckCircle2, XCircle, Clock, AlertCircle, RefreshCw } from "lucide-react";

// Helper function to format date
export const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

// Helper function to format price
export const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(numPrice);
};

export const getStatusConfig = (statusLabel: string) => {
    switch (statusLabel) {
        case "Paid":
            return {
                label: "Berhasil",
                icon: CheckCircle2,
                className: "bg-green-500/10 text-green-500 border-green-500/30",
            };
        case "Pending":
            return {
                label: "Menunggu",
                icon: Clock,
                className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
            };
        case "Failed":
            return {
                label: "Gagal",
                icon: XCircle,
                className: "bg-red-500/10 text-red-500 border-red-500/30",
            };
        case "Refunded":
            return {
                label: "Dikembalikan",
                icon: RefreshCw,
                className: "bg-blue-500/10 text-blue-500 border-blue-500/30",
            };
        default:
            return {
                label: statusLabel,
                icon: AlertCircle,
                className: "bg-muted text-muted-foreground",
            };
    }
};

export const getMethodLabel = (method: string) => {
    switch (method) {
        case "midtrans":
            return "Midtrans";
        case "manual":
            return "Manual";
        default:
            return method;
    }
};
