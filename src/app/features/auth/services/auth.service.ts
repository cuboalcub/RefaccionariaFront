import { SessionMapper } from '@/core/models/auth/mappers/session.mapper';
import { LoginResponse } from '@/core/models/auth/login-response.model';
import { LoginRequest } from '@/core/models/auth/login-request.model';
import { UserMapper } from '@/core/models/auth/mappers/user.mapper';
import { SessionService } from '@/core/services/session.service';
import { LoggerService } from '@/core/services/logger.service';
import { Environment } from '@/core/models/enviroment.model';
import { ENVIRONMENT } from '@/core/models/enviroment.token';
import { ROUTES } from '@/core/constants/routes.constants';
import { Session } from '@/core/models/auth/session.model';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private logger: LoggerService,
    @Inject(ENVIRONMENT) private env: Environment
  ) {}

  login(payload: LoginRequest): Observable<Session> {
    const url = `${this.env.apiUrl}${ROUTES['LOGIN']}`;

    this.logger.info('AuthService.login Sending login request', payload);

    return this.http.post<LoginResponse>(url, payload).pipe(
      map((apiResponse) => {
        this.logger.debug('AuthService.login Raw API response', apiResponse);
        const loginResponse: LoginResponse = UserMapper.mapFromApi(apiResponse);
        const session = SessionMapper.fromLoginResponse(loginResponse);
        this.sessionService.setSession(session);
        this.logger.info('AuthService.login Session stored successfully');
        return session;
      }),
      tap({
        error: (err) => this.logger.error('AuthService.login Failed', err, 'AuthService'),
      })
    );
  }

  refreshToken(): Observable<Session> {
    const url = `${this.env.apiUrl}${ROUTES['REFRESH']}`;
    return this.http.post<LoginResponse>(url, { token: this.getSession()?.refreshToken }).pipe(
      map((response) => {
        const session = SessionMapper.fromLoginResponse(response);
        this.sessionService.setSession(session);
        return session;
      })
    );
  }

  logout(): void {
    this.logger.info('AuthService.logout Clearing session');
    this.sessionService.clearSession();
  }

  getSession(): Session | null {
    return this.sessionService.getSession();
  }

  isLoggedIn(): boolean {
    return this.sessionService.isLoggedIn();
  }
}
