import { ApiProperty } from "@nestjs/swagger";
import { EmployeType } from "../entities/employeType";
import { IsAlphanumeric, IsEnum, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { CreateEmployeDto } from "./create-employe.dto";

export class SignUpDto {
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

    toCreateEmployeDto(salt: string, hashedPassword: string): CreateEmployeDto {
        const newEmploye = new CreateEmployeDto();
        newEmploye.employeId = this.employeId;
        newEmploye.nom = this.nom;
        newEmploye.prenom = this.prenom;
        newEmploye.adresse = this.adresse;
        newEmploye.salt = salt;
        newEmploye.hashedPassword = hashedPassword;
        newEmploye.type = this.type;
        return newEmploye;
    }
}