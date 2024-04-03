import { EmployeType } from "../entities/employeType";

export class CreateEmployeDto {
    employeId: string;
    nom: string;
    prenom: string;
    adresse: string;
    salt: string;
    hashedPassword: string;
    type: EmployeType;
}
