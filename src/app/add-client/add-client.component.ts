import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { ClientFormComponent } from '../client-form/client-form.component';
import { UsersService } from '../../services/users.service';
import { CreateClientRequest } from '../../models/client-form.model';
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

  constructor(
    private usersService: UsersService,
    private notificationService: NotificationService
  ) {}

  closeModal() {
    this.closeModalEmitter.emit();
  }

  async createClient(form: FormGroup) {
    if (form.invalid) {
      this.markFormGroupTouched(form);
      this.notificationService.showError('Please fill in all required fields');

      return;
    }

    this.isLoading = true;

    try {
      const formValue = form.value;

      const clientData: CreateClientRequest = {
        first_name: formValue.firstName,
        last_name: formValue.lastName || null,
        birth_date: formValue.birthDate ? new Date(formValue.birthDate) : null,
        email: formValue.email,
        role: formValue.role,
        phone: formValue.phone || null,
        gender: formValue.gender || null,
        country: formValue.country || null,
        city: formValue.city || null,
        zip: formValue.zip || null,
        address: formValue.address || null,
        state: formValue.state || null,
        card_number: formValue.cardNumber || null,
        expiry_date: formValue.expiryDate || null,
        currency: formValue.currency || null,
        iban: formValue.iban || null,
        company_name: formValue.companyName || null,
        department: formValue.department || null,
        position: formValue.position || null,
      };

      await this.usersService.createClient(clientData).toPromise();
      
      this.notificationService.showSuccess('Client created successfully');

      this.closeModal();
    } catch (error) {
      console.error('Error creating client:', error);
      
      this.notificationService.showError('Failed to create client. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);

      control?.markAsTouched();
    });
  }
}
