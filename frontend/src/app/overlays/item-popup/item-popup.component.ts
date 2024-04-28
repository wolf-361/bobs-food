import { Component, EventEmitter, Host, HostListener, Inject, Input, Output } from '@angular/core';
import { Item } from '../../dto/item/item';
import { OverlayRef } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommandeService } from '../../services/commande/commande.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

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
  private mouseOver: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isMouseOver: boolean = false;
  isMobile: boolean = false;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.mouseOver.next(true);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.mouseOver.next(false);
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { item: Item },
    private dialogRef: MatDialogRef<ItemPopupComponent>,
    private command: CommandeService,
    private breakpointObserver: BreakpointObserver,
  ) {
    // Check if the mouse is over the item
    this.mouseOver.subscribe((isMouseOver: boolean) => this.isMouseOver = isMouseOver);

    // Listen to the screen size
    this.breakpointObserver.observe('(max-width: 600px)').subscribe(result => {
      this.isMobile = result.matches;
    });

    this.item = data.item;
    this.command.Items.subscribe(items => {
      this.isDansCommande = items.some(i => i.item.id === this.item.id);
    });
  }

  addItem() {
    console.log('Adding item to cart');
    
    this.command.addItem(this.item);
  }

  removeItem() {
    this.command.removeItem(this.item);
  }

  close() {
    this.dialogRef.close();
  }
}
