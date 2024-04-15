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
import {MatIconButton} from "@angular/material/button";


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
    MatIconButton
  ],
  templateUrl: './details-commande.component.html',
  styleUrl: './details-commande.component.scss'
})
export class DetailsCommandeComponent {
  selectedItem: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { commande: Commande }, public dialogRef: MatDialogRef<DetailsCommandeComponent>) {
    console.log(data.commande.items.length);
    console.log(data.commande.items[0].quantite); //Retourne undefined
    console.log(data.commande.items[1].quantite); //Retourne undefined
  }

  onClose() {
    this.dialogRef.close();
  }

  onEdit() {

  }

  onDelete(item: ItemCommande) {

  }

  onIncrease(item: ItemCommande) {
    item.quantite++;
  }

  onDecrease(item: ItemCommande) {
    if (item.quantite > 1) {
      item.quantite--;
    }
    else {
      this.data.commande.items = this.data.commande.items.filter(i => i !== item);
      // TODO : Save the new list
    }
  }

  onSave() {

  }

}
