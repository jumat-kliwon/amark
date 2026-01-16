import { useState } from "react";
import Header from "@/components/Header";
import { Award, Download, Share2, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [previewCert, setPreviewCert] = useState<typeof certificates[0] | null>(null);

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
                  <Button variant="outline" size="sm" onClick={() => setPreviewCert(cert)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
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

      {/* Certificate Preview Dialog */}
      <Dialog open={!!previewCert} onOpenChange={() => setPreviewCert(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Preview Sertifikat</DialogTitle>
          </DialogHeader>
          
          {previewCert && (
            <div className="p-6">
              {/* Certificate Preview */}
              <div className="relative aspect-[1.414/1] w-full rounded-lg border-4 border-primary/20 bg-gradient-to-br from-card via-card to-muted p-8 shadow-inner">
                {/* Decorative Border */}
                <div className="absolute inset-4 rounded border-2 border-primary/10" />
                
                {/* Certificate Content */}
                <div className="relative flex h-full flex-col items-center justify-center text-center">
                  {/* Logo/Icon */}
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <Award className="h-10 w-10 text-primary" />
                  </div>
                  
                  {/* Title */}
                  <p className="mb-2 text-sm uppercase tracking-widest text-muted-foreground">
                    Sertifikat Penyelesaian
                  </p>
                  <h2 className="mb-6 text-3xl font-bold">Certificate of Completion</h2>
                  
                  {/* Recipient */}
                  <p className="mb-1 text-sm text-muted-foreground">Diberikan kepada</p>
                  <p className="mb-6 text-2xl font-semibold">Nama Peserta</p>
                  
                  {/* Course */}
                  <p className="mb-1 text-sm text-muted-foreground">
                    Telah berhasil menyelesaikan course
                  </p>
                  <p className="mb-8 text-xl font-bold text-primary">
                    {previewCert.courseName}
                  </p>
                  
                  {/* Date & Credential */}
                  <div className="flex items-center gap-8 text-sm text-muted-foreground">
                    <div>
                      <p className="font-medium text-foreground">{previewCert.completedDate}</p>
                      <p>Tanggal Selesai</p>
                    </div>
                    <div className="h-8 w-px bg-border" />
                    <div>
                      <p className="font-medium text-foreground">{previewCert.credentialId}</p>
                      <p>Credential ID</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setPreviewCert(null)}>
                  Tutup
                </Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Unduh Sertifikat
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Certificate;
