import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavlinComponent } from './navlin.component';

describe('NavlinComponent', () => {
  let component: NavlinComponent;
  let fixture: ComponentFixture<NavlinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavlinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavlinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
