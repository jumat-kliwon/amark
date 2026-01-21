import { Loader2 } from "lucide-react";

interface LoadingStateProps {
    message?: string;
}

export function LoadingState({ message = "Memuat data subscription..." }: LoadingStateProps) {
    return (
        <div className="mb-8 flex items-center justify-center rounded-2xl border border-border bg-card p-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="ml-3 text-muted-foreground">{message}</p>
        </div>
    );
}
