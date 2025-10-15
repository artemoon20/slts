import { Component, inject } from '@angular/core';
import { FormGroup, AbstractControl, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { AuthFormHeaderComponent } from '../auth-form-header/auth-form-header.component';
import { SignUpResponse } from '../../models/auth-responses'; 
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-sign-up-form',
  imports: [AuthFormHeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {
  signUpForm: FormGroup;

  private authService = inject(AuthService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  title = 'Sign Up';
  subtitle = 'Sign In';
  link = '/auth/sign-in';

  constructor(private fb: FormBuilder) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, {
      validators: [this.passwordMatchValidator]
    });
  }

  private passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword')?.value;

    if (password && !repeatPassword) {
      return { passwordMismatch: true };
    }

    if (!password && repeatPassword) {
      return { passwordMismatch: true };
    }

    return password === repeatPassword ? null : { passwordMismatch: true };
  }

  formSubmit() {
    const { email, password, name } = this.signUpForm.value;

    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();

      return;
    }

    this.authService.signUp(email, password, 'admin', 'active', name).subscribe({
      next: (res: SignUpResponse) => {
      if (res.accessToken) {
        this.authService.setToken(res.accessToken);
        this.router.navigate(['/dashboard']);
      }
      },
      error: (err: any) => {
        this.notificationService.show(err.error.message || 'Email or password is incorrect');
      }
    });
  }
}
