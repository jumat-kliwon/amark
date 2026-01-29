'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Award, Download, Eye, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCertificates, useCertificateDetail } from '@/hooks/use-certificate';
import { captureCertificate, formatDate } from '@/lib/helpers';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import jsPDF from 'jspdf';

export default function CertificatePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedCertificateId, setSelectedCertificateId] = useState<
    number | null
  >(null);

  const { certificates, pagination, links, isLoading } =
    useCertificates(currentPage);
  const { certificate: certificateDetail, isLoading: isLoadingDetail } =
    useCertificateDetail(selectedCertificateId);

  const formatDateIndonesian = (dateString: string | null) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handlePreview = (id: number) => {
    setSelectedCertificateId(id);
    setOpenDetail(true);
  };

  const handleCloseModal = () => {
    setSelectedCertificateId(null);
    setOpenDetail(false);
  };

  const goToPage = (page: number) => {
    if (page >= 1) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const shouldShowPagination =
    pagination &&
    (links?.next ||
      links?.prev ||
      (pagination.current_page && pagination.current_page > 1));

  const downloadAsPDF = async () => {
    const canvas = await captureCertificate();
    if (!canvas) {
      console.error('Certificate element not found');
      return;
    }

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`sertifikat-${certificateDetail?.certificate_number}.pdf`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">Sertifikat Saya</h1>
          <p className="text-lg text-muted-foreground">
            Kumpulan sertifikat dari membership yang telah Anda selesaikan
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20">
            <Loader2 className="mb-4 h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Memuat sertifikat...
            </p>
          </div>
        ) : certificates.length > 0 ? (
          <>
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
                      <h3 className="mb-1 text-lg font-semibold">
                        {cert.membership.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Diterbitkan pada {formatDateIndonesian(cert.issued_at)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Nomor Sertifikat: {cert.certificate_number}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreview(cert.id)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    {/* <Button
                      size="sm"
                      onClick={() => {
                        downloadAsPDF(cert.id);
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Unduh
                    </Button> */}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {shouldShowPagination && pagination && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => goToPage(currentPage - 1)}
                        className={
                          !links?.prev
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                        }
                      />
                    </PaginationItem>
                    {pagination.current_page && (
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => goToPage(pagination.current_page)}
                          isActive={true}
                          className="cursor-pointer"
                        >
                          {pagination.current_page}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => goToPage(currentPage + 1)}
                        className={
                          !links?.next
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20">
            <Award className="mb-4 h-16 w-16 text-muted-foreground/50" />
            <h3 className="mb-2 text-lg font-semibold">Belum ada sertifikat</h3>
            <p className="text-sm text-muted-foreground">
              Selesaikan membership untuk mendapatkan sertifikat
            </p>
          </div>
        )}
      </main>

      {/* Certificate Preview Dialog */}
      <Dialog
        open={!!selectedCertificateId && openDetail}
        onOpenChange={handleCloseModal}
      >
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Preview Sertifikat</DialogTitle>
          </DialogHeader>

          {isLoadingDetail ? (
            <div className="flex flex-col items-center justify-center p-12">
              <Loader2 className="mb-4 h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Memuat detail sertifikat...
              </p>
            </div>
          ) : certificateDetail ? (
            <div className="p-6" id="certificate">
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
                  <h2 className="mb-6 text-3xl font-bold">
                    Certificate of Completion
                  </h2>

                  {/* Recipient */}
                  <p className="mb-1 text-sm text-muted-foreground">
                    Diberikan kepada
                  </p>
                  <p className="mb-6 text-2xl font-semibold">
                    {certificateDetail.user.name}
                  </p>

                  {/* Membership */}
                  <p className="mb-1 text-sm text-muted-foreground">
                    Telah berhasil menyelesaikan membership
                  </p>
                  <p className="mb-8 text-xl font-bold text-primary">
                    {certificateDetail.membership.name}
                  </p>

                  {/* Date & Credential */}
                  <div className="flex items-center gap-8 text-sm text-muted-foreground">
                    <div>
                      <p className="font-medium text-foreground">
                        {formatDateIndonesian(certificateDetail.issued_at)}
                      </p>
                      <p>Tanggal Diterbitkan</p>
                    </div>
                    <div className="h-8 w-px bg-border" />
                    <div>
                      <p className="font-medium text-foreground">
                        {certificateDetail.certificate_number}
                      </p>
                      <p>Nomor Sertifikat</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" onClick={handleCloseModal}>
                  Tutup
                </Button>
                <Button onClick={() => downloadAsPDF()}>
                  <Download className="mr-2 h-4 w-4" />
                  Unduh Sertifikat
                </Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
