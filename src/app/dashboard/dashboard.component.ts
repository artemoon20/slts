import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUsers, faUserTie, faHandshake } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  faUsers = faUsers;
  faUserTie = faUserTie;
  faHandshake = faHandshake;
}
