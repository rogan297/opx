import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type { useMutationFunctionType, useQueryFunctionType } from "@/types/api";
import type { OpsProductionOrder } from "@/types/operations";
import { api } from "../../api";
import { getURL } from "../../helpers/constants";
import { UseRequestProcessor } from "../../services/request-processor";

export const useGetProductionOrders: useQueryFunctionType<
  undefined,
  OpsProductionOrder[]
> = (options?) => {
  const { query } = UseRequestProcessor();

  const getFn = async (): Promise<OpsProductionOrder[]> => {
    const res = await api.get(`${getURL("OPERATIONS_PRODUCTION_ORDER")}/`);
    return res.data;
  };

  const queryResult: UseQueryResult<OpsProductionOrder[], Error> = query(
    ["useGetProductionOrders"],
    getFn,
    { refetchOnWindowFocus: false, ...options },
  );

  return queryResult;
};

interface PostProductionOrderPayload {
  order_item_id: string;
  workflow_id: string;
}

export const usePostProductionOrder: useMutationFunctionType<
  undefined,
  PostProductionOrderPayload
> = (options?) => {
  const { mutate, queryClient } = UseRequestProcessor();

  const postFn = async (p: PostProductionOrderPayload): Promise<OpsProductionOrder> => {
    const res = await api.post(`${getURL("OPERATIONS_PRODUCTION_ORDER")}/`, p);
    return res.data;
  };

  const mutation: UseMutationResult<OpsProductionOrder, Error, PostProductionOrderPayload> = mutate(
    ["usePostProductionOrder"],
    postFn,
    {
      onSettled: () => {
        queryClient.refetchQueries({ queryKey: ["useGetProductionOrders"] });
      },
      ...options,
    },
  );

  return mutation;
};

export const usePatchProductionOrder: useMutationFunctionType<
  undefined,
  { id: string; action: "complete" }
> = (options?) => {
  const { mutate, queryClient } = UseRequestProcessor();

  const patchFn = async (p: { id: string; action: "complete" }): Promise<OpsProductionOrder> => {
    const res = await api.patch(
      `${getURL("OPERATIONS_PRODUCTION_ORDER")}/${p.id}/${p.action}`,
    );
    return res.data;
  };

  const mutation: UseMutationResult<OpsProductionOrder, Error, { id: string; action: "complete" }> = mutate(
    ["usePatchProductionOrder"],
    patchFn,
    {
      onSettled: () => {
        queryClient.refetchQueries({ queryKey: ["useGetProductionOrders"] });
      },
      ...options,
    },
  );

  return mutation;
};
