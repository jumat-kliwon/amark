'use client';

import { ChevronRight, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface LessonCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue?: () => void;
  onBackToCourse?: () => void;
  hasNextLesson: boolean;
}

export function LessonCompletionModal({
  isOpen,
  onClose,
  onContinue,
  onBackToCourse,
  hasNextLesson,
}: LessonCompletionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <Trophy className="h-8 w-8 text-green-500" />
          </div>
          <DialogTitle className="text-center text-2xl">
            Lesson Selesai! 🎉
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            {hasNextLesson
              ? 'Selamat! Anda telah menyelesaikan materi ini. Lanjut ke materi berikutnya?'
              : 'Selamat! Anda telah menyelesaikan semua materi dalam course ini.'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-2 sm:flex-row">
          {hasNextLesson ? (
            <>
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full sm:w-auto"
              >
                Tetap di Sini
              </Button>
              <Button
                onClick={onContinue}
                className="w-full sm:w-auto"
              >
                <ChevronRight className="mr-2 h-4 w-4" />
                Lanjut ke Materi Berikutnya
              </Button>
            </>
          ) : (
            <Button
              onClick={onBackToCourse}
              className="w-full sm:w-auto"
            >
              Kembali ke Course Overview
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
