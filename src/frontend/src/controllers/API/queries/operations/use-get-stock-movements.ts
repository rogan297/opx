import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type { useMutationFunctionType, useQueryFunctionType } from "@/types/api";
import type { OpsStockMovement } from "@/types/operations";
import { api } from "../../api";
import { getURL } from "../../helpers/constants";
import { UseRequestProcessor } from "../../services/request-processor";

interface CreateStockMovementPayload {
  inventory_id: string;
  quantity: number;
  type: string;
  reason?: string;
  order_id?: string;
}

export const useGetStockMovements: useQueryFunctionType<
  { inventoryId?: string },
  OpsStockMovement[]
> = (options?) => {
  const { query } = UseRequestProcessor();

  const getFn = async (): Promise<OpsStockMovement[]> => {
    const invId = options?.inventoryId;
    const url = invId
      ? `${getURL("OPERATIONS_STOCK_MOVEMENT")}/inventory/${invId}`
      : `${getURL("OPERATIONS_STOCK_MOVEMENT")}/`;
    const res = await api.get(url);
    return res.data;
  };

  const queryResult: UseQueryResult<OpsStockMovement[], Error> = query(
    ["useGetStockMovements", options?.inventoryId],
    getFn,
    { refetchOnWindowFocus: false, ...options },
  );

  return queryResult;
};

export const useGetStockMovementById: useQueryFunctionType<
  { movementId: string },
  OpsStockMovement
> = (options?) => {
  const { query } = UseRequestProcessor();

  const getFn = async (): Promise<OpsStockMovement> => {
    const res = await api.get(`${getURL("OPERATIONS_STOCK_MOVEMENT")}/${options?.movementId}`);
    return res.data;
  };

  const queryResult: UseQueryResult<OpsStockMovement, Error> = query(
    ["useGetStockMovementById", options?.movementId],
    getFn,
    { refetchOnWindowFocus: false, ...options },
  );

  return queryResult;
};

export const usePostStockMovement: useMutationFunctionType<
  undefined,
  CreateStockMovementPayload
> = (options?) => {
  const { mutate, queryClient } = UseRequestProcessor();

  const postFn = async (p: CreateStockMovementPayload): Promise<OpsStockMovement> => {
    const res = await api.post(`${getURL("OPERATIONS_STOCK_MOVEMENT")}/`, p);
    return res.data;
  };

  const mutation: UseMutationResult<OpsStockMovement, Error, CreateStockMovementPayload> = mutate(
    ["usePostStockMovement"],
    postFn,
    {
      onSettled: () => {
        queryClient.refetchQueries({ queryKey: ["useGetStockMovements"] });
        queryClient.refetchQueries({ queryKey: ["useGetInventory"] });
      },
      ...options,
    },
  );

  return mutation;
};
