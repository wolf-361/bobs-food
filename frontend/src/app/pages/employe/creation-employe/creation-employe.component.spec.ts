import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationEmployeComponent } from './creation-employe.component';

describe('CreationEmployeComponent', () => {
  let component: CreationEmployeComponent;
  let fixture: ComponentFixture<CreationEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationEmployeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreationEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
