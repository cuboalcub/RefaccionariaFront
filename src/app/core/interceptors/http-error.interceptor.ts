import { HTTP_ERRORS, HTTP_MESSAGES } from '../constants/http.constants';
import { LoggerService } from '@/core/services/logger.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private readonly logger;


/**
 * Constructor for the HttpErrorInterceptor.
 * @param loggerService - The logger service to log messages.
 */
  constructor(
    private loggerService: LoggerService
  ) {
    this.logger = this.loggerService.withContext('HttpErrorInterceptor');
  }

/**
 * Intercepts an HTTP request and handles any errors that occur.
 * If an error occurs, it will log the error and rethrow the error with a user-friendly message.
 * @param req - The HTTP request to be intercepted.
 * @param next - The HTTP handler to be called after the interceptor.
 * @returns An observable of the HTTP event.
 */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.logger.error(HTTP_MESSAGES.ERROR_RESPONSE, { url: req.url, status: error.status });
        const userMessage = HTTP_ERRORS[error.status] ?? HTTP_MESSAGES.ERROR_RESPONSE;
        return throwError(() => new Error(userMessage));
      })
    );
  }
}
