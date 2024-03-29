import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

export abstract class BaseOverlayControllerComponent {
  public overlayRef?: OverlayRef;
  
  constructor(
    private overlay: Overlay
  ) { 
  }

  /**
   * Create the overlay
   */
  private createOverlay() {
    const positionStrategy = this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically();
    
    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      panelClass: 'tm-file-preview-dialog-panel',
      scrollStrategy: this.overlay.scrollStrategies.block()
    });

    this.overlayRef.backdropClick().subscribe(() => this.close());

    this.overlayRef.attach(this.componentPortal);
  }

  open() {
    this.createOverlay();
  }

  close() {
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
  }

  protected abstract get componentPortal(): ComponentPortal<any>;
}
