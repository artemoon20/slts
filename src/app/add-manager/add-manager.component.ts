import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerFormComponent } from '../manager-form/manager-form.component';
import { ManagersService } from '../../services/managers.service';
import { ManagerFormModel } from '../../models/manager-form.model';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-add-manager',
  imports: [CommonModule, ManagerFormComponent],
  templateUrl: './add-manager.component.html',
  styleUrl: './add-manager.component.scss'
})
export class AddManagerComponent {
  formHeaderTitle: string = 'Add Manager';
  isLoading: boolean = false;

  @Output() closeModalEmitter = new EventEmitter<void>();
  @Output() onManagerCreated = new EventEmitter<void>();

  constructor(
    private managersService: ManagersService,
    private notificationService: NotificationService
  ) {}

  closeModal() {
    this.closeModalEmitter.emit();
  }

  createManager(formData: Partial<ManagerFormModel>) {
    this.isLoading = true;

    // The service now handles transformation automatically
    this.managersService.createManager(formData).subscribe({
      next: _res => {
        this.isLoading = false;
        this.notificationService.showSuccess('Manager created successfully');
        this.onManagerCreated.emit();
        this.closeModal();
      },
      error: _error => {
        this.isLoading = false;
        this.notificationService.showError('Failed to create manager. Please try again.');
      }
    });
  }
}
