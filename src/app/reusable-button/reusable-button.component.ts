import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonType } from '../../shared/constants/app-constants';

@Component({
  selector: 'app-reusable-button',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './reusable-button.component.html',
  styleUrl: './reusable-button.component.scss'
})
export class ReusableButtonComponent implements OnInit {
  @Input() buttonName!: string;
  @Input() label!: string;
  @Input() icon!: IconDefinition;
  @Input() buttonType!: string;
  @Input() type!: string;
  @Input() isDisabled: boolean = false;

  @Output() onButtonClickEmitter = new EventEmitter<void>();

  constructor() {
    // Инициализация библиотеки иконок будет происходить в ngOnInit
  }

  ngOnInit() {
    if (this.icon) {
      library.add(this.icon);
    }
  }

  get isIconVisible() {
    return !!this.icon;
  }

  get buttonTypeClass() {
    if (!this.buttonType || (this.buttonType !== ButtonType.PRIMARY && this.buttonType !== ButtonType.SECONDARY)) {
      return '';
    }

    return this.buttonType === ButtonType.PRIMARY ? 'reusable-button--primary' : 'reusable-button--secondary';
  }

  onButtonClick() {
    this.onButtonClickEmitter.emit();
  }
}
