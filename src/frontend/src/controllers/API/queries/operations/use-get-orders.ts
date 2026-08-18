import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type { useMutationFunctionType, useQueryFunctionType } from "@/types/api";
import { api } from "../../api";
import { getURL } from "../../helpers/constants";
import { UseRequestProcessor } from "../../services/request-processor";

export interface Order {
  id: string;
  customer_id: string;
  status: string;
  total: number;
  tenant_id: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItemPayload {
  product_id: string;
  quantity: number;
}

export interface CreateOrderPayload {
  customer_id: string;
  total: number;
  items: OrderItemPayload[];
}

export const useGetOrders: useQueryFunctionType<
  undefined,
  Order[]
> = (options?) => {
  const { query } = UseRequestProcessor();

  const getFn = async (): Promise<Order[]> => {
    const res = await api.get(`${getURL("OPERATIONS_ORDER")}/`);
    return res.data;
  };

  const queryResult: UseQueryResult<Order[], Error> = query(
    ["useGetOrders"],
    getFn,
    { refetchOnWindowFocus: false, ...options },
  );

  return queryResult;
};

export const usePostOrder: useMutationFunctionType<
  undefined,
  CreateOrderPayload
> = (options?) => {
  const { mutate, queryClient } = UseRequestProcessor();

  const postFn = async (p: CreateOrderPayload): Promise<Order> => {
    const res = await api.post(`${getURL("OPERATIONS_ORDER")}/`, p);
    return res.data;
  };

  const mutation: UseMutationResult<Order, Error, CreateOrderPayload> = mutate(
    ["usePostOrder"],
    postFn,
    {
      onSettled: () => {
        queryClient.refetchQueries({ queryKey: ["useGetOrders"] });
      },
      ...options,
    },
  );

  return mutation;
};

interface UpdateOrderStatusPayload {
  order_id: string;
  status: string;
}

export const usePatchOrderStatus: useMutationFunctionType<
  undefined,
  UpdateOrderStatusPayload
> = (options?) => {
  const { mutate, queryClient } = UseRequestProcessor();

  const patchFn = async (p: UpdateOrderStatusPayload): Promise<Order> => {
    const res = await api.patch(
      `${getURL("OPERATIONS_ORDER")}/${p.order_id}/status`,
      { status: p.status },
    );
    return res.data;
  };

  const mutation: UseMutationResult<Order, Error, UpdateOrderStatusPayload> = mutate(
    ["usePatchOrderStatus"],
    patchFn,
    {
      onSettled: () => {
        queryClient.refetchQueries({ queryKey: ["useGetOrders"] });
      },
      ...options,
    },
  );

  return mutation;
};
