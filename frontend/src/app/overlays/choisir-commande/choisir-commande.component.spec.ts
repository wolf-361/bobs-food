import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoisirCommandeComponent } from './choisir-commande.component';

describe('ChoisirCommandeComponent', () => {
  let component: ChoisirCommandeComponent;
  let fixture: ComponentFixture<ChoisirCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoisirCommandeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChoisirCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
