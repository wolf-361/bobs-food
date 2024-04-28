import { Component, Injector, ViewChild } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BaseOverlayController } from '../../overlays/base-overlay-controller/base-overlay-controller';
import { ChoisirCommandeComponent } from '../../overlays/choisir-commande/choisir-commande.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ApiService } from '../../services/api/api.service';
import { Restaurent } from '../../dto/restaurent/restaurent';
import { RestaurentService } from '../../services/restaurent/restaurent.service';
import { CommandeService } from '../../services/commande/commande.service';
import { ItemComponent } from '../../general/item/item.component';
import { ItemCategory } from '../../dto/item/item-categorie';
import { Item } from '../../dto/item/item';
import { PanierComponent } from '../../general/panier/panier.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatProgressBar} from "@angular/material/progress-bar";
import {NgIf} from "@angular/common";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectChange, MatSelectModule } from '@angular/material/select';
import { firstValueFrom } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbar,
    MatButtonModule,
    MatIconModule,
    ItemComponent,
    PanierComponent,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBar,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  restaurentSelecterFormControl: FormControl = new FormControl();
  restaurents!: Restaurent[];
  restaurent!: Restaurent;
  // Dictionary of categories and their items
  menu: Map<ItemCategory, Item[]> = new Map<ItemCategory, Item[]>();
  isMobile = false;
  isPanierVide = true;
  montrerPanierMobile = false;
  categorieSelectionner: number = 0;
  loading = true;

  // Pourrais faire un dictionnaire des descriptions des categories


  constructor(
    private restaurentService: RestaurentService,
    private commande: CommandeService,
    private api: ApiService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
  ) {
    firstValueFrom(this.api.getRestaurents()).then((restaurents) => {
      this.restaurents = restaurents;
    });
    // Get the restaurent
    this.restaurentService.restaurent.subscribe((restaurent: Restaurent) => {
      if (!restaurent) {
        return;
      }
      this.restaurent = restaurent;
      this.restaurentSelecterFormControl.setValue(restaurent.id); // Set the selected value

      // Load the menu once it is set, set the loading to false
      this.loadMenu();
      this.loading = false;
    });

    // Listen to the screen size
    this.breakpointObserver.observe('(max-width: 1024px)').subscribe(result => {
      this.isMobile = result.matches;
    });

    // Subscribe to the items in the command to know if the panier is vide
    this.commande.Items.subscribe(items => this.isPanierVide = items.length === 0);
  }
  
  commander() {
    this.router.navigate(['/commander']);
  }

  changeSelectedRestaurent(selectedRestaurent: MatSelectChange) {
    const restaurent = this.restaurents.find((r) => r.id == selectedRestaurent.value);
    
    if (!restaurent) {
      return;
    }
    this.restaurentService.restaurent = restaurent;
  }

  get categories(): ItemCategory[] {
    return Array.from(this.menu.keys());
  }

  getItems(itemCategory: ItemCategory): Item[] {
    return this.menu.get(itemCategory) || [];
  }

  private loadMenu() {
    // Clear the menu
    this.menu.clear();

    // Remove the items from the command that are not in the menu
    this.commande.filterItems(this.restaurent.menu)

    // Fill the menu with the new items
    for (const item of this.restaurent.menu) {
      if (!this.menu.has(item.categorie)) {
        this.menu.set(item.categorie, []);
      }
      this.menu.get(item.categorie)?.push(item);
    }
  }

}
