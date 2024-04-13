import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleItemComponent } from './toggle-item.component';

describe('ToggleItemComponent', () => {
  let component: ToggleItemComponent;
  let fixture: ComponentFixture<ToggleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToggleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
