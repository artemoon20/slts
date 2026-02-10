import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { SelectComponent } from '../../shared/components/select';
import {
  genderOptions,
  statusOptions,
  sourceOptions,
  priorityOptions
} from '../../shared/constants/app-constants';

@Component({
  selector: 'app-client-form-body',
  imports: [CommonModule, ReactiveFormsModule, SelectComponent],
  templateUrl: './client-form-body.component.html',
  styleUrl: './client-form-body.component.scss'
})
export class ClientFormBodyComponent {
  @Input() clientForm!: FormGroup;
  @Output() formSubmit = new EventEmitter<void>();

  onSubmit() {
    this.formSubmit.emit();
  }

  genderOptions = genderOptions;
  statusOptions = statusOptions;
  sourceOptions = sourceOptions;
  priorityOptions = priorityOptions;

  // Placeholder for managers - will be populated from API
  managerOptions = [
    { value: '1', label: 'John Smith' },
    { value: '2', label: 'Jane Doe' },
    { value: '3', label: 'Mike Johnson' }
  ];
}
