import type { UseQueryResult } from "@tanstack/react-query";
import type { useQueryFunctionType } from "@/types/api";
import { api } from "../../api";
import { getURL } from "../../helpers/constants";
import { UseRequestProcessor } from "../../services/request-processor";

export interface Standard {
  id: string;
  name: string;
  type: string;
  description: string;
  category: string;
  compliance_score: number;
  requirements: number;
  passed: number;
  is_active: boolean;
  created_at: string;
}

export const useGetStandards: useQueryFunctionType<
  undefined,
  Standard[]
> = (options?) => {
  const { query } = UseRequestProcessor();

  const getFn = async (): Promise<Standard[]> => {
    const res = await api.get(`${getURL("OPERATIONS_STANDARD")}/`);
    return res.data;
  };

  const queryResult: UseQueryResult<Standard[], Error> = query(
    ["useGetStandards"],
    getFn,
    { refetchOnWindowFocus: false, ...options },
  );

  return queryResult;
};
