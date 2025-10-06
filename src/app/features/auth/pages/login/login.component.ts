import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@/features/auth/services/auth.service';
import { LoggerService } from '@/core/services/logger.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  logoPath = 'assets/logo-trt.png';
  backgroundImagePath = 'assets/refaccionaria.jpg';

  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private logger: LoggerService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.logger.warn('LoginComponent → Form invalid');
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    const payload = this.loginForm.value;

    this.authService.login(payload).subscribe({
      next: (session) => {
        this.logger.info('LoginComponent User logged in', session);
        this.loading = false;
        this.router.navigate(['/']); 
      },
      error: (err) => {
        this.logger.error('LoginComponent Login failed', err);
        this.loading = false;
        this.errorMessage = err.message || 'Error en el login';
      },
    });
  }
}
