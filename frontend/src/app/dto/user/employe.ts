import { EmployeType } from "./employe-type";
import { User } from "./user";

export class Employe extends User {
    employeId: string;
    type: EmployeType;

    constructor(nom: string, prenom: string, adresse: string, employeId: string, type: EmployeType, id?: string) {
        super(nom, prenom, adresse, id);
        this.employeId = employeId;
        this.type = type;
    }
}
