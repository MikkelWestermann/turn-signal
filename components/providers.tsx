"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "@/components/get-query-client";
import { ConfirmDialogProvider } from "@/components/confirm-dialog";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

import { createTRPCClient, httpLink } from "@trpc/client";
import { useState } from "react";
import { TRPCProvider } from "@/lib/client";
import type { AppRouter } from "@/server";
import superjson from "superjson";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => getQueryClient());
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpLink({
          url: "/api/trpc",
          transformer: superjson,
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConfirmDialogProvider>{children}</ConfirmDialogProvider>
        </NextThemesProvider>
      </TRPCProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  );
};

export default Providers;
