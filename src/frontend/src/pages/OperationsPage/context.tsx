import { createContext, useContext, type ReactNode } from "react";
import type { TenantConfig } from "@/types/operations";
import { useGetTenantConfig } from "@/controllers/API/queries/operations";

interface OperationsContextValue {
  tenant: TenantConfig | undefined;
  isLoading: boolean;
  error: Error | null;
}

const OperationsContext = createContext<OperationsContextValue>({
  tenant: undefined,
  isLoading: false,
  error: null,
});

export function OperationsProvider({ children }: { children: ReactNode }) {
  const { data: tenant, isLoading, error } = useGetTenantConfig();

  return (
    <OperationsContext.Provider value={{ tenant, isLoading, error }}>
      {children}
    </OperationsContext.Provider>
  );
}

export function useOperationsContext() {
  return useContext(OperationsContext);
}
