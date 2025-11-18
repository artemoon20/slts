import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ClientFormHeaderComponent } from '../client-form-header/client-form-header.component';
import { ClientFormFooterComponent } from '../client-form-footer/client-form-footer.component';
import { ClientFormBodyComponent } from '../client-form-body/client-form-body.component';
import { USER_ROLES } from '../../shared/constants/app-constants';
import UserModel from '../../models/user-model';
import { ClientFormModel } from '../../models/client-form.model';

@Component({
  selector: 'app-client-form',
  imports: [CommonModule, ClientFormHeaderComponent, ClientFormFooterComponent, ClientFormBodyComponent, ReactiveFormsModule],
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
      // client info
      firstName: ['', Validators.required],
      lastName: [''],
      birthDate: [''],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
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
      // company info
      companyName: [''],
      department: [''],
      position: [''],
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
    if (!this.userData) return;
    
    const userData = this.userData();

    const formData = {
      // Basic client info
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      gender: userData?.gender || '',
      role: userData!.role,
      birthDate: this.formatDate(userData?.birthDate || null),
      
      // Address info
      country: userData?.addressInfo?.country || '',
      city: userData?.addressInfo?.city || '',
      zip: userData?.addressInfo?.zip || '',
      address: userData?.addressInfo?.address || '',
      state: userData?.addressInfo?.state || '',
      
      // Bank info
      cardNumber: userData?.bankInfo?.cardNumber || '',
      expiryDate: userData?.bankInfo?.expiryDate || '',
      currency: userData?.bankInfo?.currency || '',
      
      // Company info
      companyName: userData?.companyInfo?.companyName || '',
      department: userData?.companyInfo?.department || '',
      position: userData?.companyInfo?.position || '',
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
        birthDate: '',
        email: '',
        role: '',
        phone: '',
        gender: '',
        country: '',
        city: '',
        zip: '',
        address: '',
        state: '',
        cardNumber: '',
        expiryDate: '',
        currency: '',
        companyName: '',
        department: '',
        position: '',
      };
    }
    
    const userData = this.userData();
    return {
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      gender: userData?.gender || '',
      role: userData?.role,
      birthDate: this.formatDate(userData?.birthDate || null),
      country: userData?.addressInfo?.country || '',
      city: userData?.addressInfo?.city || '',
      zip: userData?.addressInfo?.zip || '',
      address: userData?.addressInfo?.address || '',
      state: userData?.addressInfo?.state || '',
      cardNumber: userData?.bankInfo?.cardNumber || '',
      expiryDate: userData?.bankInfo?.expiryDate || '',
      currency: userData?.bankInfo?.currency || '',
      companyName: userData?.companyInfo?.companyName || '',
      department: userData?.companyInfo?.department || '',
      position: userData?.companyInfo?.position || '',
    };
  }
}
