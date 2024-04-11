import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseItemComponent } from './base-item.component';

describe('BaseItemComponent', () => {
  let component: BaseItemComponent;
  let fixture: ComponentFixture<BaseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
