import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientFormComponent } from '../client-form/client-form.component';
import { ClientsService } from '../../services/clients.service';
import { ClientFormModel } from '../../models/client-form.model';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-add-client',
  imports: [CommonModule, ClientFormComponent],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss'
})
export class AddClientComponent {
  formHeaderTitle: string = 'Add Client';
  isLoading: boolean = false;

  @Output() closeModalEmitter = new EventEmitter<void>();
  @Output() onClientCreated = new EventEmitter<void>();

  constructor(
    private clientsService: ClientsService,
    private notificationService: NotificationService
  ) {}

  closeModal() {
    this.closeModalEmitter.emit();
  }

  createClient(formData: Partial<ClientFormModel>) {
    this.isLoading = true;

    // The service now handles transformation automatically
    this.clientsService.createClient(formData).subscribe({
      next: _res => {
        this.isLoading = false;
        this.notificationService.showSuccess('Client created successfully');
        this.onClientCreated.emit();
        this.closeModal();
      },
      error: _error => {
        this.isLoading = false;
        this.notificationService.showError('Failed to create client. Please try again.');
      }
    });
  }
}
