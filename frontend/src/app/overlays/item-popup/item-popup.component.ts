import { Component, EventEmitter, Host, HostListener, Inject, Input, Output } from '@angular/core';
import { Item } from '../../dto/item/item';
import { OverlayRef } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommandeService } from '../../services/commande/commande.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-item-popup',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './item-popup.component.html',
  styleUrl: './item-popup.component.scss'
})
export class ItemPopupComponent {
  item: Item;
  isDansCommande: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { item: Item },
    private dialogRef: MatDialogRef<ItemPopupComponent>,
    private command: CommandeService
  ) {
    this.item = data.item;
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

  close() {
    this.dialogRef.close();
  }
}
