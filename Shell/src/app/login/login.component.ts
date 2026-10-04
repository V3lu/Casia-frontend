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

  readonly username = signal('');
  readonly password = signal('');
  readonly authError = signal('');

  login(): void {
    const normalizedUsername = this.username().trim();
    const enteredPassword = this.password();

    if (!normalizedUsername || !enteredPassword) {
      this.authError.set('Please enter both username and password.');
      return;
    }

    this.authService.login(normalizedUsername, enteredPassword).subscribe({
      next: () => this.router.navigateByUrl('/Dashboard'),
      error: () => this.authError.set('The backend rejected the login request. Please verify your credentials and try again.'),
    });
  }
}
