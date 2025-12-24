import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manager-form-body',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manager-form-body.component.html',
  styleUrl: './manager-form-body.component.scss'
})
export class ManagerFormBodyComponent {
  @Input() managerForm!: FormGroup;
  @Output() formSubmit = new EventEmitter<void>();

  onSubmit() {
    this.formSubmit.emit();
  }
}
