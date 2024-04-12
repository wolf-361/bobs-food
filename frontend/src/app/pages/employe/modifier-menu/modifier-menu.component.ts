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
import { RestaurentService } from '../../../services/restaurent/restaurent.service';

@Component({
  selector: 'app-modifier-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    ToggleItemComponent,
    MatSnackBarModule
  ],
  templateUrl: './modifier-menu.component.html',
  styleUrl: './modifier-menu.component.scss'
})
export class ModifierMenuComponent {
  private allItems!: Item[];
  private _items!: BehaviorSubject<{ item: Item, isSelected: boolean }[]>;
  restaurent!: Restaurent;
  items!: { item: Item, isSelected: boolean }[];

  constructor(
    private api: ApiService,
    private restaurentService: RestaurentService,
    private snackBar: MatSnackBar
  ) {
    // Initialize the restaurent and items
    this._items = new BehaviorSubject<{ item: Item, isSelected: boolean }[]>([]);

    // Subscribe to the items
    this._items.subscribe((items) => this.items = items);

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
            isSelected: (restaurent.menu.findIndex((i) => i.id === item.id) !== -1)
          };
        }));
      });
    });
  }

  // Toggle the selection of an item
  toggleItemSelection(item: Item) {
    // Update the items list
    const items = this._items.getValue();
    const index = items.findIndex((i) => i.item === item);
    items[index].isSelected = !items[index].isSelected;
    this._items.next(items);
  }

  // Save the changes
  save() {
    const originalMenu = this.restaurent.menu;
    this.restaurent.menu = this._items.getValue().filter((i) => i.isSelected).map((i) => i.item);
    this.api.patchRestaurent(this.restaurent.id, this.restaurent).subscribe({
      next: (restaurent) => {
        // Success
        // Show a snackbar (allowing the user to undo the changes)
        const snackBarRef = this.snackBar.open('Changes saved', 'Undo', {
          duration: 5000
        });

        // Undo the changes
        snackBarRef.onAction().subscribe(() => {
          this.restaurent.menu = originalMenu;
          this.api.patchRestaurent(this.restaurent.id, this.restaurent).subscribe({
            next: (restaurent) => {
              // Success
            },
            error: (error) => {
              // Error
            }
          });
        });

        // Update the restaurent
        this.restaurentService.restaurent = restaurent;
      },
      error: (error) => {
        // Error
        // Show a snackbar (allowing the user to retry)
        const snackBarRef = this.snackBar.open('Error saving changes', 'Retry', {
          duration: 5000
        });

        // Retry
        snackBarRef.onAction().subscribe(() => {
          this.save();
        });
      }
    });
  }
}
