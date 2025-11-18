import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { SelectComponent } from '../../shared/components/select';
import { genderOptions, roleOptions } from '../../shared/constants/app-constants';

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
  roleOptions = roleOptions;
}
