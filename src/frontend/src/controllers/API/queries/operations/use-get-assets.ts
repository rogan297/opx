import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type { useMutationFunctionType, useQueryFunctionType } from "@/types/api";
import { api } from "../../api";
import { getURL } from "../../helpers/constants";
import { UseRequestProcessor } from "../../services/request-processor";

export interface Asset {
  id: string;
  name: string;
  health_pct: number;
  last_service: string;
  next_service: string;
  category: string;
  uptime_pct: number;
  hours_operated: number;
  energy_consumption: number;
  critical_count: number;
}

interface PostAssetPayload {
  name: string;
  health_pct?: number;
  last_service?: string;
  next_service?: string;
  category?: string;
  uptime_pct?: number;
  hours_operated?: number;
  energy_consumption?: number;
  critical_count?: number;
}

export const useGetAssets: useQueryFunctionType<
  undefined,
  Asset[]
> = (options?) => {
  const { query } = UseRequestProcessor();

  const getFn = async (): Promise<Asset[]> => {
    const res = await api.get(`${getURL("OPERATIONS_ASSET")}/`);
    return res.data;
  };

  const queryResult: UseQueryResult<Asset[], Error> = query(
    ["useGetAssets"],
    getFn,
    { refetchOnWindowFocus: false, ...options },
  );

  return queryResult;
};

export const usePostAsset: useMutationFunctionType<
  undefined,
  PostAssetPayload
> = (options?) => {
  const { mutate, queryClient } = UseRequestProcessor();

  const postFn = async (p: PostAssetPayload): Promise<Asset> => {
    const res = await api.post(`${getURL("OPERATIONS_ASSET")}/`, p);
    return res.data;
  };

  const mutation: UseMutationResult<Asset, Error, PostAssetPayload> = mutate(
    ["usePostAsset"],
    postFn,
    {
      onSettled: () => {
        queryClient.refetchQueries({ queryKey: ["useGetAssets"] });
      },
      ...options,
    },
  );

  return mutation;
};
