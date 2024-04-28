import { Component, EventEmitter, HostListener, InjectionToken, Injector, Input, Output, ViewChild } from '@angular/core';
import { Item } from '../../dto/item/item';
import { BehaviorSubject } from 'rxjs';
import { CommandeService } from '../../services/commande/commande.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BaseItemComponent } from './base-item/base-item.component';
import { MatDialog } from '@angular/material/dialog';
import { ItemPopupComponent } from '../../overlays/item-popup/item-popup.component';

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
export class ItemComponent {
  @Input({ required: true }) item!: Item;
  private mouseOver: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isMouseOver: boolean = false;
  isDansCommande: boolean = false; // Permet d'afficher l'option de suppression du panier
  isMobile: boolean = false;

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
    this.dialog.open(ItemPopupComponent, {
      autoFocus: false,
      data: { item: this.item }
    });

  }

  constructor(
    private dialog: MatDialog,
    private commande: CommandeService,
    private breakpointObserver: BreakpointObserver,
  ) {
    // Check if the mouse is over the item
    this.mouseOver.subscribe((isMouseOver: boolean) => this.isMouseOver = isMouseOver);

    // Check if the item is in the cart
    this.commande.Items.subscribe(items => {
      if (!this.item) {
        return;
      }
      this.isDansCommande = items.findIndex(i => i.item.id === this.item.id) !== -1;
    });

    // Listen to the screen size
    this.breakpointObserver.observe('(max-width: 600px)').subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  addToCart() {
    this.commande.addItem(this.item);
  }

  removeFromCart() {
    this.commande.removeItem(this.item);
  }
}
