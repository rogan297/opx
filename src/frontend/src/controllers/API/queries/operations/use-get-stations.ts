import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type { useMutationFunctionType, useQueryFunctionType } from "@/types/api";
import type { OpsStation } from "@/types/operations";
import { api } from "../../api";
import { getURL } from "../../helpers/constants";
import { UseRequestProcessor } from "../../services/request-processor";

export const useGetStations: useQueryFunctionType<
  undefined,
  OpsStation[]
> = (options?) => {
  const { query } = UseRequestProcessor();

  const getStationsFn = async (): Promise<OpsStation[]> => {
    const res = await api.get(`${getURL("OPERATIONS_STATION")}/`);
    return res.data;
  };

  const queryResult: UseQueryResult<OpsStation[], Error> = query(
    ["useGetStations"],
    getStationsFn,
    { refetchOnWindowFocus: false, ...options },
  );

  return queryResult;
};

interface PostStationPayload {
  name: string;
  description?: string;
  responsible?: string;
}

export const usePostStation: useMutationFunctionType<
  undefined,
  PostStationPayload
> = (options?) => {
  const { mutate, queryClient } = UseRequestProcessor();

  const postFn = async (p: PostStationPayload): Promise<OpsStation> => {
    const res = await api.post(`${getURL("OPERATIONS_STATION")}/`, p);
    return res.data;
  };

  const mutation: UseMutationResult<OpsStation, Error, PostStationPayload> = mutate(
    ["usePostStation"],
    postFn,
    {
      onSettled: () => {
        queryClient.refetchQueries({ queryKey: ["useGetStations"] });
      },
      ...options,
    },
  );

  return mutation;
};
