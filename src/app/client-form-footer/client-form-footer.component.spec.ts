import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFormFooterComponent } from './client-form-footer.component';

describe('ClientFormFooterComponent', () => {
  let component: ClientFormFooterComponent;
  let fixture: ComponentFixture<ClientFormFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientFormFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientFormFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
