import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsAlphanumeric, IsEmail, IsStrongPassword } from "class-validator";
import { CreateClientDto } from "./create-client.dto";

export class ClientSignUpDto {
    @ApiProperty({ example: 'john.doe@hotmail.com', description: 'The email of the client' })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    courriel: string;

    @ApiProperty({ example: 'John', description: 'The name of the client' })
    @IsNotEmpty()
    @IsString()
    @IsAlphanumeric()
    nom: string;

    @ApiProperty({ example: 'Doe', description: 'The surname of the client' })
    @IsNotEmpty()
    @IsString()
    @IsAlphanumeric()
    prenom: string;

    @ApiProperty({ example: '123 rue de la rue', description: 'The address of the client' })
    @IsNotEmpty()
    @IsString()
    adresse: string;

    @ApiProperty({ example: 'S0meP4ssword', description: 'The password of the client' })
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string;

    @ApiProperty({ example: 'S0meP4ssword', description: 'The confirmation of the password of the client' })
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    confirmPassword: string;
}

export function toCreateClientDto(signUpDto: ClientSignUpDto, salt: string, hashedPassword: string){
    const newClient = new CreateClientDto();
    newClient.courriel = signUpDto.courriel;
    newClient.nom = signUpDto.nom;
    newClient.prenom = signUpDto.prenom;
    newClient.adresse = signUpDto.adresse;
    newClient.salt = salt;
    newClient.hashedPassword = hashedPassword;
    newClient.estInscrit = false;
    return newClient;
}