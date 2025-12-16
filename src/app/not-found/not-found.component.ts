import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthHeaderComponent } from '../auth-header/auth-header.component';

@Component({
  selector: 'app-not-found',
  imports: [RouterModule, CommonModule, AuthHeaderComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  title = 'Page Not Found';
  subtitle = 'Go Back Home';
  link = '/sign-in';
}
