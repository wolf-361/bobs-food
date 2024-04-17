import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {MatCardTitle} from "@angular/material/card";
import {Commande} from "../../../../dto/commande/commande";
import {FormsModule} from "@angular/forms";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem, MatListOption, MatSelectionList} from "@angular/material/list";
import {ItemCommande} from "../../../../dto/commande/item-commande";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {ApiService} from "../../../../services/api/api.service";


@Component({
  selector: 'app-details-commande',
  standalone: true,
  imports: [
    MatDialogContent,
    MatCardTitle,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    MatRadioButton,
    MatRadioGroup,
    MatIcon,
    MatSelectionList,
    MatListOption,
    MatList,
    MatListItem,
    MatButtonModule
  ],
  templateUrl: './details-commande.component.html',
  styleUrl: './details-commande.component.scss'
})
export class DetailsCommandeComponent {

  commande: Commande;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { commande: Commande },
    private api: ApiService,
    public dialogRef: MatDialogRef<DetailsCommandeComponent>
  ) {
    this.commande = data.commande;
    console.log("Quantité recu au début: " + this.commande.items[0].quantite);
  }

  onClose() {
    this.dialogRef.close();
  }

  onEdit() {

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


  }

}
