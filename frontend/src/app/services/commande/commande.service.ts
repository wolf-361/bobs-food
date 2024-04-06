import { Injectable } from '@angular/core';
import { Commande } from '../../dto/commande/commande';
import { TypeCommande } from '../../dto/commande/type-commande';
import { Item } from '../../dto/item/item';
import { Client } from '../../dto/user/client';
import { Paiement } from '../../dto/commande/paiement';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../api/api.service';
import { LoggerService } from '../logger/logger.service';

/**
 * Service permettant de monter une commande
 */
@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private type?: TypeCommande;
  private total: number;
  private date?: Date;
  private items: Item[] = [];
  private client?: Client;
  private paiement?: Paiement;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private logger: LoggerService
  ) {
    this.total = 0;
  }

  /**
   * Set the type of the command
   */
  public set Type(type: TypeCommande) {
    this.type = type;
  }

  /**
   * Calculate the total of the command (ideally should be done on the server)
   */
  private calculateTotal(): void {
    this.total = this.items.reduce((acc, item) => acc + item.prix, 0);
  }

  public set Date(date: Date) {
    this.date = date;
  }

  /**
   * Add an item to the command
   */
  public addItem(item: Item): void {
    this.items.push(item);
    this.calculateTotal();
  }

  /**
   * Remove an item from the command
   */
  public removeItem(item: Item): void {
    this.items = this.items.filter(i => i.id !== item.id);
    this.calculateTotal();
  }

  /**
   * Set the client for the command
   */
  public set Client(client: Client) {
    this.client = client;
  }

  /**
   * Set the paiement for the command
   */
  public set Paiement(paiement: Paiement) {
    this.paiement = paiement;
  }

  /**
   * Submit the command to the server
   */
  public submit(): void {
    if (!this.type) {
      throw new Error('Type is required');
    }

    if (!this.date) {
      throw new Error('Date is required');
    }

    if (!this.auth.IsAuthenticated && !this.client) {
      throw new Error('Client is required');
    }

    if (!this.paiement) {
      throw new Error('Paiement is required');
    }

    if (this.items.length === 0) {
      throw new Error('Items are required');
    }

    // Create the command
    const commande = new Commande(
      this.type,
      this.total,
      this.date,
      this.items,
      this.paiement,
      undefined, // id
      this.client
    );

    // Submit the command (if the user is auth, they will be added in the backend)
    this.api.postCommande(commande).subscribe({
      next: commande => {
        this.logger.commande('Commande created ' + JSON.stringify(commande));
      },
      error: error => {
        this.logger.commande('Error creating the command ' + JSON.stringify(error));
      }
    });

  }





}
