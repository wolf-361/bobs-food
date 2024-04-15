import { Component } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { Employe } from '../../../dto/user/employe';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EmployeType } from '../../../dto/user/employe-type';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-employe-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './employe-profile.component.html',
  styleUrl: './employe-profile.component.scss'
})
export class EmployeProfileComponent {
  employer!: Employe;

  employerForm: FormGroup = new FormGroup({
    // Disabled and readonly fields
    employeId: new FormControl({value: '', disabled: true}),
    role: new FormControl({value: '', disabled: true}),
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    adresse: new FormControl('', [Validators.required])
  });

  constructor(
    private api: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { 
    this.api.getCurrentEmploye().subscribe({
      next: (employe) => {
        this.employer = employe;
        this.employerForm.setValue({
          employeId: employe.employeId,
          role: employe.type,
          nom: employe.nom,
          prenom: employe.prenom,
          adresse: employe.adresse
        });
      },
      error: (error) => this.router.navigate(['/auth/login'])
    });
  }

  get form() {
    return this.employerForm.controls;
  }

  onSubmit() {
    if (!this.employerForm.valid) {
      return;
    }
    
    // Check for empty or null values
    if (this.employerForm.value.nom === null || this.employerForm.value.nom === '') {
      this.snackBar.open('Le nom ne peut pas être vide', 'Fermer', {
        duration: 5000
      });
      return;
    }

    if (this.employerForm.value.prenom === null || this.employerForm.value.prenom === '') {
      this.snackBar.open('Le prénom ne peut pas être vide', 'Fermer', {
        duration: 5000
      });
      return;
    }

    if (this.employerForm.value.adresse === null || this.employerForm.value.adresse === '') {
      this.snackBar.open('L\'adresse ne peut pas être vide', 'Fermer', {
        duration: 5000
      });
      return;
    }

    // Check if the form has been modified
    if (this.employerForm.value.nom === this.employer.nom &&
        this.employerForm.value.prenom === this.employer.prenom &&
        this.employerForm.value.adresse === this.employer.adresse) {
      this.snackBar.open('Aucune modification détectée', 'Fermer', {
        duration: 5000
      });
      return;
    }

    // Update the employe
    this.employer.nom = this.employerForm.value.nom;
    this.employer.prenom = this.employerForm.value.prenom;
    this.employer.adresse = this.employerForm.value.adresse;

    // Update the employe
    this.api.updateEmploye(this.employer.employeId, this.employerForm.value).subscribe({
      next: (employe) => {    
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
