import { queryConfig } from "@/types";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          ...queryConfig,
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
