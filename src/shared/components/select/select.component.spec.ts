import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { SelectComponent, SelectOption } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  const mockOptions: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    component.options = mockOptions;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display placeholder when no value is selected', () => {
    component.placeholder = 'Choose option';
    component.selectedValue = null;
    fixture.detectChanges();
    
    expect(component.getSelectedLabel()).toBe('Choose option');
  });

  it('should display selected option label', () => {
    component.selectedValue = 'option1';
    fixture.detectChanges();
    
    expect(component.getSelectedLabel()).toBe('Option 1');
  });

  it('should toggle dropdown on click', () => {
    expect(component.isOpen).toBeFalse();
    
    component.toggleDropdown();
    expect(component.isOpen).toBeTrue();
    
    component.toggleDropdown();
    expect(component.isOpen).toBeFalse();
  });

  it('should select option and close dropdown', () => {
    spyOn(component.selectionChange, 'emit');
    
    component.toggleDropdown();
    component.selectOption(mockOptions[0]);
    
    expect(component.selectedValue).toBe('option1');
    expect(component.isOpen).toBeFalse();
    expect(component.selectionChange.emit).toHaveBeenCalledWith('option1');
  });

  it('should not select disabled option', () => {
    const disabledOption = mockOptions[2];
    component.toggleDropdown();
    component.selectOption(disabledOption);
    
    expect(component.selectedValue).toBeNull();
  });

  it('should implement ControlValueAccessor', () => {
    const mockOnChange = jasmine.createSpy('onChange');
    const mockOnTouched = jasmine.createSpy('onTouched');
    
    component.registerOnChange(mockOnChange);
    component.registerOnTouched(mockOnTouched);
    
    component.selectOption(mockOptions[0]);
    
    expect(mockOnChange).toHaveBeenCalledWith('option1');
    expect(mockOnTouched).toHaveBeenCalled();
  });

  it('should write value', () => {
    component.writeValue('option2');
    expect(component.selectedValue).toBe('option2');
  });

  it('should set disabled state', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBeTrue();
  });
});
