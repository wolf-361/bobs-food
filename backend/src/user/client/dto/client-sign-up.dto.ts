import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsAlphanumeric, IsEmail, IsStrongPassword, IsCreditCard } from "class-validator";
import { CreateClientDto } from "./create-client.dto";

export class ClientSignUpDto {
    @ApiProperty({ example: 'john.doe@hotmail.com', description: 'The email of the client' })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    courriel: string;

    @ApiProperty({ example: false, description: 'If the client wants to retain information' })
    @IsNotEmpty()
    estInscrit: boolean;

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

    @ApiProperty({ example: 'John Doe', description: 'The name on the credit card', nullable: true })
    titulaireCarteCredit: string;

    @ApiProperty({ example: '1234567891234567', description: 'The credit card number', nullable: true })
    @IsCreditCard()
    numeroCarteCredit: string;

    @ApiProperty({ example: '12/23', description: 'The expiration date of the credit card', nullable: true })
    dateExpirationCarteCredit: string;

    @ApiProperty({ example: '123', description: 'The CVC of the credit card', nullable: true })
    cvcCarteCredit: string;

    constructor(courriel: string, estInscrit: boolean, nom: string, prenom: string, adresse: string, password: string, confirmPassword: string, titulaireCarteCredit?: string, numeroCarteCredit?: string, dateExpirationCarteCredit?: string, cvcCarteCredit?: string){
        this.courriel = courriel;
        this.estInscrit = estInscrit;
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.titulaireCarteCredit = titulaireCarteCredit;
        this.numeroCarteCredit = numeroCarteCredit;
        this.dateExpirationCarteCredit = dateExpirationCarteCredit;
        this.cvcCarteCredit = cvcCarteCredit;
    }
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