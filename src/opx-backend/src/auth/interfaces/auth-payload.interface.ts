export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    roles: string[];
    tenantId: string;
  };
}