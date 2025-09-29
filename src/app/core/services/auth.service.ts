import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { LoginRequest } from '@/core/models/auth/login-request.model';
import { LoginResponse } from '@/core/models/auth/login-response.model';
import { Session } from '@/core/models/auth/session.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '/api/auth';

  constructor(private http: HttpClient) {}

}
