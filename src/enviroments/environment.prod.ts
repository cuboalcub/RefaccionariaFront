import { Environment } from "@/core/models/enviroment.model";

export const environment: Environment = {
  production: true,
  apiUrl: 'http://localhost:3000/api',
  auth: { clientId: 'dev-client-id' },
  logging: false,
  appVersion: '1.0.0-dev'
};