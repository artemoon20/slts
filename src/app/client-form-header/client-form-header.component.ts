import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-client-form-header',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './client-form-header.component.html',
  styleUrl: './client-form-header.component.scss'
})
export class ClientFormHeaderComponent {
  constructor() {
    library.add(faTimes);
  }

  faTimes = faTimes;

  @Input() title!: string;
  @Input() subtitle!: string;

  @Output() closeModalEmitter = new EventEmitter<void>();

  closeModal() {
    this.closeModalEmitter.emit();
  }
}
