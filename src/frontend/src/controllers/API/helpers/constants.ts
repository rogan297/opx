import { getBaseUrl } from "@/customization/utils/urls";
import { BASE_URL_API_V2 } from "../../../constants/constants";

export const URLs = {
  TRANSACTIONS: `monitor/transactions`,
  TRACES: `monitor/traces`,
  API_KEY: `api_key`,
  FILES: `files`,
  FILE_MANAGEMENT: `files`,
  VERSION: `version`,
  MESSAGES: `monitor/messages`,
  BUILDS: `monitor/builds`,
  STORE: `store`,
  USERS: "users",
  LOGOUT: `logout`,
  LOGIN: `login`,
  SESSION: `session`,
  AUTOLOGIN: "auto_login",
  REFRESH: "refresh",
  BUILD: `build`,
  CUSTOM_COMPONENT: `custom_component`,
  FLOWS: `flows`,
  FOLDERS: `projects`,
  PROJECTS: `projects`,
  VARIABLES: `variables`,
  VALIDATE: `validate`,
  CONFIG: `config`,
  STARTER_PROJECTS: `starter-projects`,
  SIDEBAR_CATEGORIES: `sidebar_categories`,
  ALL: `all`,
  VOICE: `voice`,
  PUBLIC_FLOW: `flows/public_flow`,
  MCP: `mcp/project`,
  MCP_SERVERS: `mcp/servers`,
  KNOWLEDGE_BASES: `knowledge_bases`,
  MEMORIES: `memories`,
  MODELS: `models`,
  MODEL_PROVIDERS: `models/providers`,
  RUN: `run`,
  RUN_SESSION: `run/session`,
  REGISTRATION: `registration`,
  DEPLOYMENTS: `deployments`,
  DEPLOYMENT_PROVIDER_ACCOUNTS: `deployments/providers`,
  AGENTIC_ASSIST: `agentic/assist`,
  AGENTIC_ASSIST_STREAM: `agentic/assist/stream`,
  AGENTIC_CHECK_CONFIG: `agentic/check-config`,
  AGENTIC_FILES: `agentic/files`,
  EXTENSIONS: `extensions`,
  OPERATIONS_PRODUCT: `operations/product`,
  OPERATIONS_INVENTORY: `operations/inventory`,
  OPERATIONS_STOCK_MOVEMENT: `operations/stock-movement`,
  OPERATIONS_CUSTOMER: `operations/customer`,
  OPERATIONS_ORDER: `operations/order`,
  OPERATIONS_STATION: `operations/station`,
  OPERATIONS_STATION_QUEUE: `operations/station-queue`,
  OPERATIONS_WORKFLOW: `operations/workflow`,
  OPERATIONS_WORKFLOW_STEP: `operations/workflow-step`,
  OPERATIONS_PRODUCTION_ORDER: `operations/production-order`,
  OPERATIONS_ACTION_TYPE: `operations/action-type`,
  OPERATIONS_TENANT: `operations/tenant`,
  OPERATIONS_DASHBOARD: `operations/dashboard`,
  OPERATIONS_EMPLOYEE: `operations/employee`,
  OPERATIONS_ASSET: `operations/asset`,
  OPERATIONS_STANDARD: `operations/standard`,
} as const;

// IMPORTANT: FOLDERS endpoint now points to 'projects' for backward compatibility

export function getURL(
  key: keyof typeof URLs,
  params: Record<string, unknown> = {},
  v2: boolean = false,
) {
  let url = URLs[key];
  for (const paramKey of Object.keys(params)) {
    url += `/${params[paramKey]}`;
  }
  return `${v2 ? BASE_URL_API_V2 : getBaseUrl()}${url}`;
}

export type URLsType = typeof URLs;
