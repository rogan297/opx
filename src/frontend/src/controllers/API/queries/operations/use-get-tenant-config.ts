import type { UseQueryResult } from "@tanstack/react-query";
import type { useQueryFunctionType } from "@/types/api";
import type { TenantConfig } from "@/types/operations";
import { api } from "../../api";
import { getURL } from "../../helpers/constants";
import { UseRequestProcessor } from "../../services/request-processor";

export const useGetTenantConfig: useQueryFunctionType<
  undefined,
  TenantConfig
> = (options?) => {
  const { query } = UseRequestProcessor();

  const getTenantConfigFn = async (): Promise<TenantConfig> => {
    const res = await api.get(`${getURL("OPERATIONS_TENANT")}/config`);
    return res.data.config;
  };

  const queryResult: UseQueryResult<TenantConfig, Error> = query(
    ["useGetTenantConfig"],
    getTenantConfigFn,
    {
      refetchOnWindowFocus: false,
      ...options,
    },
  );

  return queryResult;
};
