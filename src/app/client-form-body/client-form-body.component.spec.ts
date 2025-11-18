import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFormBodyComponent } from './client-form-body.component';

describe('ClientFormBodyComponent', () => {
  let component: ClientFormBodyComponent;
  let fixture: ComponentFixture<ClientFormBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientFormBodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientFormBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
