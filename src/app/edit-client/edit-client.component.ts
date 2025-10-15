import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersService } from '../../services/users.service';

import { ClientFormComponent } from '../client-form/client-form.component';
import { ResponseModel } from '../../shared/types';
import UserModel from '../../models/user-model';

@Component({
  selector: 'app-edit-client',
  imports: [CommonModule, ClientFormComponent],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss'
})
export class EditClientComponent {
  formHeaderTitle: string = 'Edit Client';

  @Input() userId!: string;

  usersService = inject(UsersService);

  @Output() closeModalEmitter = new EventEmitter<void>();

  user: UserModel | undefined = undefined;

  getUser() {
    this.usersService.getUserById(this.userId).subscribe((res: ResponseModel<UserModel>) => {
      const { data } = res;

      if (data) {
        this.user = data;
      }
    });
  }

  ngOnInit() {
    this.getUser();
  }

  closeModal() {
    this.closeModalEmitter.emit();
  }
}
