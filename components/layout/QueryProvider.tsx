"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError(error, query) {
      const message =
        (query.meta?.errorMessage as string) ??
        error.message ??
        "Something went wrong";

      toast.error(message);
    },
  }),
});

export default function QueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
