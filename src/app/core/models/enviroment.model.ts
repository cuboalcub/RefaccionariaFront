export interface Environment {
  production: boolean;
  apiUrl: string;
  auth: { clientId: string };
  logging: boolean;
  appVersion: string;
}