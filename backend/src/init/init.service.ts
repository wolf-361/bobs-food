import { Injectable, Logger } from '@nestjs/common';
import { CommandeService } from 'src/commande/commande.service';
import { ItemService } from 'src/item/item.service';
import { RestaurentService } from 'src/restaurent/restaurent.service';
import { ClientService } from 'src/user/client/client.service';
import { EmployeService } from 'src/user/employe/employe.service';
import { InitData } from './initData';
import { CreateRestaurentDto } from 'src/restaurent/dto/create-restaurent.dto';
import { CreateCommandeDto } from 'src/commande/dto/create-commande.dto';
import { TypeCommande } from 'src/commande/entities/type-commande';
import {Item} from "../item/entities/item.entity";

/**
 * The InitService class is a service that is used to initialize the bd with some data. 
 */
@Injectable()
export class InitService {
    private initData: InitData; // The initial data.
    private logger: Logger = new Logger('InitService');

    constructor(
        private commandeService: CommandeService,
        private itemService: ItemService,
        private restaurentService: RestaurentService,
        private clientService: ClientService,
        private employeService: EmployeService
    ) { 
        this.initData = new InitData();
    }

    /**
     * Initialize the database with some data.
     */
    async init() {
        this.logger.log("Initializing the database...");
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

        // If there are already commandes in the database, we don't initialize them.
        if (await this.commandeService.findAll().then(commandes => commandes.length) > 0) {
            this.logger.log("Commandes already initialized.");
            return;
        }

        // We get the items from the database.
        let items = await this.itemService.findAll();

        // If there are no items in the database, we don't initialize the commandes.
        if(items.length == 0) {
            this.logger.log("No items found.");
            return;
        }

        // We create a commande with the items.
        const commandes: CreateCommandeDto[] = [
            new CreateCommandeDto(TypeCommande.LIVRAISON, new Date(), [
                { item: items[0], quantity: 2 },
                { item: items[1], quantity: 1 },
                { item: items[2], quantity: 3 }
            ]),
            new CreateCommandeDto(TypeCommande.SUR_PLACE, new Date(), [
                { item: items[3], quantity: 4 },
                { item: items[4], quantity: 2 },
                { item: items[5], quantity: 1 }
            ]),

            new CreateCommandeDto(TypeCommande.LIVRAISON, new Date(), [
                { item: items[6], quantity: 1 },
                { item: items[7], quantity: 2 },
                { item: items[8], quantity: 3 }
            ])
        ];

        for (const commande of commandes) {
            await this.commandeService.create(commande);
        }
        this.logger.log("Commandes initialized.");
    }

    /**
     * Initialize or update the items.
     */
    private async initItems() {
        for (const item of this.initData.items) {
            await this.itemService.create(item);
        }
        this.logger.log("Items initialized.");
    }

    /**
     * Initialize the restaurents.
     */
    private async initRestaurents() {
        // If there are already restaurents in the database, we don't initialize them.
        if (await this.restaurentService.findAll().then(restaurents => restaurents.length) > 0) {
            this.logger.log("Restaurents already initialized.");
            return;
        }

        const itemIds = await this.itemService.findAll().then(items => {
            return items.map(item => item.id);
        });

        const restaurents: CreateRestaurentDto[] = [
            new CreateRestaurentDto("123 Rue Principale, Trois-Rivières", itemIds),
            new CreateRestaurentDto("456 Avenue Frontenac, Shawinigan", itemIds),
            new CreateRestaurentDto("789 Rue des Forges, Trois-Rivières", itemIds)
        ]

        for (const restaurent of restaurents) {
            await this.restaurentService.create(restaurent);
        }
        this.logger.log("Restaurents initialized.");
    }

    /**
     * Initialize the clients.
     */
    private async initClients() {
        // If there are already clients in the database, we don't initialize them.
        if (await this.clientService.findAll().then(clients => clients.length) > 0) {
            this.logger.log("Clients already initialized.");
            return;
        }

        for (const client of this.initData.clients) {
            // Catch the http exception i
            await this.clientService.signup(client).catch(error => {
                // this.logger.error(error.message);
            });
        }
        this.logger.log("Clients initialized.");
    }

    /**
     * Initialize the employes.
     */
    private async initEmployes() {
        // If there are already employes in the database, we don't initialize them.
        if (await this.employeService.findAll().then(employes => employes.length) > 0) {
            this.logger.log("Employes already initialized.");
            return;
        }

        for (const employe of this.initData.employes) {
            await this.employeService.signup(employe).catch(error => {
                // this.logger.error(error.message);
            });
        }
        this.logger.log("Employes initialized.");
    }

}
