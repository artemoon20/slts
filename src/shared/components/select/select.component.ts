import { Component, Input, Output, EventEmitter, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  @Input() placeholder: string = 'Select an option';
  @Input() disabled: boolean = false;
  @Input() error: boolean = false;
  @Input() required: boolean = false;
  @Input() label: string = '';

  @Output() selectionChange = new EventEmitter<any>();

  selectedValue: any = null;
  isOpen: boolean = false;

  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggleDropdown(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  }

  selectOption(option: SelectOption): void {
    if (!option.disabled) {
      this.selectedValue = option.value;
      this.isOpen = false;
      this.onChange(option.value);
      this.onTouched();
      this.selectionChange.emit(option.value);
    }
  }

  getSelectedLabel(): string {
    const selectedOption = this.options.find(option => option.value === this.selectedValue);
    return selectedOption ? selectedOption.label : this.placeholder;
  }

  closeDropdown(): void {
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const selectElement = target.closest('.select-container');

    if (!selectElement && this.isOpen) {
      this.closeDropdown();
    }
  }
}
