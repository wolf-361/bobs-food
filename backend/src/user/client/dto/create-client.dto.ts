export class CreateClientDto {
    nom: string;
    prenom: string;
    adresse: string;
    salt: string;
    hashedPassword: string;
    estInscrit: boolean;
}
