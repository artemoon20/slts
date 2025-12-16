import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  Signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ClientFormHeaderComponent } from '../client-form-header/client-form-header.component';
import { ClientFormFooterComponent } from '../client-form-footer/client-form-footer.component';
import { ClientFormBodyComponent } from '../client-form-body/client-form-body.component';
import UserModel from '../../models/user-model';
import { ClientFormModel } from '../../models/client-form.model';

@Component({
  selector: 'app-client-form',
  imports: [
    CommonModule,
    ClientFormHeaderComponent,
    ClientFormFooterComponent,
    ClientFormBodyComponent,
    ReactiveFormsModule
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent implements OnChanges {
  @Input() formHeaderTitle!: string;
  @Input() formHeaderSubtitle!: string;
  @Input() cancelButtonText!: string;
  @Input() confirmButtonText!: string;
  @Input() isLoading: boolean = false;
  @Input() userData: Signal<UserModel | undefined> | undefined = undefined;

  @Output() closeModalEmitter = new EventEmitter<void>();
  @Output() onClientFormSubmit = new EventEmitter<Partial<ClientFormModel>>();

  clientForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', Validators.maxLength(50)],
      phone: ['', Validators.maxLength(30)],
      email: ['', [Validators.email, Validators.maxLength(120)]],
      birthday: [''],
      address: ['', Validators.maxLength(250)],
      status: ['active', Validators.required],
      gender: [''],
      source: [''],
      priority: ['medium', Validators.required],
      notes: [''],
      managerId: ['']
    });
  }

  closeModal() {
    this.closeModalEmitter.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userData'] && this.userData) {
      this.populateForm();
    }
  }

  populateForm() {
    if (!this.userData) {
      return;
    }

    const userData = this.userData();

    const formData = {
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      phone: userData?.phone || '',
      email: userData?.email || '',
      birthday: this.formatDate(userData?.birthDate || null),
      address: userData?.addressInfo?.address || '',
      status: userData?.status || 'active',
      gender: userData?.gender || '',
      source: '', // Will be populated from backend
      priority: 'medium', // Will be populated from backend
      notes: '',
      managerId: ''
    };

    this.clientForm.patchValue(formData);
  }

  private formatDate(date: Date | null): string {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  }

  onSubmit() {
    // For new clients, validate required fields
    if (!this.userData && this.clientForm.invalid) {
      this.markFormGroupTouched();

      return;
    }

    // Get only the changed values
    const changedValues = this.getChangedValues();

    this.onClientFormSubmit.emit(changedValues);
  }

  private markFormGroupTouched() {
    Object.keys(this.clientForm.controls).forEach(key => {
      const control = this.clientForm.get(key);
      control?.markAsTouched();
    });
  }

  private getChangedValues(): Partial<ClientFormModel> {
    const currentValues = this.clientForm.value;
    const originalValues = this.getOriginalFormValues();

    const changedValues: Partial<ClientFormModel> = {};

    // Compare each field and only include changed ones
    Object.keys(currentValues).forEach(key => {
      if (currentValues[key] !== originalValues[key]) {
        changedValues[key as keyof ClientFormModel] = currentValues[key];
      }
    });

    return changedValues;
  }

  private getOriginalFormValues(): any {
    if (!this.userData) {
      // For new clients, return empty values
      return {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        birthday: '',
        address: '',
        status: 'active',
        gender: '',
        source: '',
        priority: 'medium',
        notes: '',
        managerId: ''
      };
    }

    const userData = this.userData();

    return {
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      phone: userData?.phone || '',
      email: userData?.email || '',
      birthday: this.formatDate(userData?.birthDate || null),
      address: userData?.addressInfo?.address || '',
      status: userData?.status || 'active',
      gender: userData?.gender || '',
      source: '',
      priority: 'medium',
      notes: '',
      managerId: ''
    };
  }
}
