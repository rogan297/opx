import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type { useMutationFunctionType, useQueryFunctionType } from "@/types/api";
import type { OpsInventory } from "@/types/operations";
import { api } from "../../api";
import { getURL } from "../../helpers/constants";
import { UseRequestProcessor } from "../../services/request-processor";

export const useGetInventory: useQueryFunctionType<
  undefined,
  OpsInventory[]
> = (options?) => {
  const { query } = UseRequestProcessor();

  const getInventoryFn = async (): Promise<OpsInventory[]> => {
    const res = await api.get(`${getURL("OPERATIONS_INVENTORY")}/`);
    return res.data;
  };

  const queryResult: UseQueryResult<OpsInventory[], Error> = query(
    ["useGetInventory"],
    getInventoryFn,
    { refetchOnWindowFocus: false, ...options },
  );

  return queryResult;
};

interface AdjustInventoryPayload {
  inventoryId: string;
  delta: number;
}

export const usePatchInventory: useMutationFunctionType<
  undefined,
  AdjustInventoryPayload
> = (options?) => {
  const { mutate, queryClient } = UseRequestProcessor();

  const adjustFn = async (p: AdjustInventoryPayload): Promise<OpsInventory> => {
    const res = await api.patch(
      `${getURL("OPERATIONS_INVENTORY")}/${p.inventoryId}/adjust?delta=${p.delta}`,
    );
    return res.data;
  };

  const mutation: UseMutationResult<OpsInventory, Error, AdjustInventoryPayload> = mutate(
    ["usePatchInventory"],
    adjustFn,
    {
      onSettled: () => {
        queryClient.refetchQueries({ queryKey: ["useGetInventory"] });
      },
      ...options,
    },
  );

  return mutation;
};
