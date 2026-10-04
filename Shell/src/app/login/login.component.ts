import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from 'Shared/Services';

@Component({
  selector: 'app-login',
  imports: [CardModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly email = signal('');
  readonly password = signal('');
  readonly authError = signal('');

  login(): void {
    const normalizedEmail = this.email().trim();
    const enteredPassword = this.password();

    if (!normalizedEmail || !enteredPassword) {
      this.authError.set('Please enter both email and password.');
      return;
    }

    this.authService.login(normalizedEmail, enteredPassword).subscribe({
      next: () => this.router.navigateByUrl('/Dashboard'),
      error: () => this.authError.set('The backend rejected the login request. Please verify your credentials and try again.'),
    });
  }
}
