import { Component, Injector } from '@angular/core';
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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbar, 
    MatButtonModule, 
    MatIconModule,
    ItemComponent,
    PanierComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends BaseOverlayController{
  restaurent!: Restaurent;
  // Dictionary of categories and their items
  menu: Map<ItemCategory, Item[]> = new Map<ItemCategory, Item[]>();


  constructor(
    private injector: Injector,
    private parentOverlay: Overlay,
    private restaurentService: RestaurentService,
    private commande: CommandeService
  ) {
    super(parentOverlay);

    // TODO: If the restaurent is not set, propose to choose one

    // Get the restaurent
    this.restaurentService.restaurent.subscribe((restaurent: Restaurent) => {
      this.restaurent = restaurent;
      this.loadMenu();
    });
  }

  addItem(item: Item) {
    this.commande.addItem(item);
  }

  removeItem(item: Item) {
    this.commande.removeItem(item);
  }

  passerCommande() {
    this.commande.submit();
  }

  get categories(): ItemCategory[] {
    return Array.from(this.menu.keys());
  }

  getItems(itemCategory: ItemCategory): Item[] {
    return this.menu.get(itemCategory) || [];
  }

  private loadMenu() {   
    for (const item of this.restaurent.menu) {
      if (!this.menu.has(item.categorie)) {
        this.menu.set(item.categorie, []);
      }
      this.menu.get(item.categorie)?.push(item);
    }
  }

  protected override get componentPortal(): ComponentPortal<any> {
    return new ComponentPortal(ChoisirCommandeComponent, null, this.createInjector());
  }

  private createInjector() {
    return Injector.create({
      parent: this.injector,
      providers: [
        { provide: OverlayRef, useValue: this.overlayRef }
      ]
    });
  }
  
}
