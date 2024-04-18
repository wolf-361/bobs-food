import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Commande } from '../../../../dto/commande/commande';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmer-supression',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './confirmer-supression.component.html',
  styleUrl: './confirmer-supression.component.scss'
})
export class ConfirmerSupressionComponent {
  commande: Commande;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { commande: Commande },
    public dialogRef: MatDialogRef<ConfirmerSupressionComponent>
  ) {
    this.commande = data.commande;
  }

  onClose() {
    this.dialogRef.close({
      confirm: false
    });
  }

  onConfirm() {
    this.dialogRef.close({
      confirm: true
    });
  }
}
