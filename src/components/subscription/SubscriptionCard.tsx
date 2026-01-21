import Link from "next/link";
import { Crown, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SubscriptionCardProps {
    membership: {
        name: string;
        price: string;
        start_date: string | null;
        end_date: string | null;
        access_type: string;
    };
    formatDate: (dateString: string | null) => string;
    formatPrice: (price: string) => string;
}

export function SubscriptionCard({ membership, formatDate, formatPrice }: SubscriptionCardProps) {
    return (
        <div className="mb-8 rounded-2xl border border-border bg-card overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-muted/30 p-6">
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                        <Crown className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold">{membership.name}</h2>
                            <Badge variant="default" className="bg-green-500/20 text-green-500 hover:bg-green-500/20">
                                Aktif
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {formatPrice(membership.price)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Details */}
            <div className="p-6">
                <div className="grid gap-6 sm:grid-cols-3">
                    <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/20 p-4">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-xs text-muted-foreground">Mulai Berlangganan</p>
                            <p className="font-medium">{formatDate(membership.start_date)}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/20 p-4">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-xs text-muted-foreground">Berakhir</p>
                            <p className="font-medium">{membership.end_date ? formatDate(membership.end_date) : "Selamanya"}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/20 p-4">
                        <Crown className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-xs text-muted-foreground">Tipe Akses</p>
                            <p className="font-medium">{membership.access_type}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="border-t border-border bg-muted/20 p-6">
                {membership.access_type === "Lifetime" ? (
                    <Button disabled className="opacity-50 cursor-not-allowed">
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Upgrade Paket
                    </Button>
                ) : (
                    <Button asChild>
                        <Link href="/subscription/plans">
                            <ArrowRight className="mr-2 h-4 w-4" />
                            Upgrade Paket
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    );
}
