import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateRestaurentDto {
    @ApiProperty({ example: '123 rue de la pizza', description: 'The address of the restaurent'})
    @IsString()
    adresse: string;

    @ApiProperty({ example: [1, 2, 3], description: 'The menu of the restaurent (item ids)'})
    @IsNumber({}, { each: true })
    menu: number[];

    constructor(adresse: string, menu: number[]) {
        this.adresse = adresse;
        this.menu = menu;
    }
}
