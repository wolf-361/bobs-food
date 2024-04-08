export class User {
    id?: string;
    nom: string;
    prenom: string;
    adresse: string;

    constructor(nom: string, prenom: string, adresse: string, id?: string) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
    }
}
