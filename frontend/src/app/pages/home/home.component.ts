import { Component, Injector } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BaseOverlayControllerComponent } from '../../overlays/base-overlay-controller/base-overlay-controller';
import { ChoisirCommandeComponent } from '../../overlays/choisir-commande/choisir-commande.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbar, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends BaseOverlayControllerComponent{

  constructor(
    private injector: Injector,
    private parentOverlay: Overlay
  ) {
    super(parentOverlay);
  }

  protected override get componentPortal(): ComponentPortal<any> {
    return new ComponentPortal(ChoisirCommandeComponent, null, this.createInjector());
  }

  private createInjector() {
    return Injector.create({
      parent: this.injector,
      providers: [
        { provide: OverlayRef, useValue: this.overlayRef }
      ]
    });
  }
  
}
