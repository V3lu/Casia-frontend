import { Injectable, signal } from '@angular/core';
import { User } from '../Models';

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
  private readonly currentUser = signal<User | null>(null);
  readonly user = this.currentUser.asReadonly();
  
  setCurrentUser(user: User): void {
    this.currentUser.set(user);
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }
}
