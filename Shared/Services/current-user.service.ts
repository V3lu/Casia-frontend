import { Service } from '@angular/core';
import { User } from '../Models';

@Service()
export class CurrentUserService {
  currentUser: User | null = null;
  
  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
