import { TestBed } from '@angular/core/testing';
import { CurrentUserService } from './current-user.service';

describe('CurrentUserService', () => {
  let service: CurrentUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentUserService);
    service.logout();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store a session and honor role checks after login', () => {
    service.login({
      id: 'usr-1',
      firstName: 'Adam',
      lastName: 'Doe',
      role: 'Admin',
      email: 'admin@casia.local'
    });

    expect(service.isAuthenticated()).toBe(true);
    expect(service.hasRole('Admin')).toBe(true);
    expect(service.getCurrentUser()?.email).toBe('admin@casia.local');

    service.logout();

    expect(service.isAuthenticated()).toBe(false);
  });

  it('expires a persisted session and clears its credentials', () => {
    service.setSession({
      token: 'expired-token',
      expiresAt: new Date(Date.now() - 1_000).toISOString(),
      user: { id: 'usr-2', firstName: 'Expired', lastName: 'User', role: 'Sales' },
    });

    expect(service.isAuthenticated()).toBe(false);
    expect(service.getToken()).toBeNull();
  });
});
