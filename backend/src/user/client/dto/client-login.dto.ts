import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class ClientLoginDto {
    @ApiProperty({ example: 'john.doe@hotmail.com', description: 'The email of the client' })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    courriel: string;

    @ApiProperty({ example: 'S0meP4ssword', description: 'The password of the client' })
    @IsNotEmpty()
    @IsString()
    password: string;
}