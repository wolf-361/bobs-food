import { Component } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle} from "@angular/material/card";
import { Commande } from '../../../dto/commande/commande';
import { ApiService } from '../../../services/api/api.service';
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {Observable} from "rxjs";

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
    MatCardSubtitle
  ],
  templateUrl: './modifier-commande.component.html',
  styleUrl: './modifier-commande.component.scss'
})
export class ModifierCommandeComponent {



  commandes: Commande[] = [];

  constructor(private api: ApiService) {
    this.api.getCommandes().subscribe((commandes: Commande[]) => {
      this.commandes = commandes;
    });

  }

  onEditCommande() {

  }

  onDeleteCommande() {

  }
}
