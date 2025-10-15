import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReusableButtonComponent } from '../reusable-button/reusable-button.component';
import { ButtonType } from '../../shared/constants/app-constants';

@Component({
  selector: 'app-client-form-footer',
  imports: [CommonModule, ReusableButtonComponent],
  templateUrl: './client-form-footer.component.html',
  styleUrl: './client-form-footer.component.scss'
})
export class ClientFormFooterComponent {
  ButtonType = ButtonType;

  @Input() cancelButtonText!: string;
  @Input() confirmButtonText!: string;
  @Input() isLoading: boolean = false;
  @Input() type!: string;
  
  @Output() closeModalEmitter = new EventEmitter<void>();
  @Output() submitFormEmitter = new EventEmitter<void>();

  closeModal() {
    if (!this.isLoading) {
      this.closeModalEmitter.emit();
    }
  }

  submitForm() {
    if (!this.isLoading) {
      this.submitFormEmitter.emit();
    }
  }
}
