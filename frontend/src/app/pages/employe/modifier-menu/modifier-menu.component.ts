import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Restaurent } from '../../../dto/restaurent/restaurent';
import { ApiService } from '../../../services/api/api.service';
import { Item } from '../../../dto/item/item';
import { ToggleItemComponent } from '../../../general/item/toggle-item/toggle-item.component'

@Component({
  selector: 'app-modifier-menu',
  standalone: true,
  imports: [
    ToggleItemComponent,
  ],
  templateUrl: './modifier-menu.component.html',
  styleUrl: './modifier-menu.component.scss'
})
export class ModifierMenuComponent {
  private _items!: BehaviorSubject<{ item: Item, isSelected: boolean }[]>;
  restaurent!: Restaurent;
  items!: { item: Item, isSelected: boolean }[];

  constructor(
    private api: ApiService,
  ) {
    // Initialize the restaurent and items
    this._items = new BehaviorSubject<{ item: Item, isSelected: boolean }[]>([]);

    // By default, get the first restaurent
    api.getRestaurents().subscribe((restaurents) => {
      this.restaurent = restaurents[0];


      // Get the items to pick from
      api.getItems().subscribe((items) => {
        // If the items are in the selected restaurent, put them as selected
        this._items.next(items.map((item) => {
          const isSelected = this.restaurent.menu.some((i) => i.id === item.id);
          return { item, isSelected };
        }));
      });
    });

    this._items.subscribe((items) => this.items = items);
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
    this.restaurent.menu = this._items.getValue().filter((i) => i.isSelected).map((i) => i.item);
    this.api.patchRestaurent(this.restaurent.id, this.restaurent).subscribe({
      next: (restaurent) => {
        // Success
      },
      error: (error) => {
        // Error
      }
    });
  }
}
