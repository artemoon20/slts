import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  signal,
  computed,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsService } from '../../services/clients.service';
import { ClientFormComponent } from '../client-form/client-form.component';
import { ResponseModel } from '../../shared/types';
import { LoaderComponent } from '../../shared/components/loader';
import ClientModel from '../../models/user-model';
import { NotificationService } from '../../services/notification.service';
import { ClientFormModel } from '../../models/client-form.model';

@Component({
  selector: 'app-edit-client',
  imports: [CommonModule, ClientFormComponent, LoaderComponent],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss'
})
export class EditClientComponent implements OnInit {
  formHeaderTitle: string = 'Edit Client';

  @Input() userId!: string;
  @Output() closeModalEmitter = new EventEmitter<void>();

  clientsService = inject(ClientsService);
  notificationService = inject(NotificationService);

  userData = signal<ResponseModel<ClientModel> | undefined>(undefined);
  isLoading = signal(false);

  user = computed(() => this.userData()?.data);

  ngOnInit() {
    this.loadUser();
  }

  private loadUser() {
    if (!this.userId) return;

    this.isLoading.set(true);
    this.clientsService.fetchClientById(this.userId).subscribe({
      next: res => {
        this.userData.set(res);
        this.isLoading.set(false);
      },
      error: error => {
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
    }

    this.isLoading.set(true);

    // The service now handles transformation automatically
    this.clientsService.updateClient(this.user()!.id, changedValues).subscribe({
      next: res => {
        this.notificationService.showSuccess('Client updated successfully.');
        this.userData.set(res);
        this.closeModal();
      },
      error: _error => {
        this.notificationService.showError('Failed to update client. Please try again.');
        this.isLoading.set(false);
      }
    });
  }
}
