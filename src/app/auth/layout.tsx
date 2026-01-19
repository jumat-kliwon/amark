import { SidebarProvider } from '@/components/ui/sidebar';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <div className="flex-1 flex flex-col">
          <main className="flex-1 bg-zinc-950">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
