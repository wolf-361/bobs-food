import { Item } from "src/item/entities/item.entity";
import { TypeCommande } from "../entities/type-commande";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNumber } from "class-validator";
import { CreateItemDto } from "src/item/dto/create-item.dto";
import { ItemCommande } from "../entities/item-commande.entity";
import { Client } from "src/user/client/entities/client.entity";
import { Paiement } from "../entities/paiement.entity";

export class CreateCommandeDto {
    @ApiProperty({ example: TypeCommande.LIVRAISON, enum: TypeCommande, description: 'Type de la commande'})
    @IsEnum(TypeCommande)
    type: TypeCommande;

    @ApiProperty({ example: 100.15, description: 'Total de la commande'})
    @IsNumber()
    total: number;

    @ApiProperty({ example: new Date(), description: 'Date de la commande'})
    @IsDate()
    date: Date;

    @ApiProperty({ type: [CreateItemDto], description: 'Items de la commande'})
    items: ItemCommande[];

    @ApiProperty({ type: Client, description: 'Client de la commande'})
    client: Client;

    @ApiProperty({ type: Paiement, description: 'Paiement de la commande'})
    paiement: Paiement;

    // Partia constructor
    constructor(partial: Partial<CreateCommandeDto>) {
        Object.assign(this, partial);
        // Recalculate the total of the commande.
        this.total = this.items.reduce((total, item) => total + item.item.prix * item.quantite, 0);
    }
}
