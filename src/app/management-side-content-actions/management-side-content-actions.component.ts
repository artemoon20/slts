import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReusableButtonComponent } from '../reusable-button/reusable-button.component';
import { ButtonType } from '../../shared/constants/app-constants';

@Component({
  selector: 'app-management-side-content-actions',
  imports: [CommonModule, ReusableButtonComponent],
  templateUrl: './management-side-content-actions.component.html',
  styleUrl: './management-side-content-actions.component.scss'
})
export class ManagementSideContentActionsComponent {
  @Input() headingLabel!: string;
  @Input() headingSublabel!: string;
  
  @Input() isSearchVisible: boolean = false;
  @Input() isFilterVisible: boolean = false;
  @Input() isMainActionVisible: boolean = false;
  @Input() isAdditionalActionVisible: boolean = false;
  @Input() buttonTypes!: typeof ButtonType;

  @Input() mainActionButtonName!: string;
  @Input() mainActionButtonLabel!: string;

  @Input() additionalActionButtonName!: string;
  @Input() additionalActionButtonLabel!: string;

  @Output() additionalActionClickEmitter = new EventEmitter<void>();
  @Output() mainActionClickEmitter = new EventEmitter<void>();

  onAdditionalActionClick() {
    this.additionalActionClickEmitter.emit();
  }

  onMainActionClick() {
    this.mainActionClickEmitter.emit();
  }
}
