import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginUserUseCase } from '@/features/auth/usecase/login.usecase';
import { Component, computed, inject, signal } from '@angular/core';
import { AUTH_MESSAGES } from '@/core/constants/auth.constants';
import { LoggerService } from '@/core/services/logger.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  readonly backgroundImagePath = 'assets/refaccionaria.jpg';
  readonly logoPath = 'assets/logo-trt.png';

  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly isDisabled = computed(() => this.loading() || this.loginForm.invalid);

  private readonly logger = inject(LoggerService).withContext('LoginComponent');
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly loginUserUseCase = inject(LoginUserUseCase);

  readonly loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.logger.warn(AUTH_MESSAGES.FORM_INVALID);
      this.loginForm.markAllAsTouched();
      return;
    }

    const credentials = this.loginForm.getRawValue();
    this.loading.set(true);
    this.errorMessage.set(null);

    this.loginUserUseCase
      .execute(
        credentials,
        () => this.router.navigateByUrl('/'),
        (msg) => this.errorMessage.set(msg),
        () => this.loading.set(false)
      )
      .subscribe();
  }

  get usernameCtrl() {
    return this.loginForm.controls.username;
  }

  get passwordCtrl() {
    return this.loginForm.controls.password;
  }
}
