import { CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SessionService } from '@/core/services/session.service';
import { LoggerService } from '@/core/services/logger.service';
import { AUTH_MESSAGES } from '../constants/auth.constants';
import { ROUTES } from '@/core/constants/routes.constants';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private readonly logger;

/**
 * Constructor for the AuthGuard.
 * @param sessionService - The session service to check if a user is authenticated.
 * @param router - The router to redirect to the login page if the user is not authenticated.
 * @param loggerService - The logger service to log messages.
 */
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private loggerService: LoggerService
  ) {
    this.logger = this.loggerService.withContext('AuthGuard');
  }

/**
 * Checks if a user is authenticated to access a route.
 * If the user is not authenticated, it will redirect to the login page.
 * @param state - The current router state
 * @returns A boolean indicating if the route is accessible or a UrlTree to redirect to the login page
 */
  canActivate(_: unknown, state: RouterStateSnapshot): boolean | UrlTree {
    if (!this.sessionService.isLoggedIn()) {
      this.logger.warn(AUTH_MESSAGES.ACCESS_DENIED, { url: state.url });
      return this.router.parseUrl(ROUTES.LOGIN);
    }

    this.logger.info(AUTH_MESSAGES.ACCESS_GRANTED, { url: state.url });
    return true;
  }
}