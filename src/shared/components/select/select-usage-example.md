# Select Component Usage Example

// Пример использования реюзабельного select компонента

// 1. В компоненте определите опции:
export class MyComponent {
  genderOptions: SelectOption[] = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  roleOptions: SelectOption[] = [
    { value: 'admin', label: 'Administrator' },
    { value: 'user', label: 'User' },
    { value: 'guest', label: 'Guest', disabled: true }
  ];

  currencyOptions: SelectOption[] = [
    { value: 'USD', label: 'US Dollar' },
    { value: 'EUR', label: 'Euro' },
    { value: 'GBP', label: 'British Pound' }
  ];
}

// 2. В HTML шаблоне используйте компонент:
/*
<form [formGroup]="myForm">
  <!-- Простое использование -->
  <app-select
    [options]="genderOptions"
    placeholder="Select gender"
    [formControlName]="'gender'">
  </app-select>

  <!-- С лейблом и валидацией -->
  <app-select
    [options]="roleOptions"
    placeholder="Choose role"
    label="Role"
    [required]="true"
    [error]="myForm.get('role')?.touched && myForm.get('role')?.errors?.['required']"
    [formControlName]="'role'">
  </app-select>

  <!-- С обработкой события изменения -->
  <app-select
    [options]="currencyOptions"
    placeholder="Select currency"
    label="Currency"
    (selectionChange)="onCurrencyChange($event)"
    [formControlName]="'currency'">
  </app-select>

  <!-- Отключенный select -->
  <app-select
    [options]="roleOptions"
    placeholder="Disabled select"
    label="Disabled Field"
    [disabled]="true"
    [formControlName]="'disabledField'">
  </app-select>
</form>
*/

// 3. В TypeScript компоненте обрабатывайте события:
/*
export class MyComponent {
  onCurrencyChange(selectedCurrency: string) {
    console.log('Selected currency:', selectedCurrency);
    // Дополнительная логика при изменении валюты
  }
}
*/
