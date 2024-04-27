import { TypePaiement } from "./type-paiement";

export class Paiement {
    id: number;
    type: TypePaiement;
    montant: number;
    payerEnPersonne: boolean;

    constructor(id: number, type: TypePaiement, montant: number, payerEnPersonne: boolean) {
        this.id = id;
        this.type = type;
        this.montant = montant;
        this.payerEnPersonne = payerEnPersonne;
    }
}
