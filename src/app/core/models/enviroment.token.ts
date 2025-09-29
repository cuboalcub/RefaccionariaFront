import { InjectionToken } from "@angular/core";
import { Environment } from "./enviroment.model";
import { environment } from "enviroments/environment";

export const ENVIRONMENT = new InjectionToken<Environment>('app.environment', {
  providedIn: 'root',
  factory: () => environment,
});