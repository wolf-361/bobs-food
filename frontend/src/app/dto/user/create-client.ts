import { Client } from "./client";

export class CreateClient extends Client {
    password: string;
    confirmPassword: string;

    constructor(nom: string, prenom: string, adresse: string, courriel: string, estInscrit: boolean, password: string, confirmPassword: string, titulaireCarteCredit?: string, numeroCarteCredit?: string, dateExpirationCarteCredit?: string, cvcCarteCredit?: string, id?: string) {
        super(nom, prenom, adresse, courriel, estInscrit, titulaireCarteCredit, numeroCarteCredit, dateExpirationCarteCredit, cvcCarteCredit, id);
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}