import { EmployeType } from "./employe-type";
import { User } from "./user";

export class Employe extends User {
    employeId: string;
    type: EmployeType;

    constructor(id: string, nom: string, prenom: string, adresse: string, salt: string, hashedPassword: string, employeId: string, type: EmployeType) {
        super(id, nom, prenom, adresse, salt, hashedPassword);
        this.employeId = employeId;
        this.type = type;
    }
}
