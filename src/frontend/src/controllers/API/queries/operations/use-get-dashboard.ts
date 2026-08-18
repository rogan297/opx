import type { UseQueryResult } from "@tanstack/react-query";
import type { useQueryFunctionType } from "@/types/api";
import { api } from "../../api";
import { getURL } from "../../helpers/constants";
import { UseRequestProcessor } from "../../services/request-processor";

interface DashboardStats {
  dailyProduction: { value: number; change: number };
  monthlySales: { value: number; change: number };
  newCustomers: { value: number; change: number };
  stockAlerts: { value: number; change: number };
}

interface ActivityEntry {
  id: string;
  description: string;
  timestamp: string;
  type: "order" | "alert" | "production" | "compliance";
}

interface ProductionChart {
  labels: string[];
  values: number[];
}

export const useGetDashboardStats: useQueryFunctionType<
  undefined,
  DashboardStats
> = (options?) => {
  const { query } = UseRequestProcessor();

  const getFn = async (): Promise<DashboardStats> => {
    const res = await api.get(`${getURL("OPERATIONS_DASHBOARD")}/stats`);
    return res.data;
  };

  const queryResult: UseQueryResult<DashboardStats, Error> = query(
    ["useGetDashboardStats"],
    getFn,
    { refetchOnWindowFocus: false, ...options },
  );

  return queryResult;
};

export const useGetDashboardActivities: useQueryFunctionType<
  undefined,
  ActivityEntry[]
> = (options?) => {
  const { query } = UseRequestProcessor();

  const getFn = async (): Promise<ActivityEntry[]> => {
    const res = await api.get(`${getURL("OPERATIONS_DASHBOARD")}/activities`);
    return res.data;
  };

  const queryResult: UseQueryResult<ActivityEntry[], Error> = query(
    ["useGetDashboardActivities"],
    getFn,
    { refetchOnWindowFocus: false, ...options },
  );

  return queryResult;
};

export const useGetDashboardChart: useQueryFunctionType<
  undefined,
  ProductionChart
> = (options?) => {
  const { query } = UseRequestProcessor();

  const getFn = async (): Promise<ProductionChart> => {
    const res = await api.get(`${getURL("OPERATIONS_DASHBOARD")}/production-chart`);
    return res.data;
  };

  const queryResult: UseQueryResult<ProductionChart, Error> = query(
    ["useGetDashboardChart"],
    getFn,
    { refetchOnWindowFocus: false, ...options },
  );

  return queryResult;
};
