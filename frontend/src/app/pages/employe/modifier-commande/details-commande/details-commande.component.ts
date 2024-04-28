import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from "@angular/material/dialog";
import { Commande } from "../../../../dto/commande/commande";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { ApiService } from "../../../../services/api/api.service";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-details-commande',
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    MatIcon,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './details-commande.component.html',
  styleUrl: './details-commande.component.scss'
})
export class DetailsCommandeComponent {
  commande: Commande;
  adresseForm: FormGroup = new FormGroup({
    adresse: new FormControl()
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { commande: Commande },
    private api: ApiService,
    public dialogRef: MatDialogRef<DetailsCommandeComponent>,
    private snackBar: MatSnackBar
  ) {
    this.commande = data.commande;
    // Set the adresse
    this.adresseForm.setValue({ adresse: this.commande.client?.adresse });
  }

  onClose() {
    this.dialogRef.close();
  }

  onIncrease(index: number) {
    this.commande.items[index].quantite++;
  }

  onDecrease(index: number) {
    // If the quantity is greater than 1, decrease it
    if (this.commande.items[index].quantite > 1) {
      this.commande.items[index].quantite--;
    }
    // If the quantity is 1, remove the item
    else {
      this.commande.items.splice(index, 1);
    }
  }

  onSave() {
    // Use the service to save the new command
    if (this.commande.id != null) {
      this.api.patchCommande(this.commande.id, this.commande).subscribe((commande: Commande) => {
        this.dialogRef.close(commande);
        this.snackBar.open('Commande modifiée avec succès', 'Fermer', { duration: 2000 });
      });
    } else {
      this.dialogRef.close();
      this.snackBar.open('Impossible de modifier une commande non enregistrée', 'Fermer', { duration: 2000 });
    }
  }

}
