import { Component } from '@angular/core';

import { AuthHeaderComponent } from '../auth-header/auth-header.component';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';

@Component({
  selector: 'app-sign-up',
  imports: [AuthHeaderComponent, SignUpFormComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {}
