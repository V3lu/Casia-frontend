import { Service, computed, signal } from '@angular/core';
import { AuthSession, User } from '../Models';

@Service()
export class CurrentUserService {
  private readonly userStorageKey = 'casia-current-user';
  private readonly tokenStorageKey = 'casia-auth-token';
  private readonly currentUser = signal<User | null>(this.readPersistedUser());
  readonly user = this.currentUser.asReadonly();
  readonly isAuthenticatedSignal = computed(() => this.isAuthenticated());

  setCurrentUser(user: User): void {
    this.currentUser.set(user);
    this.persistUser(user);
  }

  setSession(session: AuthSession): void {
    this.currentUser.set(session.user ?? null);
    this.persistUser(session.user ?? null);
    this.persistToken(session.token);
  }

  login(user: User): void {
    this.setCurrentUser(user);
  }

  logout(): void {
    this.currentUser.set(null);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(this.userStorageKey);
      window.localStorage.removeItem(this.tokenStorageKey);
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }

  getToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.localStorage.getItem(this.tokenStorageKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string | string[]): boolean {
    const user = this.currentUser();
    if (!user) {
      return false;
    }

    const targetRoles = Array.isArray(role) ? role : [role];
    return targetRoles.some((candidate) => candidate.toLowerCase() === (user.role ?? '').toLowerCase());
  }

  private persistUser(user: User | null): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (!user) {
      window.localStorage.removeItem(this.userStorageKey);
      return;
    }

    window.localStorage.setItem(this.userStorageKey, JSON.stringify(user));
  }

  private persistToken(token: string | null): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (!token) {
      window.localStorage.removeItem(this.tokenStorageKey);
      return;
    }

    window.localStorage.setItem(this.tokenStorageKey, token);
  }

  private readPersistedUser(): User | null {
    if (typeof window === 'undefined') {
      return null;
    }

    const storedValue = window.localStorage.getItem(this.userStorageKey);
    if (!storedValue) {
      return null;
    }

    try {
      return JSON.parse(storedValue) as User;
    } catch {
      window.localStorage.removeItem(this.userStorageKey);
      return null;
    }
  }
}
