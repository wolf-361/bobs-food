import { Component } from '@angular/core';
import { Client } from '../../../dto/user/client';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDeleteComponent } from '../dialogs/confirm-delete/confirm-delete.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.scss'
})
export class ClientProfileComponent {
  client!: Client;
  carteDeCreditVisible: boolean = false;

  clientForm: FormGroup = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    adresse: new FormControl('', [Validators.required]),
    courriel: new FormControl('', [Validators.required, Validators.email]),
    titulaireCarteCredit: new FormControl(''),
    numeroCarteCredit: new FormControl(''),
    dateExpirationCarteCredit: new FormControl(''),
    cvcCarteCredit: new FormControl('')
  });

  constructor(
    private api: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.api.getCurrentClient().subscribe({
      next: (client) => {
        this.client = client;

        this.clientForm.setValue({
          nom: client.nom,
          prenom: client.prenom,
          adresse: client.adresse,
          courriel: client.courriel,
          titulaireCarteCredit: client.titulaireCarteCredit,
          numeroCarteCredit: client.numeroCarteCredit,
          dateExpirationCarteCredit: client.dateExpirationCarteCredit,
          cvcCarteCredit: client.cvcCarteCredit
        });

        if (client.numeroCarteCredit !== null && client.dateExpirationCarteCredit !== null && client.cvcCarteCredit !== null) {
          this.carteDeCreditVisible = true;
        }
      },
      error: (error) => {
        this.router.navigate(['/auth/login']);
      }
    });
  }
  
  get form() {
    return this.clientForm.controls;
  }

  toggleCarteDeCredit() {
    this.carteDeCreditVisible = !this.carteDeCreditVisible;
  }
  
  onChangePassword() {
    
  }

  onDelete() {
    // Prevent initial focus on the close button
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '400px',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.deleteCurrentClient().subscribe({
          next: (client) => {
            this.snackBar.open('Compte supprimé', 'Fermer', {
              duration: 5000
            });
            this.router.navigate(['/auth/login']);
          },
          error: (error) => {
            this.snackBar.open('Erreur lors de la suppression du compte', 'Fermer', {
              duration: 5000
            });
          }
        });
      }
    });
  }

  onReset() {
    this.clientForm.setValue({
      nom: this.client.nom,
      prenom: this.client.prenom,
      adresse: this.client.adresse,
      courriel: this.client.courriel,
      titulaireCarteCredit: this.client.titulaireCarteCredit,
      numeroCarteCredit: this.client.numeroCarteCredit,
      dateExpirationCarteCredit: this.client.dateExpirationCarteCredit,
      cvcCarteCredit: this.client.cvcCarteCredit
    });
    this.snackBar.open('Champs réinitialisés', 'Fermer', {
      duration: 5000
    });
  }

  onSubmit() {
    if (this.clientForm.invalid) {
      return;
    }

  }
}
