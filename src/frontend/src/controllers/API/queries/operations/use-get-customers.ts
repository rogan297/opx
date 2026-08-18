import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type { useMutationFunctionType, useQueryFunctionType } from "@/types/api";
import type { OpsCustomer } from "@/types/operations";
import { api } from "../../api";
import { getURL } from "../../helpers/constants";
import { UseRequestProcessor } from "../../services/request-processor";

export const useGetCustomers: useQueryFunctionType<
  undefined,
  OpsCustomer[]
> = (options?) => {
  const { query } = UseRequestProcessor();

  const getFn = async (): Promise<OpsCustomer[]> => {
    const res = await api.get(`${getURL("OPERATIONS_CUSTOMER")}/`);
    return res.data;
  };

  const queryResult: UseQueryResult<OpsCustomer[], Error> = query(
    ["useGetCustomers"],
    getFn,
    { refetchOnWindowFocus: false, ...options },
  );

  return queryResult;
};

interface PostCustomerPayload {
  name: string;
  email?: string;
}

export const usePostCustomer: useMutationFunctionType<
  undefined,
  PostCustomerPayload
> = (options?) => {
  const { mutate, queryClient } = UseRequestProcessor();

  const postFn = async (p: PostCustomerPayload): Promise<OpsCustomer> => {
    const res = await api.post(`${getURL("OPERATIONS_CUSTOMER")}/`, p);
    return res.data;
  };

  const mutation: UseMutationResult<OpsCustomer, Error, PostCustomerPayload> = mutate(
    ["usePostCustomer"],
    postFn,
    {
      onSettled: () => {
        queryClient.refetchQueries({ queryKey: ["useGetCustomers"] });
      },
      ...options,
    },
  );

  return mutation;
};
