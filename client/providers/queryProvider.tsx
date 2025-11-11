"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { queryClient } from "../config/queryClient";

interface ReactQueryProviderProps {
  children: ReactNode;
}

const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
