import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierMenuComponent } from './modifier-menu.component';

describe('ModifierMenuComponent', () => {
  let component: ModifierMenuComponent;
  let fixture: ComponentFixture<ModifierMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifierMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
