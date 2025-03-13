import { Component } from '@angular/core';

import { AuthHeaderComponent } from '../auth-header/auth-header.component';
import { SignInFormComponent } from '../sign-in-form/sign-in-form.component';

@Component({
  selector: 'app-sign-in',
  imports: [AuthHeaderComponent, SignInFormComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

}
