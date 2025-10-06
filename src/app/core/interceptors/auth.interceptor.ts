import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { SessionService } from '@/core/services/session.service';
import { LoggerService } from '@/core/services/logger.service';
import { AUTH_MESSAGES } from '../constants/auth.constants';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly looger;

/**
 * Constructor for the AuthInterceptor.
 * @param sessionService - The session service to check if a user is authenticated.
 * @param loggerService - The logger service to log messages.
 */
  constructor(
    private sessionService: SessionService, 
    private loggerService: LoggerService
  ) {
    this.looger = this.loggerService.withContext('AuthInterceptor');
  }

/**
 * Intercepts the HTTP request and adds the Authorization header with the access token
 * if the user is authenticated.
 * If the user is not authenticated, it will log a warning message and proceed with the request.
 * @param req The HTTP request to be intercepted.
 * @param next The HTTP handler to be called after the interceptor.
 * @returns An observable of the HTTP event.
 */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const session = this.sessionService.getSession();

    if (session) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${session.accessToken}`),
      });
      this.looger.debug(AUTH_MESSAGES.REQUEST_WITH_TOKEN, { url: req.url, method: req.method });
      return next.handle(cloned);
    } else {
      this.looger.warn(AUTH_MESSAGES.REQUEST_WITHOUT_TOKEN, { url: req.url, method: req.method });
      return next.handle(req);
    }
  }
}
