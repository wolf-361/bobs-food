import { Injectable } from '@angular/core';
import { Commande } from '../../dto/commande/commande';
import { TypeCommande } from '../../dto/commande/type-commande';
import { Item } from '../../dto/item/item';
import { Client } from '../../dto/user/client';
import { Paiement } from '../../dto/commande/paiement';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../api/api.service';
import { LoggerService } from '../logger/logger.service';
import { BehaviorSubject, firstValueFrom, map, Observable, Subject } from 'rxjs';
import { ItemCommande } from '../../dto/commande/item-commande';
import { TypePaiement } from '../../dto/commande/type-paiement';

/**
 * Service permettant de monter une commande
 */
@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private TypeCommande?: TypeCommande;
  private total: number;
  private date?: Date;
  private items: BehaviorSubject<ItemCommande[]>;
  private client?: Client;
  private paiement: Paiement;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private logger: LoggerService
  ) {
    this.items = new BehaviorSubject<ItemCommande[]>([]);
    this.total = 0;
    this.calculateTotal().subscribe(total => this.total = total);
    this.paiement = new Paiement();
  }

  // Allow to subscribe to the items in the command
  public get Items(): Observable<ItemCommande[]> {
    return this.items.asObservable();
  }

  /**
   * Set the type of the command
   */
  public set Type(TypeCommande: TypeCommande) {
    this.TypeCommande = TypeCommande;
  }

  public get Type(): TypeCommande {
    return this.TypeCommande || TypeCommande.LIVRAISON;
  }

  /**
   * Calculate the total of the command (ideally should be done on the server)
   */
  public calculateTotal(): Observable<number> {
    return this.items.asObservable().pipe(
      map(items => items.reduce((acc, i) => acc + i.item.prix * i.quantite, 0))
    );
  }

  /**
   * Get the total of the command
   */
  public get Total(): number {
    return this.total;
  }


  /**
   * Set the date of the command
   */
  public set Date(date: Date) {
    this.date = date;
  }

  /**
   * Add an item to the command
   */
  public addItem(item: Item): void {
    // Check if the item is already in the command
    const items = this.items.value;
    const index = items.findIndex(i => i.item.id === item.id);

    // If it is, increment the quantity
    if (index !== -1) {
      items[index].quantite++;
    } else {
      // Otherwise, add it
      items.push({ item, quantite: 1 });
    }

    // Update the items
    this.items.next(items);
  }

  /**
   * Remove an item from the command
   */
  public removeItem(item: Item): void {
    // Check if the item is in the command
    const items = this.items.value;
    const index = items.findIndex(i => i.item.id === item.id);

    // If it is, decrement the quantity
    if (index !== -1) {
      items[index].quantite--;

      // If the quantity is 0, remove the item
      if (items[index].quantite === 0) {
        items.splice(index, 1);
      }

      // Update the items
      this.items.next(items);
    }
  }

  /**
   * Clear the command
   */
  public clearCommande(): void {
    this.items.next([]);
  }

  /**
   * Filter the items in the command to only include the ones in the menu
   */
  public filterItems(menu: Item[]) {
    const items = this.items.value.filter(i => menu.find(m => m.id === i.item.id));
    this.items.next(items);
  }

  /**
   * Set the client for the command
   */
  public set Client(client: Client) {
    this.client = client;    
  }

  /**
   * Get the client for the command
   */
  public get Client(): Client | undefined {
    return this.client;
  }

  public set TypeDePaiement(type: TypePaiement) {
    this.paiement.type = type;
  }

  public get TypeDePaiement(): TypePaiement {
    return this.paiement.type;
  }

  public set PayerEnPersonne(payerEnPersonne: boolean) {
    this.paiement.payerEnPersonne = payerEnPersonne;
  }
  

  /**
   * Submit the command to the server
   */
  public submit(): Promise<boolean> {
    if (!this.TypeCommande) {
      throw new Error('Type is required');
    }

    // If the date is not set, set it to now
    if (!this.date) {
      this.date = new Date();
    }

    if (!this.client) {
      throw new Error('Client is required');
    }

    if (!this.paiement) {
      throw new Error('Paiement is required');
    }

    if (this.items.value.length === 0) {
      throw new Error('Items are required');
    }

    // Create the command
    const commande = new Commande(
      this.TypeCommande,
      this.total,
      this.date,
      this.items.value,
      this.paiement,
      undefined, // id
      this.client
    );

    // Submit the command (if the user is auth, they will be added in the backend)
    return firstValueFrom(this.api.postCommande(commande)).then(() => {
      this.clearCommande();
      return true;
    }).catch((error) => {
      this.logger.commande('Error creating the command ' + JSON.stringify(error));
      return false;
    });
  }
}
