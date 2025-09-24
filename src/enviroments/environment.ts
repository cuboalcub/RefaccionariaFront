import { Environment } from "@/core/models/enviroment.model";

export const environment: Environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  auth: { clientId: 'dev-client-id' },
  logging: true,
  appVersion: '1.0.0-dev'
};