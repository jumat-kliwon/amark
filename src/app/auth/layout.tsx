import { SidebarProvider } from '@/components/ui/sidebar';
import AuthGuard from './guard';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AuthGuard>
        <div className="flex min-h-screen w-full">
          <div className="flex-1 flex flex-col">
            <main className="flex-1 bg-zinc-950">{children}</main>
          </div>
        </div>
      </AuthGuard>
    </SidebarProvider>
  );
}
