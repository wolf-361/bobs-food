export class CreateClientDto {
    email: string;
    nom: string;
    prenom: string;
    adresse: string;
    salt: string;
    hashedPassword: string;
    estInscrit: boolean;
}
