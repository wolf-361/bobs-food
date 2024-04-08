import { Employe } from "./employe"
import { EmployeType } from "./employe-type";

export class CreateEmploye extends Employe {
    password: string;
    confirmPassword: string;

    constructor(nom: string, prenom: string, adresse: string, employeId: string, type: EmployeType, password: string, confirmPassword: string, id?: string) {
        super(nom, prenom, adresse, employeId, type, id);
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}
