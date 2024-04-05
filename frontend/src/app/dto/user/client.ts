import { User } from "./user";

export class Client extends User {
    courriel: string;
    estInscrit: boolean;
    titulaireCarteCredit: string;
    numeroCarteCredit: string;
    dateExpirationCarteCredit: string;
    cvcCarteCredit: string;

    constructor(id: string, nom: string, prenom: string, adresse: string, salt: string, hashedPassword: string, courriel: string, estInscrit: boolean, titulaireCarteCredit: string, numeroCarteCredit: string, dateExpirationCarteCredit: string, cvcCarteCredit: string) {
        super(id, nom, prenom, adresse, salt, hashedPassword);
        this.courriel = courriel;
        this.estInscrit = estInscrit;
        this.titulaireCarteCredit = titulaireCarteCredit;
        this.numeroCarteCredit = numeroCarteCredit;
        this.dateExpirationCarteCredit = dateExpirationCarteCredit;
        this.cvcCarteCredit = cvcCarteCredit;
    }
}
