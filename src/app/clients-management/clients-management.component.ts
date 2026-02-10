import { Component, inject, HostListener, signal, OnInit } from '@angular/core';
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

import ClientModel from '../../models/user-model';

@Component({
  selector: 'app-clients-management',
  imports: [
    ManagementSideContentActionsComponent,
    CommonModule,
    TableComponent,
    ColumnDirective,
    FontAwesomeModule,
    AddClientComponent,
    EditClientComponent
  ],
  templateUrl: './clients-management.component.html',
  styleUrl: './clients-management.component.scss'
})
export class ClientsManagementComponent implements OnInit {
  constructor() {
    library.add(faEdit, faEllipsisVertical, faEye, faTrash);
  }

  faEllipsisVertical = faEllipsisVertical;
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;

  pageTitle: string = 'Clients Management';
  pageSubtitle: string = 'Manage and organize your client relationships';

  headingLabel: string = 'All Clients';
  headingSublabel: string = '';

  isSearchVisible: boolean = true;
  isMainActionVisible: boolean = true;

  showEditClientModal: boolean = false;
  showAddClientModal: boolean = false;

  mainActionButtonName: string = 'add-client';
  mainActionButtonLabel: string = 'Add Client';

  clients = signal<ClientModel[]>([]);
  clientsLength = signal<number>(0);
  ButtonTypes: typeof ButtonType = ButtonType;

  showContextMenu: boolean = false;
  contextMenuPosition: { x: number; y: number } = { x: 0, y: 0 };
  selectedClient: ClientModel | null = null;

  clientsService = inject(ClientsService);
  notificationService = inject(NotificationService);

  isLoading = signal(false);

  clientId: string = '';

  openAddClientModal() {
    this.showAddClientModal = true;
  }

  closeAddClientModal() {
    this.showAddClientModal = false;
  }

  openEditClientModal() {
    this.showEditClientModal = true;
    this.clientId = this.selectedClient!.id;
  }

  closeEditClientModal() {
    this.showEditClientModal = false;
  }

  onMoreActionsClick(event: MouseEvent, client: ClientModel) {
    event.stopPropagation();
    this.selectedClient = client;

    const target = event.currentTarget as HTMLElement;
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

  onViewClient() {
    this.hideContextMenu();
  }

  onEditClient() {
    this.openEditClientModal();
    this.hideContextMenu();
  }

  onDeleteClient() {
    this.deleteClient(this.selectedClient!.id);
    this.hideContextMenu();
  }

  hideContextMenu() {
    this.showContextMenu = false;
    this.selectedClient = null;
  }

  ngOnInit() {
    this.fetchAllClients();
  }

  onClientCreated() {
    this.fetchAllClients();
    this.closeAddClientModal();
  }

  fetchAllClients() {
    this.isLoading.set(true);

    this.clientsService.fetchAllClients().subscribe({
      next: res => {
        const { data } = res;
        this.clients.set(data);
        this.clientsLength.set(data.length);
        this.headingSublabel = this.clientsLength().toString();
      },
      error: _error => {
        this.notificationService.showError('Failed to fetch clients. Please try again.');
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  deleteClient(clientId: string) {
    this.isLoading.set(true);

    this.clientsService.deleteClient(clientId).subscribe({
      next: _res => {},
      error: _error => {
        this.notificationService.showError('Failed to delete client. Please try again.');
      },
      complete: () => {
        this.isLoading.set(false);
        this.notificationService.showSuccess('Client deleted successfully');

        this.clients.update(clients => clients.filter(client => client.id !== clientId));
        this.clientsLength.set(this.clients().length);
        this.headingSublabel = this.clientsLength().toString();
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(_event: MouseEvent) {
    this.hideContextMenu();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(_event: Event) {
    if (this.showContextMenu) {
      this.hideContextMenu();
    }
  }
}
