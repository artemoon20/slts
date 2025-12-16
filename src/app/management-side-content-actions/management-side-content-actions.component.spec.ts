import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementSideContentActionsComponent } from './management-side-content-actions.component';

describe('ManagementSideContentActionsComponent', () => {
  let component: ManagementSideContentActionsComponent;
  let fixture: ComponentFixture<ManagementSideContentActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementSideContentActionsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagementSideContentActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
