import { User } from "./user";

export class Client extends User {
    courriel: string;
    estInscrit: boolean;
    titulaireCarteCredit?: string;
    numeroCarteCredit?: string;
    dateExpirationCarteCredit?: string;
    cvcCarteCredit?: string;

    constructor(nom: string, prenom: string, adresse: string, courriel: string, estInscrit: boolean, titulaireCarteCredit?: string, numeroCarteCredit?: string, dateExpirationCarteCredit?: string, cvcCarteCredit?: string, id?: string) {
        super(nom, prenom, adresse, id);
        this.courriel = courriel;
        this.estInscrit = estInscrit;
        this.titulaireCarteCredit = titulaireCarteCredit;
        this.numeroCarteCredit = numeroCarteCredit;
        this.dateExpirationCarteCredit = dateExpirationCarteCredit;
        this.cvcCarteCredit = cvcCarteCredit;
    }
}
