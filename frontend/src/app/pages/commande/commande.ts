export class Commande {
    type: string;
    total: number;
    date: Date;
    items: any[]; // Update the type according to your data structure
    paiement: any; // Update the type according to your data structure
    client: any; // Update the type according to your data structure
  
    constructor(
      type: string,
      total: number,
      date: Date,
      items: any[], // Update the type according to your data structure
      paiement: any, // Update the type according to your data structure
      client: any // Update the type according to your data structure
    ) {
      this.type = type;
      this.total = total;
      this.date = date;
      this.items = items;
      this.paiement = paiement;
      this.client = client;
    }
  }