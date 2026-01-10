import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  id: string;
  number: string;
  title: string;
  author: string;
  thumbnail: string;
  locked?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const CourseCard = ({ id, number, title, author, thumbnail, locked = false, className, style }: CourseCardProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (locked) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  return (
    <>
      <Link to={locked ? "#" : `/course/${id}`} onClick={handleClick}>
        <div
          className={cn(
            "group cursor-pointer overflow-hidden rounded-xl bg-card transition-all duration-300 hover:bg-card-hover hover:shadow-xl hover:shadow-primary/5",
            locked && "opacity-80",
            className
          )}
          style={style}
        >
          {/* Thumbnail */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={thumbnail}
              alt={title}
              className={cn(
                "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
                locked && "grayscale"
              )}
            />
            {/* Logo overlay */}
            <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-background/80 px-2 py-1 backdrop-blur-sm">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground">
                <span className="text-xs font-bold text-background">A</span>
              </div>
              <span className="text-[10px] font-medium leading-tight">
                AKADEMI<br />CREATOR
              </span>
            </div>

            {/* Lock overlay */}
            {locked && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background/90">
                  <Lock className="h-7 w-7 text-foreground" />
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <h3 className="flex-1 text-base font-semibold leading-tight">
                {number}. {title}
              </h3>
              {locked && <Lock className="h-4 w-4 text-muted-foreground" />}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground">
                <span className="text-xs font-bold text-background">A</span>
              </div>
              <span className="text-sm text-muted-foreground">{author}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Subscription Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <Lock className="h-8 w-8 text-destructive" />
            </div>
            <DialogTitle className="text-center text-xl">
              Akses Terbatas
            </DialogTitle>
            <DialogDescription className="text-center">
              Kamu belum memiliki subscription aktif untuk mengakses course ini. 
              Silakan berlangganan untuk mendapatkan akses penuh ke semua materi.
            </DialogDescription>
          </DialogHeader>

          <div className="my-4 rounded-lg border border-border bg-muted/50 p-4">
            <div className="flex items-center gap-4">
              <img
                src={thumbnail}
                alt={title}
                className="h-16 w-24 rounded-md object-cover"
              />
              <div>
                <h4 className="font-semibold">{number}. {title}</h4>
                <p className="text-sm text-muted-foreground">{author}</p>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button asChild className="w-full">
              <Link to="/subscription" onClick={() => setShowModal(false)}>
                Lihat Paket Subscription
              </Link>
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setShowModal(false)}>
              Nanti Saja
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CourseCard;
