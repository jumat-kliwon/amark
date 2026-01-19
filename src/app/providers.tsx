"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { ClientComponents } from "@/components/ClientComponents";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <QueryClientProvider client={queryClient}>
        <SettingsProvider>
          <ClientComponents />
          {children}
        </SettingsProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
