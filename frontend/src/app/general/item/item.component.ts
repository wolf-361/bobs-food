import { Component, EventEmitter, HostListener, InjectionToken, Injector, Input, Output, ViewChild } from '@angular/core';
import { Item } from '../../dto/item/item';
import { BehaviorSubject } from 'rxjs';
import { BaseOverlayController } from '../../overlays/base-overlay-controller/base-overlay-controller';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { BaseOverlayComponent } from '../../overlays/base-overlay/base-overlay.component';
import { ItemPopupComponent } from '../../overlays/item-popup/item-popup.component';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent extends BaseOverlayController {
  @ViewChild(BaseOverlayComponent) overlayComponent!: BaseOverlayComponent;
  @Input({ required: true }) item!: Item;
  mouseOver: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isDansCommande: boolean = false; // Permet d'afficher l'option de suppression du panier

  @Output() // Permet d'ajouter un item au panier
  onAddToCart: EventEmitter<Item> = new EventEmitter<Item>();

  @Output() // Permet de supprimer un item du panier
  onRemoveFromCart: EventEmitter<Item> = new EventEmitter<Item>();

  @HostListener('mouseenter')
  onMouseEnter() {
    this.mouseOver.next(true);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.mouseOver.next(false);
  }

  @HostListener('click')
  onClick() {
    this.open();
  }

  constructor(
    private injector: Injector,
    private parentOverlay: Overlay,
  ) {
    super(parentOverlay);
    this.mouseOver.subscribe(this.onHover);
  }

  onHover(isHovered: boolean) {
    if (!isHovered) {
      return;
    }

    // TODO: Faire apparaitre l'options d'ajout au panier
    console.log('Item hovered');
  }

  addToCart() {
    this.onAddToCart.emit(this.item);
  }

  removeFromCart() {
    this.onRemoveFromCart.emit(this.item);
  }

  protected override get componentPortal(): ComponentPortal<any> {
    return new ComponentPortal(ItemPopupComponent, null, this.createInjector());
  }

  private createInjector() {
    const onAddToCart = new EventEmitter<Item>();
    const onRemoveFromCart = new EventEmitter<Item>();
    onAddToCart.subscribe(this.onAddToCart);
    onRemoveFromCart.subscribe(this.onRemoveFromCart);

    return Injector.create({
      parent: this.injector,
      providers: [
        { provide: OverlayRef, useValue: this.overlayRef },
        { provide: Item, useValue: this.item },
        { provide: 'onAddToCart', useValue: onAddToCart },
        { provide: 'onRemoveFromCart', useValue: onRemoveFromCart },
        { provide: 'test', useValue: 'test'}
      ]
    });
  }
}
