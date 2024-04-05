export class User {
    id: string;
    nom: string;
    prenom: string;
    adresse: string;
    salt: string;
    hashedPassword: string;

    constructor(id: string, nom: string, prenom: string, adresse: string, salt: string, hashedPassword: string) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.salt = salt;
        this.hashedPassword = hashedPassword;
    }
}
