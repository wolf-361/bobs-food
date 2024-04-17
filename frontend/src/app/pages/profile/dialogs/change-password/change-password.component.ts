import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../../../services/api/api.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/), Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl('', [Validators.required, confirmPasswordValidator('newPassword')]),
  });

  constructor(
    private snackBar: MatSnackBar,
    private api: ApiService,
    private auth: AuthService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>
  ) { }

  get form(): { [key: string]: AbstractControl } {
    return this.changePasswordForm.controls;
  }

  changePassword(): void {
    // Check if the form is valid
    if (this.changePasswordForm.invalid) {
      this.snackBar.open('Veuillez remplir tous les champs correctement.', 'Fermer', { duration: 3000 });
      return;
    }

    const oldPassword = this.changePasswordForm.value.oldPassword;
    const newPassword = this.changePasswordForm.value.newPassword;
    const confirmPassword = this.changePasswordForm.value.confirmPassword;

    // Check if the new password and confirm password are the same
    if (newPassword !== confirmPassword) {
      this.snackBar.open('Les mots de passe ne correspondent pas.', 'Fermer', { duration: 3000 });
      return;
    }

    // Check the usertype
    if (this.auth.Role === 'client') {
      this.api.updateCurrentClientPassword(oldPassword, newPassword).subscribe({
        next: () => this.onSucess(),
        error: (error: HttpErrorResponse) => this.onError(error)
      });
    } else {
      this.api.updateCurrentEmployePassword(oldPassword, newPassword).subscribe({
        next: () => this.onSucess(),
        error: (error: HttpErrorResponse) => this.onError(error)
      });
    }
  }

  private onSucess(): void {
    this.snackBar.open('Mot de passe changé avec succès.', 'Fermer', { duration: 3000 });
    this.dialogRef.close();
  }

  private onError(error: HttpErrorResponse): void {
    if (error.status === 401) {
      this.snackBar.open('Mot de passe actuel incorrect.', 'Fermer', { duration: 3000 });
      // Empty the old password field
      this.form['oldPassword'].setValue('');      
      // Put the wrongPassword error on the old password field
      this.form['oldPassword'].setErrors({ wrongPassword: true });
    } else {
      this.snackBar.open('Une erreur est survenue.', 'Fermer', { duration: 3000 });
    }
  }

}

function confirmPasswordValidator(controlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Get the password control
    const password = control.root.get(controlName)?.value;

    // Return if the confirm password control is not empty. And if the password and confirm password controls values are the same
    const forbidden = control.value !== password;
    return password && forbidden ? { mismatch: true } : null;
  };
}
