import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type { useMutationFunctionType, useQueryFunctionType } from "@/types/api";
import type { OpsWorkflow } from "@/types/operations";
import { api } from "../../api";
import { getURL } from "../../helpers/constants";
import { UseRequestProcessor } from "../../services/request-processor";

export const useGetWorkflows: useQueryFunctionType<
  undefined,
  OpsWorkflow[]
> = (options?) => {
  const { query } = UseRequestProcessor();

  const getWorkflowsFn = async (): Promise<OpsWorkflow[]> => {
    const res = await api.get(`${getURL("OPERATIONS_WORKFLOW")}/`);
    return res.data;
  };

  const queryResult: UseQueryResult<OpsWorkflow[], Error> = query(
    ["useGetWorkflows"],
    getWorkflowsFn,
    { refetchOnWindowFocus: false, ...options },
  );

  return queryResult;
};

interface PostWorkflowPayload {
  name: string;
  description?: string;
}

export const usePostWorkflow: useMutationFunctionType<
  undefined,
  PostWorkflowPayload
> = (options?) => {
  const { mutate, queryClient } = UseRequestProcessor();

  const postFn = async (p: PostWorkflowPayload): Promise<OpsWorkflow> => {
    const res = await api.post(`${getURL("OPERATIONS_WORKFLOW")}/`, p);
    return res.data;
  };

  const mutation: UseMutationResult<OpsWorkflow, Error, PostWorkflowPayload> = mutate(
    ["usePostWorkflow"],
    postFn,
    {
      onSettled: () => {
        queryClient.refetchQueries({ queryKey: ["useGetWorkflows"] });
      },
      ...options,
    },
  );

  return mutation;
};

interface PatchWorkflowStatusPayload {
  id: string;
  action: "activate" | "pause";
}

export const usePatchWorkflow: useMutationFunctionType<
  undefined,
  PatchWorkflowStatusPayload
> = (options?) => {
  const { mutate, queryClient } = UseRequestProcessor();

  const patchFn = async (p: PatchWorkflowStatusPayload): Promise<OpsWorkflow> => {
    const res = await api.patch(
      `${getURL("OPERATIONS_WORKFLOW")}/${p.id}/${p.action}`,
    );
    return res.data;
  };

  const mutation: UseMutationResult<OpsWorkflow, Error, PatchWorkflowStatusPayload> = mutate(
    ["usePatchWorkflow"],
    patchFn,
    {
      onSettled: () => {
        queryClient.refetchQueries({ queryKey: ["useGetWorkflows"] });
      },
      ...options,
    },
  );

  return mutation;
};
