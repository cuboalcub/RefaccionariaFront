import { AUTH_MESSAGES } from '@/core/constants/auth.constants';
import { LoggerService } from '@/core/services/logger.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Injectable, inject } from '@angular/core';
import { EMPTY } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginUserUseCase {
  private readonly authService = inject(AuthService);
  private readonly logger = inject(LoggerService);

  /**
   * Execute the login use case.
   *
   * It calls the AuthService.login method with the given credentials and
   * logs the result. If the login fails, it logs an error and sets
   * the errorMessage accordingly.
   *
   * @param {Object} credentials - The credentials to use for the login.
   * @param {function} onSuccess - The function to call when the login is successful.
   * @param {function} onError - The function to call when the login fails.
   * @param {function} onFinally - The function to call when the login is finished.
   * @returns {Observable<any>} - The observable that is returned by the login method.
   */
  execute(credentials: { username: string; password: string }, onSuccess: () => void, onError: (msg: string) => void, onFinally: () => void) {
    return this.authService.login(credentials).pipe(
      tap((session) => {
        this.logger.info(AUTH_MESSAGES.LOGIN_SUCCESS, session);
        onSuccess();
      }),
      catchError((err) => {
        const message = err?.message ?? AUTH_MESSAGES.LOGIN_FAILED;
        this.logger.error(AUTH_MESSAGES.LOGIN_FAILED, err);
        onError(message);
        return EMPTY;
      }),
      finalize(() => onFinally())
    );
  }
}
