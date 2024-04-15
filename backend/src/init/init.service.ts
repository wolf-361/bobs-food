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
import { ItemCommande } from 'src/commande/entities/item-commande.entity';
import { TypePaiement } from 'src/commande/entities/type-paiement';
import { Paiement } from 'src/commande/entities/paiement.entity';

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

        // Get the 6 first items from the database.
        const items = await this.itemService.findAll().then(items => items.slice(0, 12));
        const users = await this.clientService.findAll().then(users => users.slice(0, 4));
        const commandes: CreateCommandeDto[] = [
            new CreateCommandeDto({
                type: TypeCommande.LIVRAISON,
                date: new Date(),
                items: [
                    new ItemCommande(items[0], 2),
                    new ItemCommande(items[1], 1),
                    new ItemCommande(items[2], 3),
                ],
                client: users[0],
                paiement: new Paiement(TypePaiement.CARTE, 100.15)
            }),
            new CreateCommandeDto({
                type: TypeCommande.LIVRAISON,
                date: new Date(),
                items: [
                    new ItemCommande(items[3], 2),
                    new ItemCommande(items[4], 1),
                    new ItemCommande(items[5], 3),
                ],
                client: users[1],
                paiement: new Paiement(TypePaiement.ESPECE, 50.10)
            }),
            new CreateCommandeDto({
                type: TypeCommande.LIVRAISON,
                date: new Date(),
                items: [
                    new ItemCommande(items[6], 2),
                    new ItemCommande(items[7], 1),
                    new ItemCommande(items[8], 3),
                ],
                client: users[2],
                paiement: new Paiement(TypePaiement.CHEQUE, 75.25)
            }),
            new CreateCommandeDto({
                type: TypeCommande.LIVRAISON,
                date: new Date(),
                items: [
                    new ItemCommande(items[9], 2),
                    new ItemCommande(items[10], 1),
                    new ItemCommande(items[11], 3),
                ],
                client: users[3],
                paiement: new Paiement(TypePaiement.CARTE, 125.30)
            })

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

        const items = await this.itemService.findAll().then(items => items);

        const restaurents: CreateRestaurentDto[] = [
            new CreateRestaurentDto("123 Rue Principale, Trois-Rivières", items),
            new CreateRestaurentDto("456 Avenue Frontenac, Shawinigan", items),
            new CreateRestaurentDto("789 Rue des Forges, Trois-Rivières", items)
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
