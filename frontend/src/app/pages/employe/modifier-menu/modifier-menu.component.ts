import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Restaurent } from '../../../dto/restaurent/restaurent';
import { ApiService } from '../../../services/api/api.service';
import { Item } from '../../../dto/item/item';
import { ToggleItemComponent } from '../../../general/item/toggle-item/toggle-item.component'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RestaurentService } from '../../../services/restaurent/restaurent.service';
import { LoggerService } from '../../../services/logger/logger.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-modifier-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    ToggleItemComponent,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './modifier-menu.component.html',
  styleUrl: './modifier-menu.component.scss'
})
export class ModifierMenuComponent {
  private allItems!: Item[];
  private _items!: BehaviorSubject<{ item: Item, isSelected: boolean }[]>;
  restaurent!: Restaurent;
  items!: { item: Item, isSelected: boolean }[];
  restaurents!: Restaurent[];
  isMobile = false;
  isChanged = false;

  constructor(
    private api: ApiService,
    private restaurentService: RestaurentService,
    private snackBar: MatSnackBar,
    private logger: LoggerService,
    private breakpointObserver: BreakpointObserver,

  ) {
    // Initialize the restaurent and items
    this._items = new BehaviorSubject<{ item: Item, isSelected: boolean }[]>([]);

    // Subscribe to the items
    this._items.subscribe((items) => this.items = items);

    // Get all the restaurents
    this.api.getRestaurents().subscribe((restaurents) => {
      this.restaurents = restaurents;
    });

    // Get all the items (for the admin to choose from)
    this.api.getItems().subscribe((items) => {
      this.allItems = items;

      // Subscribe to the restaurent (one the items have been loaded)
      this.restaurentService.restaurent.subscribe((restaurent) => {
        this.restaurent = restaurent;

        // Update the items list
        this._items.next(this.allItems.map((item) => {
          return {
            item: item,
            isSelected: (restaurent.menu?.findIndex((i) => i.id === item.id) !== -1)
          };
        }));
      });
    });

    // Subscribe to the breakpoint observer
    this.breakpointObserver.observe('(max-width: 600px)').subscribe(result => {
      this.isMobile = result.matches;
    });

    // Check if the menu has been changed
    this._items.subscribe((items) => {
      if (!this.restaurent) {
        return;
      }
      // If the selected items are different from the restaurent's menu (somewhat ok)
      this.isChanged = items.filter((i) => i.isSelected).length !== this.restaurent.menu.length;
    });
  }

  changeSelectedRestaurent(selectedRestaurent: MatSelectChange) {
    const restaurent = this.restaurents.find((r) => r.id === selectedRestaurent.value);
    if (!restaurent) {
      return;
    }
    this.restaurentService.restaurent = restaurent;
  }


  // Toggle the selection of an item
  toggleItemSelection(item: Item) {
    // Update the items list
    const items = this._items.getValue();
    const index = items.findIndex((i) => i.item === item);
    items[index].isSelected = !items[index].isSelected;
    this._items.next(items);
  }

  /**
   * Save the changes to the restaurent's menu
   */
  save() {
    const originalMenu = this.restaurent.menu;
    this.restaurent.menu = this._items.getValue().filter((i) => i.isSelected).map((i) => i.item);
    this.api.patchRestaurent(this.restaurent.id, this.restaurent).subscribe({
      next: (restaurent) => this.onSuccess(restaurent, originalMenu),
      error: this.onError
    });
  }

  private onSuccess(restaurent: Restaurent, originalMenu: Item[]) {
    // Show a snackbar (allowing the user to undo the changes)
    const snackBarRef = this.snackBar.open('Changements sauvegardés', 'Annuler', {
      duration: 5000
    });

    // Undo the changes
    snackBarRef.onAction().subscribe(() => {
      this.onUndo(originalMenu);
    });

    // Update the restaurent
    this.restaurentService.restaurent = restaurent;
  }

  private onError(error: any) {
    const snackBarRef = this.snackBar.open('Erreur lors de la sauvegarde des changements', 'Réessayer', {
      duration: 5000
    });

    // Retry
    snackBarRef.onAction().subscribe(() => {
      this.save();
    });

    // Log
    this.logger.error('[ModifierMenuComponent] ' + error);
  }

  private onUndo(originalMenu: Item[]) {
    this.restaurent.menu = originalMenu;
    this.api.patchRestaurent(this.restaurent.id, this.restaurent).subscribe({
      next: (restaurent) => {
        const snackBarRef = this.snackBar.open('Changements annulés', '', {
          duration: 5000
        });

        // Update selected items
        this._items.next(this.allItems.map((item) => {
          return {
            item: item,
            isSelected: (restaurent.menu.findIndex((i) => i.id === item.id) !== -1)
          };
        }));  
      },
      error: this.onError
    });
  }
}
