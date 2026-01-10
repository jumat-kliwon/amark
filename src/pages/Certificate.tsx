import Header from "@/components/Header";
import { Award, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const certificates = [
  {
    id: "1",
    courseName: "Personal Branding",
    completedDate: "15 Januari 2025",
    credentialId: "AC-PB-2025-001",
  },
  {
    id: "2",
    courseName: "Content Strategy",
    completedDate: "22 Desember 2024",
    credentialId: "AC-CS-2024-042",
  },
];

const Certificate = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">Sertifikat Saya</h1>
          <p className="text-lg text-muted-foreground">
            Kumpulan sertifikat dari course yang telah Anda selesaikan
          </p>
        </div>

        {certificates.length > 0 ? (
          <div className="space-y-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg"
              >
                <div className="flex items-center gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">{cert.courseName}</h3>
                    <p className="text-sm text-muted-foreground">
                      Selesai pada {cert.completedDate}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Credential ID: {cert.credentialId}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Bagikan
                  </Button>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Unduh
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20">
            <Award className="mb-4 h-16 w-16 text-muted-foreground/50" />
            <h3 className="mb-2 text-lg font-semibold">Belum ada sertifikat</h3>
            <p className="text-sm text-muted-foreground">
              Selesaikan course untuk mendapatkan sertifikat
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Certificate;
