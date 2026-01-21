import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
    pagination: {
        from: number;
        to: number;
        per_page: number;
        current_page: number;
    };
    links: {
        next: string | null;
        prev: string | null;
    } | null;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ pagination, links, currentPage, onPageChange }: PaginationProps) {
    return (
        <div className="flex items-center justify-between border-t border-border p-4">
            <p className="text-sm text-muted-foreground">
                Menampilkan {pagination.from || 0}-{pagination.to || 0} dari {pagination.to || 0} transaksi
            </p>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={!links?.prev}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                {pagination.current_page && (
                    <Button
                        variant="default"
                        size="icon"
                        className="h-8 w-8"
                    >
                        {pagination.current_page}
                    </Button>
                )}
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={!links?.next}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
