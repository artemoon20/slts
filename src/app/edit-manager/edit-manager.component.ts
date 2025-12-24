import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  signal,
  computed,
  Signal,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagersService } from '../../services/managers.service';
import { ManagerFormComponent } from '../manager-form/manager-form.component';
import { ResponseModel } from '../../shared/types';
import { LoaderComponent } from '../../shared/components/loader';
import { ManagerModel } from '../../models/user-model';
import { NotificationService } from '../../services/notification.service';
import { ManagerFormModel } from '../../models/manager-form.model';

@Component({
  selector: 'app-edit-manager',
  imports: [CommonModule, ManagerFormComponent, LoaderComponent],
  templateUrl: './edit-manager.component.html',
  styleUrl: './edit-manager.component.scss'
})
export class EditManagerComponent implements OnInit {
  formHeaderTitle: string = 'Edit Manager';

  @Input() managerId!: string;
  @Output() closeModalEmitter = new EventEmitter<void>();

  managersService = inject(ManagersService);
  notificationService = inject(NotificationService);

  managerData = signal<ResponseModel<ManagerModel> | undefined>(undefined);
  isLoading = signal(false);

  manager = computed(() => this.managerData()?.data);

  ngOnInit() {
    this.loadManager();
  }

  private loadManager() {
    if (!this.managerId) return;

    this.isLoading.set(true);
    this.managersService.fetchManagerById(this.managerId).subscribe({
      next: res => {
        this.managerData.set(res);
        this.isLoading.set(false);
      },
      error: _error => {
        this.notificationService.showError('Failed to get manager. Please try again.');
        this.isLoading.set(false);
      }
    });
  }

  closeModal() {
    this.closeModalEmitter.emit();
  }

  updateManager(changedValues: Partial<ManagerFormModel>) {
    if (!this.manager()) {
      return;
    }

    this.isLoading.set(true);

    // The service now handles transformation automatically
    this.managersService.updateManager(this.manager()!.id, changedValues).subscribe({
      next: res => {
        this.notificationService.showSuccess('Manager updated successfully.');
        this.managerData.set(res);
        this.closeModal();
      },
      error: _error => {
        this.notificationService.showError('Failed to update manager. Please try again.');
        this.isLoading.set(false);
      }
    });
  }
}
