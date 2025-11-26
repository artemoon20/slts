import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { ClientFormComponent } from '../client-form/client-form.component';
import { ClientsService } from '../../services/clients.service';
import { CreateClientRequest, ClientFormModel } from '../../models/client-form.model';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-add-client',
  imports: [CommonModule, ClientFormComponent],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss'
})
export class AddClientComponent {
  formHeaderTitle: string = 'Add Client';
  formHeaderSubtitle: string = 'Add a new client to your system';
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

  async createClient(formData: Partial<ClientFormModel>) {
    this.isLoading = true;

    const clientData: CreateClientRequest = {
      first_name: formData.firstName!,
      last_name: formData.lastName || null,
      birth_date: formData.birthDate ? new Date(formData.birthDate) : null,
      email: formData.email!,
      role: formData.role!,
      phone: formData.phone || null,
      gender: formData.gender || null,
      country: formData.country || null,
      city: formData.city || null,
      zip: formData.zip || null,
      address: formData.address || null,
      state: formData.state || null,
      card_number: formData.cardNumber || null,
      expiry_date: formData.expiryDate || null,
      currency: formData.currency || null,
      company_name: formData.companyName || null,
      department: formData.department || null,
      position: formData.position || null,
    };

    this.clientsService.createClient(clientData).subscribe({
      next: (res) => {},
      error: (error) => {
        this.isLoading = false;
        this.notificationService.showError('Failed to fetch clients. Please try again.');
      },
      complete: () => {
        this.isLoading = false;
        this.notificationService.showSuccess('Client created successfully');
        this.onClientCreated.emit();
        this.closeModal();
      }
    });
  }

}
