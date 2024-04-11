import { Component, EventEmitter, HostListener, InjectionToken, Injector, Input, Output, ViewChild } from '@angular/core';
import { Item } from '../../dto/item/item';
import { BehaviorSubject } from 'rxjs';
import { BaseOverlayController } from '../../overlays/base-overlay-controller/base-overlay-controller';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { BaseOverlayComponent } from '../../overlays/base-overlay/base-overlay.component';
import { ItemPopupComponent } from '../../overlays/item-popup/item-popup.component';
import { CommandeService } from '../../services/commande/commande.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BaseItemComponent } from './base-item/base-item.component';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    BaseItemComponent
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent extends BaseOverlayController {
  @ViewChild(BaseOverlayComponent) overlayComponent!: BaseOverlayComponent;
  @Input({ required: true }) item!: Item;
  private mouseOver: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isMouseOver: boolean = false;
  isDansCommande: boolean = false; // Permet d'afficher l'option de suppression du panier

  @HostListener('mouseenter')
  onMouseEnter() {
    this.mouseOver.next(true);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.mouseOver.next(false);
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    // Check if the click is on .mat-mdc-button-touch-target
    if ((event.target as HTMLElement).classList.contains('mat-mdc-button-touch-target')) {
      return;
    }

    this.open();
  }

  constructor(
    private injector: Injector,
    private parentOverlay: Overlay,
    private commande: CommandeService
  ) {
    super(parentOverlay);
    // Check if the mouse is over the item
    this.mouseOver.subscribe((isMouseOver: boolean) => this.isMouseOver = isMouseOver);

    // Check if the item is in the cart
    this.commande.Items.subscribe(items => {
      this.isDansCommande = items.findIndex(i => i.item.id === this.item.id) !== -1;
    });
  }

  addToCart() {
    this.commande.addItem(this.item);
  }

  removeFromCart() {
    this.commande.removeItem(this.item);
  }

  protected override get componentPortal(): ComponentPortal<any> {
    return new ComponentPortal(ItemPopupComponent, null, this.createInjector());
  }

  private createInjector() {
    return Injector.create({
      parent: this.injector,
      providers: [
        { provide: OverlayRef, useValue: this.overlayRef },
        { provide: Item, useValue: this.item }
      ]
    });
  }
}
