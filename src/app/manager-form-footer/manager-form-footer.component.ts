import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReusableButtonComponent } from '../reusable-button/reusable-button.component';
import { ButtonType } from '../../shared/constants/app-constants';

@Component({
  selector: 'app-manager-form-footer',
  imports: [CommonModule, ReusableButtonComponent],
  templateUrl: './manager-form-footer.component.html',
  styleUrl: './manager-form-footer.component.scss'
})
export class ManagerFormFooterComponent {
  ButtonType = ButtonType;

  @Input() cancelButtonText!: string;
  @Input() confirmButtonText!: string;
  @Input() isLoading: boolean = false;

  @Output() cancelEmitter = new EventEmitter<void>();
  @Output() confirmEmitter = new EventEmitter<void>();

  cancel() {
    if (!this.isLoading) {
      this.cancelEmitter.emit();
    }
  }

  confirm() {
    if (!this.isLoading) {
      this.confirmEmitter.emit();
    }
  }
}
