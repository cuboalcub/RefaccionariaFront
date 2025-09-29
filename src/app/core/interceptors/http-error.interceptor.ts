import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '@/core/services/logger.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private logger: LoggerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.logger.error('HTTP Error', {
          url: req.url,
          status: error.status,
          message: error.message,
          error: error.error
        }, 'HttpErrorInterceptor');

        let userMessage = 'Error inesperado';
        if (error.status === 0) {
          userMessage = 'No hay conexión con el servidor';
        } else if (error.status === 404) {
          userMessage = 'Recurso no encontrado';
        } else if (error.status === 401) {
          userMessage = 'No estás autorizado';
        } else if (error.status === 500) {
          userMessage = 'Error interno del servidor';
        }

        return throwError(() => new Error(userMessage));
      })
    );
  }
}