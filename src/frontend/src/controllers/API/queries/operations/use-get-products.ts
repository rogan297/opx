import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type { useMutationFunctionType, useQueryFunctionType } from "@/types/api";
import type { OpsProduct } from "@/types/operations";
import { api } from "../../api";
import { getURL } from "../../helpers/constants";
import { UseRequestProcessor } from "../../services/request-processor";

export const useGetProducts: useQueryFunctionType<
  undefined,
  OpsProduct[]
> = (options?) => {
  const { query } = UseRequestProcessor();

  const getProductsFn = async (): Promise<OpsProduct[]> => {
    const res = await api.get(`${getURL("OPERATIONS_PRODUCT")}/`);
    return res.data;
  };

  const queryResult: UseQueryResult<OpsProduct[], Error> = query(
    ["useGetProducts"],
    getProductsFn,
    { refetchOnWindowFocus: false, ...options },
  );

  return queryResult;
};

interface PostProductPayload {
  name: string;
  price: number;
  description?: string;
  type?: string;
}

export const usePostProduct: useMutationFunctionType<
  undefined,
  PostProductPayload
> = (options?) => {
  const { mutate, queryClient } = UseRequestProcessor();

  const postProductFn = async (payload: PostProductPayload): Promise<OpsProduct> => {
    const res = await api.post(`${getURL("OPERATIONS_PRODUCT")}/`, payload);
    return res.data;
  };

  const mutation: UseMutationResult<OpsProduct, Error, PostProductPayload> = mutate(
    ["usePostProduct"],
    postProductFn,
    {
      onSettled: () => {
        queryClient.refetchQueries({ queryKey: ["useGetProducts"] });
      },
      ...options,
    },
  );

  return mutation;
};

interface PatchProductPayload {
  id: string;
  name?: string;
  price?: number;
  description?: string;
  type?: string;
}

export const usePatchProduct: useMutationFunctionType<
  undefined,
  PatchProductPayload
> = (options?) => {
  const { mutate, queryClient } = UseRequestProcessor();

  const patchProductFn = async (payload: PatchProductPayload): Promise<OpsProduct> => {
    const { id, ...data } = payload;
    const res = await api.patch(`${getURL("OPERATIONS_PRODUCT")}/${id}`, data);
    return res.data;
  };

  const mutation: UseMutationResult<OpsProduct, Error, PatchProductPayload> = mutate(
    ["usePatchProduct"],
    patchProductFn,
    {
      onSettled: () => {
        queryClient.refetchQueries({ queryKey: ["useGetProducts"] });
      },
      ...options,
    },
  );

  return mutation;
};

export const useDeleteProduct: useMutationFunctionType<
  undefined,
  string
> = (options?) => {
  const { mutate, queryClient } = UseRequestProcessor();

  const deleteProductFn = async (id: string): Promise<void> => {
    await api.delete(`${getURL("OPERATIONS_PRODUCT")}/${id}`);
  };

  const mutation: UseMutationResult<void, Error, string> = mutate(
    ["useDeleteProduct"],
    deleteProductFn,
    {
      onSettled: () => {
        queryClient.refetchQueries({ queryKey: ["useGetProducts"] });
      },
      ...options,
    },
  );

  return mutation;
};
