import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render spinner variant by default', () => {
    expect(component.variant).toBe('spinner');
  });

  it('should render medium size by default', () => {
    expect(component.size).toBe('medium');
  });

  it('should render primary color by default', () => {
    expect(component.color).toBe('primary');
  });
});
