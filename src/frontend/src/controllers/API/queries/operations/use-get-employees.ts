import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type { useMutationFunctionType, useQueryFunctionType } from "@/types/api";
import { api } from "../../api";
import { getURL } from "../../helpers/constants";
import { UseRequestProcessor } from "../../services/request-processor";

export interface Employee {
  id: string;
  name: string;
  role: string;
  station: string;
  is_active: boolean;
  email: string;
  phone: string;
  start_date: string;
}

interface PostEmployeePayload {
  name: string;
  role?: string;
  station?: string;
  email?: string;
  phone?: string;
  start_date?: string;
}

interface PatchEmployeePayload {
  id: string;
  name?: string;
  role?: string;
  station?: string;
  is_active?: boolean;
  email?: string;
  phone?: string;
  start_date?: string;
}

export const useGetEmployees: useQueryFunctionType<
  undefined,
  Employee[]
> = (options?) => {
  const { query } = UseRequestProcessor();

  const getFn = async (): Promise<Employee[]> => {
    const res = await api.get(`${getURL("OPERATIONS_EMPLOYEE")}/`);
    return res.data;
  };

  const queryResult: UseQueryResult<Employee[], Error> = query(
    ["useGetEmployees"],
    getFn,
    { refetchOnWindowFocus: false, ...options },
  );

  return queryResult;
};

export const usePostEmployee: useMutationFunctionType<
  undefined,
  PostEmployeePayload
> = (options?) => {
  const { mutate, queryClient } = UseRequestProcessor();

  const postFn = async (p: PostEmployeePayload): Promise<Employee> => {
    const res = await api.post(`${getURL("OPERATIONS_EMPLOYEE")}/`, p);
    return res.data;
  };

  const mutation: UseMutationResult<Employee, Error, PostEmployeePayload> = mutate(
    ["usePostEmployee"],
    postFn,
    {
      onSettled: () => {
        queryClient.refetchQueries({ queryKey: ["useGetEmployees"] });
      },
      ...options,
    },
  );

  return mutation;
};

export const usePatchEmployee: useMutationFunctionType<
  undefined,
  PatchEmployeePayload
> = (options?) => {
  const { mutate, queryClient } = UseRequestProcessor();

  const patchFn = async (p: PatchEmployeePayload): Promise<Employee> => {
    const { id, ...data } = p;
    const res = await api.patch(`${getURL("OPERATIONS_EMPLOYEE")}/${id}`, data);
    return res.data;
  };

  const mutation: UseMutationResult<Employee, Error, PatchEmployeePayload> = mutate(
    ["usePatchEmployee"],
    patchFn,
    {
      onSettled: () => {
        queryClient.refetchQueries({ queryKey: ["useGetEmployees"] });
      },
      ...options,
    },
  );

  return mutation;
};

export const useDeleteEmployee: useMutationFunctionType<
  undefined,
  string
> = (options?) => {
  const { mutate, queryClient } = UseRequestProcessor();

  const deleteFn = async (id: string): Promise<void> => {
    await api.delete(`${getURL("OPERATIONS_EMPLOYEE")}/${id}`);
  };

  const mutation: UseMutationResult<void, Error, string> = mutate(
    ["useDeleteEmployee"],
    deleteFn,
    {
      onSettled: () => {
        queryClient.refetchQueries({ queryKey: ["useGetEmployees"] });
      },
      ...options,
    },
  );

  return mutation;
};
