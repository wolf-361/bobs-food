import { ApiProperty } from "@nestjs/swagger";
import { EmployeType } from "../entities/employeType";
import { IsAlphanumeric, IsEnum, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { CreateEmployeDto } from "./create-employe.dto";

export class EmployeSignUpDto {
    @ApiProperty({ example: 'TESS0001', description: 'The id of the employe' })
    @IsNotEmpty()
    @IsString()
    @IsAlphanumeric()
    employeId: string;
    
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
    
    @ApiProperty({ example: 'admin', description: 'The type of the employe' })
    @IsNotEmpty()
    @IsEnum(EmployeType)
    type: EmployeType;

    constructor(employeId: string, nom: string, prenom: string, adresse: string, password: string, confirmPassword: string, type: EmployeType){
        this.employeId = employeId;
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.type = type;
    }
}

export function toCreateEmployeDto(signUpDto: EmployeSignUpDto, salt: string, hashedPassword: string){
    const newEmploye = new CreateEmployeDto();
    newEmploye.employeId = signUpDto.employeId;
    newEmploye.nom = signUpDto.nom;
    newEmploye.prenom = signUpDto.prenom;
    newEmploye.adresse = signUpDto.adresse;
    newEmploye.salt = salt;
    newEmploye.hashedPassword = hashedPassword;
    newEmploye.type = signUpDto.type;
    return newEmploye;
}