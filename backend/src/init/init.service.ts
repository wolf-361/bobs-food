import { Injectable, Logger } from '@nestjs/common';
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
import { InitData } from './initData';
import { CreateRestaurentDto } from 'src/restaurent/dto/create-restaurent.dto';

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
        this.initClients();
        this.initEmployes();
        await this.initItems();
        await this.initRestaurents();
        await this.initCommandes();
    }

    async isDbInitialized(): Promise<boolean> {
        this.logger.log("Checking if the database is already initialized...");
        // Check if all the items are in the database.
        return await this.itemService.findAll().then(items => {
            return items.length == this.initData.items.length;
        });
    }     
        

    /**
     * Initialize the commandes.
     */
    private initCommandes() {
        
    }

    /**
     * Initialize the items.
     */
    private async initItems() {
        this.initData.items.forEach(async item => {
            await this.itemService.create(item);  
        });
    }

    /**
     * Initialize the restaurents.
     */
    private async initRestaurents() {
        const itemIds = await this.itemService.findAll().then(items => {
            return items.map(item => item.id);
        });

        const restaurents: CreateRestaurentDto[] = [
            new CreateRestaurentDto("123 Rue Principale, Trois-Rivières", itemIds),
            new CreateRestaurentDto("456 Avenue Frontenac, Shawinigan", itemIds),
            new CreateRestaurentDto("789 Rue des Forges, Trois-Rivières", itemIds)
        ]

        restaurents.forEach(async restaurent => {
            await this.restaurentService.create(restaurent);
        });
    }

    /**
     * Initialize the clients.
     */
    private initClients() {
        this.initData.clients.forEach(client => {
            this.clientService.signup(client);
        });
    }

    /**
     * Initialize the employes.
     */
    private initEmployes() {
        this.initData.employes.forEach(employe => {
            this.employeService.signup(employe);
        });
    }

}
