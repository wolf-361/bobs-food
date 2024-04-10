import { Component, EventEmitter, Host, HostListener, Inject, Input, Output } from '@angular/core';
import { BaseOverlayComponent } from '../base-overlay/base-overlay.component';
import { Item } from '../../dto/item/item';
import { OverlayRef } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommandeService } from '../../services/commande/commande.service';

@Component({
  selector: 'app-item-popup',
  standalone: true,
  imports: [
    BaseOverlayComponent,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './item-popup.component.html',
  styleUrl: './item-popup.component.scss'
})
export class ItemPopupComponent {
  item: Item;
  isDansCommande: boolean = false;

  constructor(
    private overlayRef: OverlayRef,
    item: Item,
    private command: CommandeService
  ) {
    this.item = item;
    this.command.Items.subscribe(items => {
      this.isDansCommande = items.some(i => i.item.id === this.item.id);
    });
   }

   addItem() {
     this.command.addItem(this.item);
   }

    removeItem() {
      this.command.removeItem(this.item);
    }
}
