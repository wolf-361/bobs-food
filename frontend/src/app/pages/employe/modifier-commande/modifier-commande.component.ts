import { Component } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle} from "@angular/material/card";
import { Commande } from '../../../dto/commande/commande';
import { ApiService } from '../../../services/api/api.service';
import {DatePipe, NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DetailsCommandeComponent} from "./details-commande/details-commande.component";
import { ConfirmerSupressionComponent } from './confirmer-supression/confirmer-supression.component';

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
      autoFocus: false,
      data: {
        commande: originalCommande
      }
    });

    // Gestion de la fermeture de la fenêtre de modification
    dialogRef.afterClosed().subscribe((result: Commande) => {
      if (result) {
        // Mise à jour de la commande dans la liste
        this.commandes[index] = result;
      }
    });
  }

  onDeleteCommande(index: number) {
    let dialogRef = this.dialog.open(ConfirmerSupressionComponent, {
      autoFocus: false,
      data: {
        commande: this.commandes[index]
      }
    });

    // Gestion de la fermeture de la fenêtre de confirmation
    dialogRef.afterClosed().subscribe((result: { confirm: boolean }) => {
      if (result.confirm) {
        const id = this.commandes[index].id;

        // Assert id is not null
        if (id == null) {
          throw new Error('Commande ID is null');
        }

        this.api.deleteCommande(id).subscribe(() => {
          this.commandes.splice(index, 1);
        });
      }
    });
  }
}
