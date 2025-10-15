import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDashboardNavigationComponent } from './sidebar-dashboard-navigation.component';

describe('SidebarDashboardNavigationComponent', () => {
  let component: SidebarDashboardNavigationComponent;
  let fixture: ComponentFixture<SidebarDashboardNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarDashboardNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarDashboardNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
