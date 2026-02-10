import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faDashboard,
  faUsers,
  faUserTie,
  faHandshake,
  faSignOut,
  faUser
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar-dashboard-navigation',
  imports: [FontAwesomeModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-dashboard-navigation.component.html',
  styleUrl: './sidebar-dashboard-navigation.component.scss'
})
export class SidebarDashboardNavigationComponent {
  private authService = inject(AuthService);

  constructor() {
    library.add(faDashboard, faUsers, faUserTie, faHandshake);
  }

  faDashboard = faDashboard;
  faUsers = faUsers;
  faUserTie = faUserTie;
  faHandshake = faHandshake;

  navigationItems = [
    {
      icon: faDashboard,
      title: 'Dashboard',
      path: '/dashboard'
    },
    {
      icon: faUsers,
      title: 'Clients',
      path: '/dashboard/clients'
    },
    {
      icon: faUserTie,
      title: 'Managers',
      path: '/dashboard/managers'
    },
    {
      icon: faHandshake,
      title: 'Deals',
      path: '/dashboard/deals'
    }
  ];

  bottomNavigationItems = [
    {
      icon: faUser,
      title: 'Settings',
      path: '/dashboard/settings'
    },
    {
      icon: faSignOut,
      title: 'Sign Out',
      onClick: () => this.authService.logout()
    }
  ];
}
