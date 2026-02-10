import { Component, inject, HostListener, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faEllipsisVertical, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import { ManagementSideContentActionsComponent } from '../management-side-content-actions/management-side-content-actions.component';
import { AddManagerComponent } from '../add-manager/add-manager.component';
import { EditManagerComponent } from '../edit-manager/edit-manager.component';
import { TableComponent } from '../table/table.component';
import { ButtonType } from '../../shared/constants/app-constants';

import { ColumnDirective } from '../../shared/directives/column.directive';

import { ManagersService } from '../../services/managers.service';
import { NotificationService } from '../../services/notification.service';

import { ManagerModel } from '../../models/user-model';

@Component({
  selector: 'app-managers',
  imports: [
    ManagementSideContentActionsComponent,
    CommonModule,
    TableComponent,
    ColumnDirective,
    FontAwesomeModule,
    AddManagerComponent,
    EditManagerComponent
  ],
  templateUrl: './managers.component.html',
  styleUrl: './managers.component.scss'
})
export class ManagersComponent implements OnInit {
  constructor() {
    library.add(faEdit, faEllipsisVertical, faEye, faTrash);
  }

  faEllipsisVertical = faEllipsisVertical;
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;

  pageTitle: string = 'Managers Management';
  pageSubtitle: string = 'Manage and organize your team of managers';

  headingLabel: string = 'All Managers';
  headingSublabel: string = '';

  isSearchVisible: boolean = true;
  isMainActionVisible: boolean = true;

  showEditManagerModal: boolean = false;
  showAddManagerModal: boolean = false;

  mainActionButtonName: string = 'add-manager';
  mainActionButtonLabel: string = 'Add Manager';

  managers = signal<ManagerModel[]>([]);
  managersLength = signal<number>(0);
  ButtonTypes: typeof ButtonType = ButtonType;

  showContextMenu: boolean = false;
  contextMenuPosition: { x: number; y: number } = { x: 0, y: 0 };
  selectedManager: ManagerModel | null = null;

  managersService = inject(ManagersService);
  notificationService = inject(NotificationService);

  isLoading = signal(false);

  managerId: string = '';

  openAddManagerModal() {
    this.showAddManagerModal = true;
  }

  closeAddManagerModal() {
    this.showAddManagerModal = false;
  }

  openEditManagerModal() {
    this.showEditManagerModal = true;
    this.managerId = this.selectedManager!.id;
  }

  closeEditManagerModal() {
    this.showEditManagerModal = false;
  }

  onMoreActionsClick(event: MouseEvent, manager: ManagerModel) {
    event.stopPropagation();
    this.selectedManager = manager;

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

  onViewManager() {
    this.hideContextMenu();
  }

  onEditManager() {
    this.openEditManagerModal();
    this.hideContextMenu();
  }

  onDeleteManager() {
    this.deleteManager(this.selectedManager!.id);
    this.hideContextMenu();
  }

  hideContextMenu() {
    this.showContextMenu = false;
    this.selectedManager = null;
  }

  ngOnInit() {
    this.fetchAllManagers();
  }

  onManagerCreated() {
    this.fetchAllManagers();
    this.closeAddManagerModal();
  }

  fetchAllManagers() {
    this.isLoading.set(true);

    this.managersService.fetchAllManagers().subscribe({
      next: res => {
        const { data } = res;
        this.managers.set(data);
        this.managersLength.set(data.length);
        this.headingSublabel = this.managersLength().toString();
      },
      error: _error => {
        this.notificationService.showError('Failed to fetch managers. Please try again.');
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  deleteManager(managerId: string) {
    this.isLoading.set(true);

    this.managersService.deleteManager(managerId).subscribe({
      next: _res => {},
      error: _error => {
        this.notificationService.showError('Failed to delete manager. Please try again.');
      },
      complete: () => {
        this.isLoading.set(false);
        this.notificationService.showSuccess('Manager deleted successfully');

        this.managers.update(managers => managers.filter(manager => manager.id !== managerId));
        this.managersLength.set(this.managers().length);
        this.headingSublabel = this.managersLength().toString();
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
