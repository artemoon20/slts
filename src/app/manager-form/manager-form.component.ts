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

import { ManagerFormHeaderComponent } from '../manager-form-header/manager-form-header.component';
import { ManagerFormFooterComponent } from '../manager-form-footer/manager-form-footer.component';
import { ManagerFormBodyComponent } from '../manager-form-body/manager-form-body.component';
import { ROLES_IDS } from '../../shared/constants/app-constants';

import { ManagerModel } from '../../models/user-model';
import { ManagerFormModel } from '../../models/manager-form.model';

@Component({
  selector: 'app-manager-form',
  imports: [
    CommonModule,
    ManagerFormHeaderComponent,
    ManagerFormFooterComponent,
    ManagerFormBodyComponent,
    ReactiveFormsModule
  ],
  templateUrl: './manager-form.component.html',
  styleUrl: './manager-form.component.scss'
})
export class ManagerFormComponent implements OnChanges {
  @Input() formHeaderTitle!: string;
  @Input() formHeaderSubtitle!: string;
  @Input() cancelButtonText!: string;
  @Input() confirmButtonText!: string;
  @Input() isLoading: boolean = false;
  @Input() managerData: Signal<ManagerModel | undefined> | undefined = undefined;

  @Output() closeModalEmitter = new EventEmitter<void>();
  @Output() onManagerFormSubmit = new EventEmitter<Partial<ManagerFormModel>>();

  managerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.managerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', Validators.maxLength(50)],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
      roleId: [ROLES_IDS.ORGANIZATION_MANAGER, Validators.required],
      status: ['active', Validators.required]
    });
  }

  closeModal() {
    this.closeModalEmitter.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['managerData'] && this.managerData) {
      this.populateForm();
    }
  }

  populateForm() {
    if (!this.managerData) {
      return;
    }

    const managerData = this.managerData();

    const formData = {
      firstName: managerData?.firstName || '',
      lastName: managerData?.lastName || '',
      email: managerData?.email || '',
      roleId: managerData?.roleId || 2,
      status: managerData?.status || 'active'
    };

    this.managerForm.patchValue(formData);
  }

  onSubmit() {
    // For new managers, validate required fields
    if (!this.managerData && this.managerForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    // Get only the changed values
    const changedValues = this.getChangedValues();

    this.onManagerFormSubmit.emit(changedValues);
  }

  private markFormGroupTouched() {
    Object.keys(this.managerForm.controls).forEach(key => {
      const control = this.managerForm.get(key);
      control?.markAsTouched();
    });
  }

  private getChangedValues(): Partial<ManagerFormModel> {
    const currentValues = this.managerForm.value;
    const originalValues = this.getOriginalFormValues();

    const changedValues: Partial<ManagerFormModel> = {};

    // Compare each field and only include changed ones
    Object.keys(currentValues).forEach(key => {
      if (currentValues[key] !== originalValues[key]) {
        changedValues[key as keyof ManagerFormModel] = currentValues[key];
      }
    });

    return changedValues;
  }

  private getOriginalFormValues(): any {
    if (!this.managerData) {
      // For new managers, return empty values
      return {
        firstName: '',
        lastName: '',
        email: '',
        roleId: 2,
        status: 'active'
      };
    }

    const managerData = this.managerData();

    return {
      firstName: managerData?.firstName || '',
      lastName: managerData?.lastName || '',
      email: managerData?.email || '',
      roleId: managerData?.roleId || 2,
      status: managerData?.status || 'active'
    };
  }
}
