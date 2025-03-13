import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
 
import { AuthFormHeaderComponent } from '../auth-form-header/auth-form-header.component';

const REQUIRED_ERROR_MESSAGE = 'Field is required';

@Component({
  selector: 'app-sign-up-form',
  imports: [AuthFormHeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {
  title = 'Sign Up';
  subtitle = 'Sign In';
  link = '/sign-in';

  form = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl('')
  });

  emailControl = this.form.controls['email'];
  nameControl = this.form.controls['name'];
  passwordControl = this.form.controls['password']
  repeatPassword = this.form.controls['repeatPassword'];

  showUserLoggedIn(email: string, password: string) {
    console.log(`User with email: ${email} and password: ${password} is logged in`);
  }

  formSubmit() {
    const { value: emailValue } = this.emailControl;
    const { value: passwordValue } = this.passwordControl;
    const { value: nameValue } = this.nameControl;
    const { value: repeatPasswordValue } = this.repeatPassword;

    if (!emailValue) {
      this.emailControl.setErrors({ errorMessage: REQUIRED_ERROR_MESSAGE });
    }

    if (!passwordValue) {
      this.passwordControl.setErrors({ errorMessage: REQUIRED_ERROR_MESSAGE })
    }

    if (!nameValue) {
      this.nameControl.setErrors({ errorMessage: REQUIRED_ERROR_MESSAGE })
    }

    if (!repeatPasswordValue) {
      this.repeatPassword.setErrors({ errorMessage: REQUIRED_ERROR_MESSAGE })
    }

    if (repeatPasswordValue !== passwordValue) {
      this.repeatPassword.setErrors({ errorMessage: 'Must equal password' })
    }

    if (emailValue && passwordValue) {
      this.showUserLoggedIn(emailValue, passwordValue);
    }
  }
}
