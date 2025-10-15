import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ClientFormHeaderComponent } from '../client-form-header/client-form-header.component';
import { ClientFormFooterComponent } from '../client-form-footer/client-form-footer.component';
import { ClientFormBodyComponent } from '../client-form-body/client-form-body.component';
import { USER_ROLES } from '../../shared/constants/app-constants';

@Component({
  selector: 'app-client-form',
  imports: [CommonModule, ClientFormHeaderComponent, ClientFormFooterComponent, ClientFormBodyComponent, ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {
  @Input() formHeaderTitle!: string;
  @Input() formHeaderSubtitle!: string;
  @Input() cancelButtonText!: string;
  @Input() confirmButtonText!: string;
  @Input() isLoading: boolean = false;

  @Output() closeModalEmitter = new EventEmitter<void>();
  @Output() onClientFormSubmit = new EventEmitter<FormGroup>();

  clientForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      // client info
      firstName: ['', Validators.required],
      lastName: [''],
      birthDate: [''],
      email: ['', [Validators.required, Validators.email]],
      role: [USER_ROLES.CLIENT, Validators.required],
      phone: [''],
      gender: [''],
      // address info
      country: [''],
      city: [''],
      zip: [''],
      address: [''],
      state: [''],
      // bank info
      cardNumber: [''],
      expiryDate: [''],
      currency: [''],
      iban: [''],
      // company info
      companyName: [''],
      department: [''],
      position: [''],
    });
  }

  closeModal() {
    this.closeModalEmitter.emit();
  }

  onSubmit() {
    this.onClientFormSubmit.emit(this.clientForm);
  }
}
