import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmerSupressionComponent } from './confirmer-supression.component';

describe('ConfirmerSupressionComponent', () => {
  let component: ConfirmerSupressionComponent;
  let fixture: ComponentFixture<ConfirmerSupressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmerSupressionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmerSupressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
