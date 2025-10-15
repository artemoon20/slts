import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-form-header',
  imports: [RouterModule],
  templateUrl: './auth-form-header.component.html',
  styleUrl: './auth-form-header.component.scss'
})
export class AuthFormHeaderComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) subtitle!: string;
  @Input({ required: true }) link!: string;
}
