export class CreateClientDto {
    courriel: string;
    nom: string;
    prenom: string;
    adresse: string;
    salt: string;
    hashedPassword: string;
    estInscrit: boolean;
}
