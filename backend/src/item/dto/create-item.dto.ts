import { ApiProperty } from "@nestjs/swagger";
import { ItemCategory } from "../entities/item-categorie";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateItemDto {
    @ApiProperty({ example: 'Pizza au pepperonie', description: 'The name of the item'})
    @IsString()
    @IsNotEmpty()
    nom: string;

    @ApiProperty({ example: 'Pizza au pepperonie avec une base de tomate et de fromage', description: 'The description of the item'})
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 12.99, description: 'The price of the item'})
    @IsNotEmpty()
    @IsNumber()
    prix: number;

    @ApiProperty({ example: 'https://www.google.com/pizza.jpg', description: 'The image of the item'})
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({ example: 'PIZZA', description: 'The category of the item'})
    @IsString()
    @IsNotEmpty()
    @IsEnum(ItemCategory)
    categorie: ItemCategory;
}
