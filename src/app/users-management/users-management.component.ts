import { Component, inject, HostListener, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faEllipsisVertical, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import { ManagementSideContentActionsComponent } from '../management-side-content-actions/management-side-content-actions.component';
import { AddClientComponent } from '../add-client/add-client.component';
import { EditClientComponent } from '../edit-client/edit-client.component';
import { TableComponent } from '../table/table.component';
import { ButtonType } from '../../shared/constants/app-constants';

import { ColumnDirective } from '../../shared/directives/column.directive';

import { ClientsService } from '../../services/clients.service';
import { NotificationService } from '../../services/notification.service';

// import { ResponseModel } from '../../shared/types';

import UserModel from '../../models/user-model';

@Component({
  selector: 'app-users-management',
  imports: [ManagementSideContentActionsComponent, CommonModule, TableComponent, ColumnDirective, FontAwesomeModule, AddClientComponent, EditClientComponent],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.scss'
})
export class UsersManagementComponent {
  constructor() {
    library.add(faEdit, faEllipsisVertical, faEye, faTrash);
  }

  faEllipsisVertical = faEllipsisVertical;
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;

  pageTitle: string = 'Clients Management';
  pageSubtitle: string = 'Manage your clients and bla-bla-bla';

  headingLabel: string = 'All Clients';
  headingSublabel: string = '';

  isSearchVisible: boolean = true;
  isMainActionVisible: boolean = true;

  showEditClientModal: boolean = false;
  showAddClientModal: boolean = false;

  mainActionButtonName: string = 'add-client';
  mainActionButtonLabel: string = 'Add Client';

  users = signal<UserModel[]>([]);
  usersLength = signal<number>(0);
  ButtonTypes: typeof ButtonType = ButtonType;

  showContextMenu: boolean = false;
  contextMenuPosition: { x: number, y: number } = { x: 0, y: 0 };
  selectedUser: UserModel | null = null;

  usersService = inject(ClientsService);
  notificationService = inject(NotificationService);

  isLoading = signal(false);

  userId: string = '';

  openAddUserModal() {
    this.showAddClientModal = true;
  }
  
  closeAddUserModal() {
    this.showAddClientModal = false;
  }

  openEditUserModal() {
    this.showEditClientModal = true;
    this.userId = this.selectedUser!.id;
  }

  closeEditUserModal() {
    this.showEditClientModal = false;
  }

  onMoreActionsClick(event: MouseEvent, user: UserModel) {
    event.stopPropagation();
    this.selectedUser = user;
    
    const target = document.querySelector('.users-management__actions-icon') as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    this.contextMenuPosition = { 
      x: rect.left - 120,
      y: rect.bottom + 5 
    };
    
    if (this.contextMenuPosition.x < 10) {
      this.contextMenuPosition.x = rect.right + 5;
    }
    
    if (this.contextMenuPosition.y + 100 > window.innerHeight) {
      this.contextMenuPosition.y = rect.top - 105;
    }
    
    this.showContextMenu = true;
  }

  onViewUser() {
    this.hideContextMenu();
  }

  onEditUser() {
    this.openEditUserModal();
    this.hideContextMenu();
  }

  onDeleteUser() {
    this.deleteClient(this.selectedUser!.id);
    this.hideContextMenu();
  }

  hideContextMenu() {
    this.showContextMenu = false;
    this.selectedUser = null;
  }

  ngOnInit() {
    this.fetchAllClients();
  }

  onClientCreated() {
    this.fetchAllClients();
    this.closeAddUserModal();
  }
  
  fetchAllClients() {
    this.isLoading.set(true);


    this.usersService.fetchAllClients().subscribe({
      next: (res) => {
        const { data } = res;
        this.users.set(data);
        this.usersLength.set(data.length);
        this.headingSublabel = this.usersLength().toString();
      },
      error: (error) => {
        this.notificationService.showError(error.message);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  deleteClient(clientId: string) {
    this.isLoading.set(true);

    this.usersService.deleteClient(clientId).subscribe({
      next: (res) => {},
      error: (error) => {
        this.notificationService.showError(error.message);
      },
      complete: () => {
        this.isLoading.set(false);
        this.notificationService.showSuccess('Client deleted successfully');

        this.users.update((users) => users.filter((user) => user.id !== clientId));
        console.log(this.users().length);
        
        this.usersLength.set(this.users().length);
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.hideContextMenu();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    if (this.showContextMenu) {
      this.hideContextMenu();
    }
  }
}