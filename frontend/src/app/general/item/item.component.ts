import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Item } from '../../dto/item/item';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
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
    console.log('Item clicked');
  }

  constructor() {
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

}
