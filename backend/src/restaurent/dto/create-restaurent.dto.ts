import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Item } from "src/item/entities/item.entity";

export class CreateRestaurentDto {
    @ApiProperty({ example: '123 rue de la pizza', description: 'The address of the restaurent'})
    @IsString()
    adresse: string;

    @ApiProperty({ type: [Item], description: 'The menu of the restaurent'})
    menu: Item[];

    constructor(adresse: string, menu: Item[]) {
        this.adresse = adresse;
        this.menu = menu;
    }
}
