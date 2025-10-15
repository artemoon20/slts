import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFormHeaderComponent } from './client-form-header.component';

describe('ClientFormHeaderComponent', () => {
  let component: ClientFormHeaderComponent;
  let fixture: ComponentFixture<ClientFormHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientFormHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientFormHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
