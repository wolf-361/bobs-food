import { Component } from '@angular/core';
import { CommandeService } from '../../services/commande/commande.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { Item } from '../../dto/item/item';
import { ItemCategory } from '../../dto/item/item-categorie';
import { ItemCommande } from '../../dto/commande/item-commande';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatListModule,
  ],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss'
})
export class PanierComponent {
  isVide: boolean = true;
  categoryIcons: Map<ItemCategory, string> = new Map([
    [ItemCategory.PIZZA, 'local_pizza'],
    [ItemCategory.POUTINE, 'restaurant_menu'],
    [ItemCategory.FRITE, 'fastfood'],
    [ItemCategory.BURGER, 'hamburger'],
    [ItemCategory.SANDWICH, 'sandwich'],
    [ItemCategory.SALADE, 'salad'],
    [ItemCategory.DESSERT, 'cake'],
    [ItemCategory.BOISSON, 'local_drink'],
    [ItemCategory.AUTRE, 'restaurant'],
  ]);
  items: ItemCommande[] = [];

  constructor(
    private commande: CommandeService,
    private router: Router,
  ) {
    // Subscribe to the items in the command to know if the panier is vide
    this.commande.Items.subscribe(items => this.isVide = items.length === 0);
    // Subscribe to the items in the command
    this.commande.Items.subscribe(items => this.items = items);
  }

  /**
   * Get the icon to display for the given category
   * @param category The category of the item
   * @returns The string of the icon to display
   */
  getIcon(category: ItemCategory): string {
    return this.categoryIcons.get(category) || 'restaurant';
  }

  /**
   * Redirect to the command page
   */
  commander() {
    this.router.navigate(['/commander']);
  }
}
