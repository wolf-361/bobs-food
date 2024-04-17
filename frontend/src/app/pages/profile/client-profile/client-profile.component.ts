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
import { ChangePasswordComponent } from '../dialogs/change-password/change-password.component';

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
    courriel: new FormControl({ value: '', disabled: true }),
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
    // Prevent initial focus on the close button
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      autoFocus: false,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Mot de passe changé', 'Fermer', {
          duration: 5000
        });
      }
    });
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

  private verifieCreditCard() {
    // Si tous les champs sont null
    if (this.form['titulaireCarteCredit'].value === null && this.form['numeroCarteCredit'].value === null && this.form['dateExpirationCarteCredit'].value === null && this.form['cvcCarteCredit'].value === null) {
      this.carteDeCreditVisible = false;
      return; // On ne fait rien
    }

    // Si au moins 1 champs est null
    if (this.form['titulaireCarteCredit'].value === null || this.form['numeroCarteCredit'].value === null || this.form['dateExpirationCarteCredit'].value === null || this.form['cvcCarteCredit'].value === null) {
      this.carteDeCreditVisible = false;
      // Sauvegarder les valeurs de la carte de crédit pour les remettre si le user annule
      const titulaireCarteCredit = this.form['titulaireCarteCredit'].value;
      const numeroCarteCredit = this.form['numeroCarteCredit'].value;
      const dateExpirationCarteCredit = this.form['dateExpirationCarteCredit'].value;
      const cvcCarteCredit = this.form['cvcCarteCredit'].value;

      // Réinitialiser les champs de la carte de crédit
      this.form['titulaireCarteCredit'].setValue('');
      this.form['numeroCarteCredit'].setValue('');
      this.form['dateExpirationCarteCredit'].setValue('');
      this.form['cvcCarteCredit'].setValue('');

      
      // Avertir le user et lui donner la chance de re montrer la carte de crédit
      const snackBarRef = this.snackBar.open('La carte de crédit est cachée car un ou plusieurs champs sont vides', 'Annuler', {
        duration: 5000
      });
      
      // Si il annule
      snackBarRef.onAction().subscribe(() => {
        this.carteDeCreditVisible = true;
        this.form['titulaireCarteCredit'].setValue(titulaireCarteCredit);
        this.form['numeroCarteCredit'].setValue(numeroCarteCredit);
        this.form['dateExpirationCarteCredit'].setValue(dateExpirationCarteCredit);
        this.form['cvcCarteCredit'].setValue(cvcCarteCredit);
      });
    }
    
    // Si tous les champs sont remplis mettre à jour le user
    // Tout est beau
  }

  onSubmit() {
    if (this.clientForm.invalid) {
      return;
    }

    // Vérifier la carte de crédit
    this.verifieCreditCard();

    // Vérifier le client
    if (this.clientForm.value.courriel === '' || this.clientForm.value.nom === '' || this.clientForm.value.prenom === '' || this.clientForm.value.adresse === '') {
      this.snackBar.open('Veuillez remplir tous les champs', 'Fermer', {
        duration: 5000
      });
      return;
    }

    // Update the client
    this.client.prenom = this.clientForm.value.prenom;
    this.client.nom = this.clientForm.value.nom;
    this.client.adresse = this.clientForm.value.adresse;
    if (this.carteDeCreditVisible) {
      this.client.titulaireCarteCredit = this.clientForm.value.titulaireCarteCredit;
      this.client.numeroCarteCredit = this.clientForm.value.numeroCarteCredit;
      this.client.dateExpirationCarteCredit = this.clientForm.value.dateExpirationCarteCredit;
      this.client.cvcCarteCredit = this.clientForm.value.cvcCarteCredit;
    }

    this.api.updateCurrentClient(this.client).subscribe({
      next: (client) => {
        this.snackBar.open('Profil mis à jour', 'Fermer', {
          duration: 5000
        });
      },
      error: (error) => {
        this.snackBar.open('Erreur lors de la mise à jour du profil', 'Fermer', {
          duration: 5000
        });
      }
    });
  }
}
