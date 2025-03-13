import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthFormHeaderComponent } from '../auth-form-header/auth-form-header.component';

const REQUIRED_ERROR_MESSAGE = 'Field is required';

@Component({
  selector: 'app-sign-in-form',
  imports: [AuthFormHeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss'
})
export class SignInFormComponent {
  title = 'Sign In';
  subtitle = 'Sign Up';
  link = '/sign-up';

  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  emailControl = this.form.controls['email'];
  passwordControl = this.form.controls['password']

  showUserLoggedIn(email: string, password: string) {
    console.log(`User with email: ${email} and password: ${password} is logged in`);
  }

  formSubmit() {
    const { value: emailValue } = this.emailControl;
    const { value: passwordValue } = this.passwordControl;

    if (!emailValue) {
      this.emailControl.setErrors({ errorMessage: REQUIRED_ERROR_MESSAGE });
    }

    if (!passwordValue) {
      this.passwordControl.setErrors({ errorMessage: REQUIRED_ERROR_MESSAGE })
    }

    if (emailValue && passwordValue) {
      this.showUserLoggedIn(emailValue, passwordValue);
    }
  }
}
