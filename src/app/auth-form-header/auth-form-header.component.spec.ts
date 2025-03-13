import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormHeaderComponent } from './auth-form-header.component';

describe('AuthFormHeaderComponent', () => {
  let component: AuthFormHeaderComponent;
  let fixture: ComponentFixture<AuthFormHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFormHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthFormHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
