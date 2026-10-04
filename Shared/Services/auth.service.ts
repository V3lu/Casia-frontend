import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../Environment';
import { AuthSession, LoginRequest, LoginResponse } from '../Models';
import { CurrentUserService } from './current-user.service';

@Service()
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly router = inject(Router);

  login(username: string, password: string): Observable<boolean> {
    const normalizedUsername = username.trim();

    if (!normalizedUsername || !password) {
      return new Observable<boolean>((observer) => {
        observer.next(false);
        observer.complete();
      });
    }

    const request: LoginRequest = {
      username: normalizedUsername,
      password,
    };

    return this.http.post<LoginResponse>(`${environment.authApiUrl}/api/Auth/login`, request).pipe(
      map((response) => this.toSession(response)),
      tap((session) => this.currentUserService.setSession(session)),
      map(() => true),
    );
  }

  logout(): void {
    this.currentUserService.logout();
    this.router.navigateByUrl('/login');
  }

  private toSession(response: LoginResponse): AuthSession {
    const payload = response.data ?? response;
    const token = payload.token ?? payload.accessToken ?? '';

    if (!token) {
      throw new Error('Authentication response did not include a token.');
    }

    return {
      token,
      expiresAt: payload.expiresAt,
      user: payload.user,
    };
  }
}
