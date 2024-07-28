"use client";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Providers = ({ children }) => {
  const [queryClient] = useState(() => {
    return new QueryClient({
      queries: {
        staleTime: 60 * 1000,
      },
    });
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Providers;
