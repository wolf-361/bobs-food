import { Injectable } from '@nestjs/common';
import { CommandeService } from 'src/commande/commande.service';
import { Commande } from 'src/commande/entities/commande.entity';
import { Item } from 'src/item/entities/item.entity';
import { ItemService } from 'src/item/item.service';
import { Restaurent } from 'src/restaurent/entities/restaurent.entity';
import { RestaurentService } from 'src/restaurent/restaurent.service';
import { ClientService } from 'src/user/client/client.service';
import { Client } from 'src/user/client/entities/client.entity';
import { EmployeService } from 'src/user/employe/employe.service';
import { Employe } from 'src/user/employe/entities/employe.entity';

/**
 * The InitService class is a service that is used to initialize the bd with some data. 
 */
@Injectable()
export class InitService {
    private clients: Client[]; // The clients.
    private employes: Employe[]; // The employes.
    private items: Item[]; // The items.
    private restaurents: Restaurent[]; // The restaurents.
    private commandes: Commande[]; // The commandes.

    constructor(
        private commandeService: CommandeService,
        private itemService: ItemService,
        private restaurentService: RestaurentService,
        private clientService: ClientService,
        private employeService: EmployeService
    ) { }

    /**
     * Initialize the database with some data.
     */
    async init() {
        await this.initClients();
        await this.initEmployes();
        await this.initItems();
        await this.initRestaurents();
        await this.initCommandes();
    }

    /**
     * Initialize the commandes.
     */
    private async initCommandes() {
        // TODO
    }

    /**
     * Initialize the items.
     */
    private async initItems() {
        // TODO
    }

    /**
     * Initialize the restaurents.
     */
    private async initRestaurents() {
        // TODO
    }

    /**
     * Initialize the clients.
     */
    private async initClients() {
        // TODO
    }

    /**
     * Initialize the employes.
     */
    private async initEmployes() {
        // TODO
    }

}
