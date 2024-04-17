import { Component } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle} from "@angular/material/card";
import { Commande } from '../../../dto/commande/commande';
import { ApiService } from '../../../services/api/api.service';
import {DatePipe, NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DetailsCommandeComponent} from "./details-commande/details-commande.component";

@Component({
  selector: 'app-modifier-commande',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    NgForOf,
    MatButton,
    MatCardHeader,
    MatCardSubtitle,
    DatePipe
  ],
  templateUrl: './modifier-commande.component.html',
  styleUrl: './modifier-commande.component.scss'
})
export class ModifierCommandeComponent {
  commandes: Commande[] = [];

  constructor(
    private api: ApiService,
    public dialog: MatDialog
  ) {
    this.api.getCommandes().subscribe((commandes: Commande[]) => {
      this.commandes = commandes;
    });

  }

  onEditCommande(index: number) {

    // Récupération de la commande à modifier
    let commande = this.commandes[index];

    // Sauvegarde de la commande originale (deep copy pour éviter les références)
    let originalCommande = JSON.parse(JSON.stringify(commande));

    // Ouverture de la fenêtre de modification de la commande (Dialog)
    let dialogRef = this.dialog.open(DetailsCommandeComponent, {
      data: {
        commande: commande
      }
    });

    // Si l'utilisateur appuie sur "Cancel"
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) {
        // On restaure la commande originale
        this.commandes[index] = originalCommande;
      }
    });

  }

  onDeleteCommande(index: number) {
    // TODO: Demander confirmation à l'utilisateur

    // TODO: Supprimer la commande avec l'API
  }
}
