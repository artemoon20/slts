import { Component, Input, Output, EventEmitter, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsService } from '../../services/clients.service';
import { ClientFormComponent } from '../client-form/client-form.component';
import { ResponseModel } from '../../shared/types';
import { LoaderComponent } from '../../shared/components/loader';
import UserModel from '../../models/user-model';
import { NotificationService } from '../../services/notification.service';
import { CreateClientRequest, ClientFormModel } from '../../models/client-form.model';

@Component({
  selector: 'app-edit-client',
  imports: [CommonModule, ClientFormComponent, LoaderComponent],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss'
})
export class EditClientComponent {
  formHeaderTitle: string = 'Edit Client';

  @Input() userId!: string;
  @Output() closeModalEmitter = new EventEmitter<void>();

  clientsService = inject(ClientsService);
  notificationService = inject(NotificationService);

  userData = signal<ResponseModel<UserModel> | undefined>(undefined);
  isLoading = signal(false);

  user = computed(() => this.userData()?.data);

  ngOnInit() {
    this.loadUser();
  }

  private loadUser() {
    if (!this.userId) return;
    
    this.isLoading.set(true);
    this.clientsService.fetchClientById(this.userId).subscribe({
      next: (res) => {
        this.userData.set(res);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.notificationService.showError('Failed to get user. Please try again.');
        this.isLoading.set(false);
      }
    });
  }

  closeModal() {
    this.closeModalEmitter.emit();
  }

  updateUser(changedValues: Partial<ClientFormModel>) {
    if (!this.user()) {
      return;
    };

    // Only send the changed values
    const clientData: Partial<CreateClientRequest> = {};

    // Map only the changed values to the API format
    if (changedValues.firstName !== undefined) clientData.first_name = changedValues.firstName;
    if (changedValues.lastName !== undefined) clientData.last_name = changedValues.lastName || null;
    if (changedValues.birthDate !== undefined) clientData.birth_date = changedValues.birthDate ? new Date(changedValues.birthDate) : null;
    if (changedValues.email !== undefined) clientData.email = changedValues.email;
    if (changedValues.role !== undefined) clientData.role = changedValues.role;
    if (changedValues.phone !== undefined) clientData.phone = changedValues.phone || null;
    if (changedValues.gender !== undefined) clientData.gender = changedValues.gender || null;
    
    // Address fields
    if (changedValues.country !== undefined) clientData.country = changedValues.country || null;
    if (changedValues.city !== undefined) clientData.city = changedValues.city || null;
    if (changedValues.zip !== undefined) clientData.zip = changedValues.zip || null;
    if (changedValues.address !== undefined) clientData.address = changedValues.address || null;
    if (changedValues.state !== undefined) clientData.state = changedValues.state || null;
    
    // Bank fields
    if (changedValues.cardNumber !== undefined) clientData.card_number = changedValues.cardNumber || null;
    if (changedValues.expiryDate !== undefined) clientData.expiry_date = changedValues.expiryDate || null;
    if (changedValues.currency !== undefined) clientData.currency = changedValues.currency || null;
    
    // Company fields
    if (changedValues.companyName !== undefined) clientData.company_name = changedValues.companyName || null;
    if (changedValues.department !== undefined) clientData.department = changedValues.department || null;
    if (changedValues.position !== undefined) clientData.position = changedValues.position || null;

    this.isLoading.set(true);

    this.clientsService.updateClient(this.user()!.id, clientData as CreateClientRequest).subscribe({
      next: (res) => {
        this.notificationService.showSuccess('User updated successfully.');

        this.userData.set(res);
        this.closeModal();
      },
      error: (error) => {
        this.notificationService.showError('Failed to update user. Please try again.');

        this.isLoading.set(false);
        this.notificationService.showError(error.message);
      }
    });
  }
}
