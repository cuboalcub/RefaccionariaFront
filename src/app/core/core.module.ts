import { NgModule, ErrorHandler } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { GlobalErrorHandlerService } from "./services/global-error-handler.service";
import { HttpErrorInterceptor } from "./interceptors/http-error.interceptor";

@NgModule({
  providers: [
    {provide: ErrorHandler, useClass: GlobalErrorHandlerService},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
  ]
})

export class CoreModule {}
    