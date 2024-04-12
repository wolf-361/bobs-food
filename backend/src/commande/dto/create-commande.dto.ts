import { Item } from "src/item/entities/item.entity";
import { TypeCommande } from "../entities/type-commande";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNumber } from "class-validator";
import { CreateItemDto } from "src/item/dto/create-item.dto";

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

    @ApiProperty({ example: [{ item: new CreateItemDto(), quantity: 2 }], description: 'Les items de la commande'})
    items: { item: Item, quantity: number }[];

    constructor(type: TypeCommande, total: number, date: Date, items: { item: Item, quantity: number }[]) {
        this.type = type;
        this.total = total;
        this.date = date;
        this.items = items;
    }
}
