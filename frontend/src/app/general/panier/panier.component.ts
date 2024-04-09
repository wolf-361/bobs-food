import { Component } from '@angular/core';
import { CommandeService } from '../../services/commande/commande.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Item } from '../../dto/item/item';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss'
})
export class PanierComponent {
  isVide: boolean = true;
  items: { item: Item, quantite: number }[] = [];

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
   * Redirect to the command page
   */
  commander() {
    this.router.navigate(['/commander']);
  }
}
