import Link from "next/link";
import { Crown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptySubscription() {
    return (
        <div className="mb-8 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
            <Crown className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="mb-2 text-lg font-semibold">Belum ada subscription aktif</h3>
            <p className="mb-4 text-sm text-muted-foreground">
                Berlangganan paket untuk mendapatkan akses ke semua konten
            </p>
            <Button asChild>
                <Link href="/subscription/plans">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Lihat Paket
                </Link>
            </Button>
        </div>
    );
}
