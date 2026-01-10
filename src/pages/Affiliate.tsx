import Header from "@/components/Header";
import { Copy, Users, Wallet, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const stats = [
  { label: "Total Referral", value: "24", icon: Users },
  { label: "Pendapatan", value: "Rp 2.400.000", icon: Wallet },
  { label: "Konversi", value: "12%", icon: TrendingUp },
];

const Affiliate = () => {
  const affiliateLink = "https://akademicreator.com/ref/asditap";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">Program Affiliate</h1>
          <p className="text-lg text-muted-foreground">
            Dapatkan komisi 20% untuk setiap referral yang berlangganan
          </p>
        </div>

        {/* Stats */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Affiliate Link */}
        <div className="rounded-xl border border-border bg-card p-8">
          <h2 className="mb-4 text-xl font-semibold">Link Referral Anda</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Bagikan link ini kepada teman atau followers Anda. Anda akan mendapat komisi 20%
            untuk setiap orang yang berlangganan melalui link Anda.
          </p>

          <div className="flex gap-3">
            <Input
              value={affiliateLink}
              readOnly
              className="flex-1 bg-background"
            />
            <Button onClick={copyToClipboard}>
              <Copy className="mr-2 h-4 w-4" />
              Salin Link
            </Button>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-12">
          <h2 className="mb-6 text-xl font-semibold">Cara Kerja</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mb-2 font-semibold">Bagikan Link</h3>
              <p className="text-sm text-muted-foreground">
                Bagikan link referral Anda di media sosial atau langsung ke teman
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mb-2 font-semibold">Teman Berlangganan</h3>
              <p className="text-sm text-muted-foreground">
                Ketika seseorang mendaftar melalui link Anda dan berlangganan
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mb-2 font-semibold">Dapatkan Komisi</h3>
              <p className="text-sm text-muted-foreground">
                Anda akan menerima 20% komisi dari pembayaran mereka
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Affiliate;
