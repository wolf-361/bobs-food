import { Commande } from "src/commande/entities/commande.entity";
import { TypeCommande } from "src/commande/entities/type-commande";
import { ItemCategory } from "src/item/entities/item-categorie";
import { Item } from "src/item/entities/item.entity";
import { Restaurent } from "src/restaurent/entities/restaurent.entity";
import { ClientSignUpDto } from "src/user/client/dto/client-sign-up.dto";
import { Client } from "src/user/client/entities/client.entity";
import { EmployeSignUpDto } from "src/user/employe/dto/employe-sign-up-dto";
import { Employe } from "src/user/employe/entities/employe.entity";
import { EmployeType } from "src/user/employe/entities/employeType";

export class InitData {
    clients: ClientSignUpDto[]; // The clients.
    employes: EmployeSignUpDto[]; // The employes.
    items: Item[]; // The items.

    constructor() {
        this.clients = this.createClients();
        this.employes = this.createEmployes();
        this.items = this.createItems();
    }

    private createClients(): ClientSignUpDto[] {
        return [
            new ClientSignUpDto("john.doe@example.com", true, "Doe", "John", "123 Rue de Paris", "john123pwd", "john123pwd", "John Doe", "1234567890123456", "12/25", "123"),
            new ClientSignUpDto("emma.smith@example.com", true, "Smith", "Emma", "456 Avenue des Lilas", "emma456pwd", "emma456pwd", "Emma Smith", "2345678901234567", "10/24", "456"),
            new ClientSignUpDto("michael.johnson@example.com", true, "Johnson", "Michael", "789 Boulevard Saint-Michel", "michael789pwd", "michael789pwd", "Michael Johnson", "3456789012345678", "06/23", "789"),
            new ClientSignUpDto("olivia.williams@example.com", true, "Williams", "Olivia", "1010 Rue de la Paix", "olivia101pwd", "olivia101pwd", "Olivia Williams", "4567890123456789", "09/22", "987"),
            new ClientSignUpDto("james.brown@example.com", true, "Brown", "James", "1111 Avenue du Soleil", "james111pwd", "james111pwd", "James Brown", "5678901234567890", "08/21", "654"),
            new ClientSignUpDto("sophia.jones@example.com", true, "Jones", "Sophia", "1212 Boulevard des Arts", "sophia121pwd", "sophia121pwd", "Sophia Jones", "6789012345678901", "07/20", "321"),
            new ClientSignUpDto("daniel.garcia@example.com", true, "Garcia", "Daniel", "1313 Rue de la Liberté", "daniel131pwd", "daniel131pwd", "Daniel Garcia", "7890123456789012", "05/19", "789"),
            new ClientSignUpDto("isabella.miller@example.com", true, "Miller", "Isabella", "1414 Avenue de la République", "isabella141pwd", "isabella141pwd", "Isabella Miller", "8901234567890123", "04/18", "456"),
            new ClientSignUpDto("alexander.davis@example.com", true, "Davis", "Alexander", "1515 Boulevard de la Victoire", "alexander151pwd", "alexander151pwd", "Alexander Davis", "9012345678901234", "03/17", "123"),
            new ClientSignUpDto("mia.rodriguez@example.com", true, "Rodriguez", "Mia", "1616 Rue de l'Espoir", "mia161pwd", "mia161pwd", "Mia Rodriguez", "0123456789012345", "02/16", "789")
        ];
    }

    createEmployes(): EmployeSignUpDto[] {
        return [
            new EmployeSignUpDto("TESS0001", "Doe", "John", "123 rue de la rue", "S0meP4ssword", "S0meP4ssword", EmployeType.PROPRIO),
            new EmployeSignUpDto("TESS0002", "Smith", "Emma", "456 Avenue des Lilas", "P@ssw0rd123", "P@ssw0rd123", EmployeType.EMPLOYE),
            new EmployeSignUpDto("TESS0003", "Johnson", "Michael", "789 Boulevard Saint-Michel", "Passw0rd456", "Passw0rd456", EmployeType.GESTIONNAIRE),
            new EmployeSignUpDto("TESS0004", "Williams", "Olivia", "1010 Rue de la Paix", "Password789", "Password789", EmployeType.PROPRIO),
            new EmployeSignUpDto("TESS0005", "Brown", "James", "1111 Avenue du Soleil", "12345678", "12345678", EmployeType.EMPLOYE),
            new EmployeSignUpDto("TESS0006", "Jones", "Sophia", "1212 Boulevard des Arts", "password123", "password123", EmployeType.GESTIONNAIRE),
            new EmployeSignUpDto("TESS0007", "Garcia", "Daniel", "1313 Rue de la Liberté", "pass1234", "pass1234", EmployeType.PROPRIO),
            new EmployeSignUpDto("TESS0008", "Miller", "Isabella", "1414 Avenue de la République", "pass9876", "pass9876", EmployeType.EMPLOYE),
            new EmployeSignUpDto("TESS0009", "Davis", "Alexander", "1515 Boulevard de la Victoire", "securePassword", "securePassword", EmployeType.GESTIONNAIRE),
            new EmployeSignUpDto("TESS0010", "Rodriguez", "Mia", "1616 Rue de l'Espoir", "myPassword123", "myPassword123", EmployeType.PROPRIO),
        ];
    }

    createItems(): Item[] {
        return [
            // Pizzas
            new Item('Pizza Margherita', 'Tomate, mozzarella, basilic', 10.99, 'pizza_margherita.jpg', ItemCategory.PIZZA),
            new Item('Pizza Pepperoni', 'Sauce tomate, pepperoni, fromage', 12.99, 'pizza_pepperoni.jpg', ItemCategory.PIZZA),
            new Item('Pizza Végétarienne', 'Tomate, champignons, poivrons, oignons', 11.99, 'pizza_vegetarienne.jpg', ItemCategory.PIZZA),
            new Item('Pizza Hawaïenne', 'Tomate, jambon, ananas', 13.99, 'pizza_hawaienne.jpg', ItemCategory.PIZZA),
            new Item('Pizza Quatre Fromages', 'Mozzarella, chèvre, gorgonzola, parmesan', 14.99, 'pizza_quatre_fromages.jpg', ItemCategory.PIZZA),
            new Item('Pizza Mexicaine', 'Sauce tomate, viande hachée, poivrons, piments', 15.99, 'pizza_mexicaine.jpg', ItemCategory.PIZZA),
            new Item('Pizza BBQ Chicken', 'Sauce BBQ, poulet grillé, oignons, coriandre', 16.99, 'pizza_bbq_chicken.jpg', ItemCategory.PIZZA),
            new Item('Pizza Primavera', 'Tomate, mozzarella, légumes grillés, basilic', 14.99, 'pizza_primavera.jpg', ItemCategory.PIZZA),
            new Item('Pizza Capricciosa', 'Tomate, mozzarella, jambon, champignons, olives', 15.99, 'pizza_capricciosa.jpg', ItemCategory.PIZZA),
            new Item('Pizza Diavola', 'Tomate, mozzarella, pepperoni, piments forts', 14.99, 'pizza_diavola.jpg', ItemCategory.PIZZA),


            // Poutines
            new Item('Poutine Classique', 'Frites, fromage en grains, sauce brune', 8.99, 'poutine_classique.jpg', ItemCategory.POUTINE),
            new Item('Poutine Italienne', 'Frites, fromage en grains, sauce tomate, pepperoni', 9.99, 'poutine_italienne.jpg', ItemCategory.POUTINE),
            new Item('Poutine BBQ', 'Frites, fromage en grains, sauce BBQ, oignons caramélisés', 10.99, 'poutine_bbq.jpg', ItemCategory.POUTINE),
            new Item('Poutine Bacon', 'Frites, fromage en grains, sauce brune, bacon', 9.99, 'poutine_bacon.jpg', ItemCategory.POUTINE),
            new Item('Poutine Mexicaine', 'Frites, fromage en grains, salsa, jalapeños', 11.99, 'assets/items/poutine/mexicaine.png', ItemCategory.POUTINE),
            new Item('Poutine Chicken Ranch', 'Frites, poulet grillé, fromage en grains, sauce ranch', 12.99, 'poutine_chicken_ranch.jpg', ItemCategory.POUTINE),
            new Item('Poutine Forestière', 'Frites, fromage en grains, champignons, oignons, sauce champignon', 11.99, 'poutine_forestiere.jpg', ItemCategory.POUTINE),
            new Item('Poutine Gourmet', 'Frites, fromage en grains, bœuf braisé, sauce au vin rouge', 13.99, 'poutine_gourmet.jpg', ItemCategory.POUTINE),
            new Item('Poutine Veggie', 'Frites, fromage en grains, légumes grillés, sauce au pesto', 10.99, 'poutine_veggie.jpg', ItemCategory.POUTINE),
            new Item('Poutine Buffalo Chicken', 'Frites, poulet épicé, fromage en grains, sauce buffalo', 12.99, 'poutine_buffalo_chicken.jpg', ItemCategory.POUTINE),


            // Frites
            new Item('Frites Traditionnelles', 'Frites croustillantes', 4.99, 'frites_traditionnelles.jpg', ItemCategory.FRITE),
            new Item('Frites Parmesan et Ail', 'Frites, parmesan, ail', 5.99, 'frites_parmesan_ail.jpg', ItemCategory.FRITE),
            new Item('Frites Chili Cheese', 'Frites, chili con carne, fromage fondu', 6.99, 'frites_chili_cheese.jpg', ItemCategory.FRITE),
            new Item('Frites Truffe', 'Frites, huile de truffe, parmesan', 7.99, 'frites_truffe.jpg', ItemCategory.FRITE),
            new Item('Frites Belges', 'Frites épaisses, sauce mayonnaise', 5.99, 'frites_belges.jpg', ItemCategory.FRITE),

            // Burgers
            new Item('Burger Classique', 'Pain, steak, salade, tomate, oignons', 12.99, 'burger_classique.jpg', ItemCategory.BURGER),
            new Item('Burger Cheese', 'Pain, steak, fromage cheddar, salade, tomate', 13.99, 'burger_cheese.jpg', ItemCategory.BURGER),
            new Item('Burger Bacon', 'Pain, steak, bacon, fromage, salade, tomate', 14.99, 'burger_bacon.jpg', ItemCategory.BURGER),
            new Item('Burger Veggie', 'Pain, steak végétarien, salade, tomate, oignons', 11.99, 'burger_veggie.jpg', ItemCategory.BURGER),
            new Item('Burger BBQ', 'Pain, steak, fromage, sauce BBQ, oignons croustillants', 15.99, 'burger_bbq.jpg', ItemCategory.BURGER),
            new Item('Burger Jalapeño', 'Pain, steak, fromage, jalapeños, sauce épicée, salade', 13.99, 'burger_jalapeno.jpg', ItemCategory.BURGER),
            new Item('Burger Mushroom Swiss', 'Pain, steak, fromage suisse, champignons sautés, sauce aux champignons', 14.99, 'burger_mushroom_swiss.jpg', ItemCategory.BURGER),
            new Item('Burger Guacamole', 'Pain, steak, guacamole, bacon, fromage, salade', 16.99, 'burger_guacamole.jpg', ItemCategory.BURGER),
            new Item('Burger Hawaïen', 'Pain, steak, jambon, ananas, fromage, sauce spéciale', 15.99, 'burger_hawaien.jpg', ItemCategory.BURGER),
            new Item('Burger Fish & Chips', 'Pain, filet de poisson croustillant, frites, sauce tartare', 13.99, 'burger_fish_chips.jpg', ItemCategory.BURGER),

            // Sandwichs
            new Item('Sandwich Poulet Grillé', 'Pain, poulet grillé, laitue, tomate, mayonnaise', 9.99, 'sandwich_poulet_grille.jpg', ItemCategory.SANDWICH),
            new Item('Sandwich BLT', 'Pain, bacon, laitue, tomate, mayonnaise', 8.99, 'sandwich_blt.jpg', ItemCategory.SANDWICH),
            new Item('Sandwich Thon', 'Pain, thon, salade, tomate, mayonnaise', 10.99, 'sandwich_thon.jpg', ItemCategory.SANDWICH),
            new Item('Sandwich Steak et Fromage', 'Pain, steak, fromage, laitue, tomate, oignons', 12.99, 'sandwich_steak_fromage.jpg', ItemCategory.SANDWICH),
            new Item('Sandwich Végétarien', 'Pain, fromage, légumes grillés, pesto', 10.99, 'sandwich_vegetarien.jpg', ItemCategory.SANDWICH),
            new Item('Sandwich Poulet BBQ', 'Pain, poulet grillé, salade, tomate, sauce BBQ', 9.99, 'sandwich_poulet_bbq.jpg', ItemCategory.SANDWICH),
            new Item('Sandwich Club', 'Pain, dinde, bacon, fromage, laitue, tomate, mayonnaise', 10.99, 'sandwich_club.jpg', ItemCategory.SANDWICH),
            new Item('Sandwich Thon Avocat', 'Pain, thon, avocat, salade, tomate, mayonnaise', 10.99, 'sandwich_thon_avocat.jpg', ItemCategory.SANDWICH),
            new Item('Sandwich Steak au Poivre', 'Pain, steak, poivre, fromage, salade, tomate, oignons', 12.99, 'sandwich_steak_poivre.jpg', ItemCategory.SANDWICH),
            new Item('Sandwich Végétalien', 'Pain complet, houmous, avocat, légumes grillés, roquette', 11.99, 'sandwich_vegetalien.jpg', ItemCategory.SANDWICH),


            // Salades
            new Item('Salade Grecque', 'Laitue, tomate, concombre, olives, feta, vinaigrette grecque', 9.99, 'salade_grecque.jpg', ItemCategory.SALADE),
            new Item('Salade César', 'Laitue romaine, croûtons, parmesan, vinaigrette césar', 7.99, 'salade_cesar.jpg', ItemCategory.SALADE),
            new Item('Salade Poulet Caesar', 'Laitue romaine, croûtons, parmesan, vinaigrette césar, poulet grillé', 11.99, 'salade_poulet_caesar.jpg', ItemCategory.SALADE),
            new Item('Salade Méditerranéenne', 'Laitue, tomate, poivrons, oignons, olives, feta, vinaigrette', 10.99, 'salade_mediterraneenne.jpg', ItemCategory.SALADE),
            new Item('Salade Napolitaine', 'Laitue, tomate, mozzarella, basilic, vinaigrette balsamique', 8.99, 'salade_napolitaine.jpg', ItemCategory.SALADE),
            new Item('Salade Crevettes Avocat', 'Laitue, avocat, crevettes, tomates cerises, vinaigrette citron', 12.99, 'salade_crevettes_avocat.jpg', ItemCategory.SALADE),
            new Item('Salade Poulet Curry', 'Laitue, poulet grillé, raisins, noix, sauce curry', 10.99, 'salade_poulet_curry.jpg', ItemCategory.SALADE),
            new Item('Salade Méditerranéenne', 'Laitue, tomate, poivrons, oignons, olives, feta, vinaigrette', 10.99, 'salade_mediterraneenne.jpg', ItemCategory.SALADE),
            new Item('Salade Quinoa Légumes', 'Quinoa, légumes frais, herbes fraîches, vinaigrette', 11.99, 'salade_quinoa_legumes.jpg', ItemCategory.SALADE),
            new Item('Salade César Poulet', 'Laitue romaine, croûtons, parmesan, poulet grillé, vinaigrette césar', 11.99, 'salade_cesar_poulet.jpg', ItemCategory.SALADE),


            // Desserts
            new Item('Cheesecake aux Fruits Rouges', 'Cheesecake crémeux aux fruits rouges', 6.99, 'cheesecake_fruits_rouges.jpg', ItemCategory.DESSERT),
            new Item('Gaufres Chocolat Banane', 'Gaufres croustillantes, chocolat fondu, bananes', 8.99, 'gaufres_chocolat_banane.jpg', ItemCategory.DESSERT),
            new Item('Tiramisu Classique', 'Tiramisu traditionnel au café et mascarpone', 7.99, 'tiramisu_classique.jpg', ItemCategory.DESSERT),
            new Item('Crumble Pommes Cannelle', 'Crumble aux pommes, cannelle, glace vanille', 7.99, 'crumble_pommes_cannelle.jpg', ItemCategory.DESSERT),
            new Item('Fondant Chocolat Framboises', 'Fondant au chocolat, framboises fraîches', 9.99, 'fondant_chocolat_framboises.jpg', ItemCategory.DESSERT),
            new Item('Tarte aux Pommes', 'Tartelette aux pommes caramélisées', 5.99, 'tarte_pommes.jpg', ItemCategory.DESSERT),
            new Item('Fondant au Chocolat', 'Gâteau au chocolat fondant, glace vanille', 6.99, 'fondant_chocolat.jpg', ItemCategory.DESSERT),
            new Item('Crème Brûlée', 'Crème vanille caramélisée', 4.99, 'creme_brulee.jpg', ItemCategory.DESSERT),
            new Item('Profiteroles', 'Choux à la crème, sauce chocolat', 7.99, 'profiteroles.jpg', ItemCategory.DESSERT),
            new Item('Mousse aux Fruits', 'Mousse aux fruits rouges, coulis de fruits', 5.99, 'mousse_fruits.jpg', ItemCategory.DESSERT),
            
            // Boissons
            new Item('Smoothie Vert Détox', 'Smoothie aux légumes verts, fruits frais', 5.99, 'smoothie_vert_detox.jpg', ItemCategory.BOISSON),
            new Item('Mojito Frais', 'Cocktail mojito rafraîchissant', 8.99, 'mojito_frais.jpg', ItemCategory.BOISSON),
            new Item('Café Frappé', 'Café glacé, lait, crème fouettée', 4.99, 'cafe_frappe.jpg', ItemCategory.BOISSON),
            new Item('Thé Matcha Latte', 'Thé matcha, lait chaud, mousse de lait', 6.99, 'the_matcha_latte.jpg', ItemCategory.BOISSON),
            new Item('Limonade Maison', 'Limonade fraîche maison', 3.99, 'limonade_maison.jpg', ItemCategory.BOISSON),
            new Item('Smoothie Fraise-Banane', 'Smoothie rafraîchissant aux fraises et bananes', 4.99, 'smoothie_fraise_banane.jpg', ItemCategory.BOISSON),
            new Item('Lait Frappé Vanille', 'Lait frappé à la vanille et chantilly', 5.99, 'lait_frappe_vanille.jpg', ItemCategory.BOISSON),
            new Item('Cocktail Fruits Exotiques', 'Cocktail de fruits exotiques frais', 7.99, 'cocktail_fruits_exotiques.jpg', ItemCategory.BOISSON),
            new Item('Eau Infusée aux Fruits', 'Eau fraîche infusée aux fruits de saison', 3.99, 'eau_infusee_fruits.jpg', ItemCategory.BOISSON),
            new Item('Thé Chai Latte', 'Thé chai épicé avec lait et cannelle', 5.99, 'the_chai_latte.jpg', ItemCategory.BOISSON),

            // Autres
            new Item('Menu Enfant', 'Plat, boisson et dessert pour les enfants', 6.99, 'menu_enfant.jpg', ItemCategory.AUTRE),
            new Item('Assiette Charcuterie', 'Assortiment de charcuteries', 13.99, 'assiette_charcuterie.jpg', ItemCategory.AUTRE),
            new Item('Planche Fromages', 'Assortiment de fromages', 14.99, 'planche_fromages.jpg', ItemCategory.AUTRE),
            new Item('Dégustation Tapas', 'Assortiment de tapas', 15.99, 'degustation_tapas.jpg', ItemCategory.AUTRE),
            new Item('Plateau Fruits de Mer', 'Assortiment de fruits de mer', 19.99, 'plateau_fruits_mer.jpg', ItemCategory.AUTRE),
        ];
    }
}
