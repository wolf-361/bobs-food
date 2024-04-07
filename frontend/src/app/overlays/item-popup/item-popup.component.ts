import { Component, EventEmitter, Host, HostListener, Inject, Input, Output } from '@angular/core';
import { BaseOverlayComponent } from '../base-overlay/base-overlay.component';
import { Item } from '../../dto/item/item';
import { OverlayRef } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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

  constructor(
    private overlayRef: OverlayRef,
    item: Item
  ) {
    this.item = item;
   }
}
