import { environment } from "environments/environment";
import { Environment } from "./enviroment.model";
import { InjectionToken } from "@angular/core";

export const ENVIRONMENT = new InjectionToken<Environment>('app.environment', {
  providedIn: 'root',
  factory: () => environment,
});