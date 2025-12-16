import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { AuthFormHeaderComponent } from '../auth-form-header/auth-form-header.component';
import { SignInResponse } from '../../models/auth-responses';

import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-sign-in-form',
  imports: [AuthFormHeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss'
})
export class SignInFormComponent {
  signInForm: FormGroup;

  title = 'Sign In';
  subtitle = 'Sign Up';
  link = '/auth/sign-up';

  private authService = inject(AuthService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  constructor(private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  formSubmit() {
    const { email, password } = this.signInForm.value;

    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();

      return;
    }

    const formPayload = {
      email,
      password
    };

    this.authService.signIn(formPayload).subscribe({
      next: (res: SignInResponse) => {
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
