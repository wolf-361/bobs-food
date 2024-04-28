import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LoginResponse } from '../../services/auth/login.response';
import { MatStepperModule } from '@angular/material/stepper';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { Client } from '../../dto/user/client';
import { MatRadioModule } from '@angular/material/radio';
import { Restaurent } from '../../dto/restaurent/restaurent';
import { MatSelectModule } from '@angular/material/select';
import { ChangeDetectorRef } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CommandeService } from '../../services/commande/commande.service';
import { Commande } from '../../dto/commande/commande';
import { TypePaiement } from '../../dto/commande/type-paiement';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ItemCommande } from '../../dto/commande/item-commande';
import { TypeCommande } from '../../dto/commande/type-commande';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { PanierComponent } from '../../general/panier/panier.component';



@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatStepperModule,
    MatRadioModule,
    MatSelectModule,
    MatListModule,
    MatChipsModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatListModule,
    MatDividerModule,
    PanierComponent
  ],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.scss'
})
export class CommandeComponent {
  stepperOrientation: Observable<StepperOrientation>;
  isPaiementEnPersonne: boolean = false;

  clientInfoForm: FormGroup = new FormGroup({
    prenom: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    nom: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    courriel: new FormControl('', [Validators.required, Validators.email]),
  });

  livraisonForm: FormGroup = new FormGroup({
    typeCommande: new FormControl('Livraison', [Validators.required]),
    adresse: new FormControl('', [Validators.required]),
  });

  paiementForm: FormGroup = new FormGroup({
    typePaiement: new FormControl(TypePaiement.CARTE, [Validators.required]),
    enPersonne: new FormControl(false),
    titulaireCarteCredit: new FormControl(),
    numeroCarteCredit: new FormControl(),
    dateExpiration: new FormControl(),
    cvcCarteCredit: new FormControl(),
  });

  items: ItemCommande[] = [];

  typesCommande: { value: TypeCommande, viewValue: string }[] = [
    { value: TypeCommande.LIVRAISON, viewValue: 'Livraison' },
    { value: TypeCommande.A_EMPORTER, viewValue: 'Cueillette' },
    { value: TypeCommande.SUR_PLACE, viewValue: 'Sur place' },
  ];

  typesPaiement: { value: TypePaiement, viewValue: string }[] = [
    { value: TypePaiement.CARTE, viewValue: 'Carte de crédit' },
    { value: TypePaiement.ESPECE, viewValue: 'Argent comptant' },
    { value: TypePaiement.CHEQUE, viewValue: 'Par chèque' },
  ];

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private commande: CommandeService,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    this.commande.Items.subscribe(items => {
      // if there are no items, redirect to the menu
      if (items.length === 0) {
        this.router.navigate(['/']);
      }
      this.items = items;
    });
      

    if (this.auth.IsAuthenticated) {
      this.api.getCurrentClient().subscribe(client => {
        this.commande.Client = client;

        // Disable the email field
        this.clientInfoForm.get('courriel')?.disable();

        // Set the values of the form
        this.clientInfoForm.setValue({
          prenom: client.prenom,
          nom: client.nom,
          courriel: client.courriel
        });

        this.livraisonForm.setValue({
          typeCommande: TypeCommande.LIVRAISON,
          adresse: client.adresse
        });

        // Make the adresse field readonly
        this.livraisonForm.get('adresse')?.disable();

        this.paiementForm.setValue({
          typePaiement: TypePaiement.CARTE,
          enPersonne: false,
          titulaireCarteCredit: client.titulaireCarteCredit,
          numeroCarteCredit: client.numeroCarteCredit,
          dateExpiration: client.dateExpirationCarteCredit,
          cvcCarteCredit: client.cvcCarteCredit
        });
      });

      // Put the default values for 

      // Setup the validation for the credit card fields
      this.checkIfCreditIsNeeded();
    }

    // Set the default type of the command
    this.commande.Type = TypeCommande.LIVRAISON;
  }

  handleTypeCommandeChange(value: TypeCommande) {
    this.commande.Type = value;
  }

  handleTypePaiementChange(value: TypePaiement) {
    this.commande.TypeDePaiement = value;
    this.checkIfCreditIsNeeded();
  }

  handleEnPersonneChange(value: boolean) {
    this.isPaiementEnPersonne = value;
    this.checkIfCreditIsNeeded();
  }

  get Adresse(): string {
    return this.livraisonForm.value.adresse || this.commande.Client?.adresse || '';
  }

  get Email(): string {
    return this.clientInfoForm.value.courriel || this.commande.Client?.courriel || '';
  }

  private checkIfCreditIsNeeded() {
    if (this.commande.TypeDePaiement === TypePaiement.CARTE && !this.isPaiementEnPersonne) {
      // Check in person
      this.paiementForm.get('enPersonne')?.setValue(false);
      this.commande.PayerEnPersonne = false;

      // Set the credit card fields as required
      this.paiementForm.get('titulaireCarteCredit')?.setValidators([Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]);
      this.paiementForm.get('numeroCarteCredit')?.setValidators([Validators.required, Validators.pattern(/^[0-9]{16}$/)]);
      this.paiementForm.get('dateExpiration')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)]);
      this.paiementForm.get('cvcCarteCredit')?.setValidators([Validators.required, Validators.pattern(/^[0-9]{3}$/)]);
    } else {
      // Check in person
      this.paiementForm.get('enPersonne')?.setValue(true);
      this.commande.PayerEnPersonne = true;

      // Remove the required validators
      this.paiementForm.get('titulaireCarteCredit')?.clearValidators()
      this.paiementForm.get('numeroCarteCredit')?.clearValidators();
      this.paiementForm.get('dateExpiration')?.clearValidators();
      this.paiementForm.get('cvcCarteCredit')?.clearValidators();
    }

    // Update value and validity
    this.paiementForm.get('titulaireCarteCredit')?.updateValueAndValidity();
    this.paiementForm.get('numeroCarteCredit')?.updateValueAndValidity();
    this.paiementForm.get('dateExpiration')?.updateValueAndValidity();
    this.paiementForm.get('cvcCarteCredit')?.updateValueAndValidity();
  }

  isConnected(): boolean {
    return this.auth.IsAuthenticated;
  }

  get isLivraison(): boolean {
    return this.commande.Type === TypeCommande.LIVRAISON;
  }

  get showCreditCard(): boolean {
    return this.commande.TypeDePaiement === TypePaiement.CARTE && !this.isPaiementEnPersonne;
  }

  /**
 * Getter for easy access to form fields
 * @returns {Object} The form controls
 * @example form['email'].value
 */
  get livraison(): { [key: string]: AbstractControl } {
    return this.livraisonForm.controls;
  }

  get clientInfo(): { [key: string]: AbstractControl } {
    return this.clientInfoForm.controls;
  }

  get paiement(): { [key: string]: AbstractControl } {
    return this.paiementForm.controls;
  }

  verifierClient() {  //  TODO, DOIT CHANGER POUR COMMANDE ET NON CLIENT
    if (!this.livraisonForm.valid || !this.clientInfoForm.valid || !this.paiementForm.valid) {
      return;
    }

    let titulaireCarteCredit: string | null;
    let numeroCarteCredit: string | null;
    let dateExpiration: string | null;
    let cvcCarteCredit: string | null;

    // Si la carte de crédit n'est pas valide (un champs autre que nom vide), on ne l'inclut pas dans le client
    if (this.paiementForm.value.numeroCarteCredit && this.paiementForm.value.dateExpiration && this.paiementForm.value.cvcCarteCredit) {
      // Si le titulaire de la carte n'est pas spécifié, on prend le nom et prénom du client
      if (!this.paiementForm.value.titulaireCarteCredit) {
        this.paiementForm.value.titulaireCarteCredit = this.clientInfoForm.value.prenom + ' ' + this.clientInfoForm.value.nom;
      }

      const date = this.paiementForm.value.dateExpiration.split('/');
    }
  }

  onSubmit() {
    if (!this.livraisonForm.valid || !this.clientInfoForm.valid || !this.paiementForm.valid) {
      return;
    }

    if (!this.auth.IsAuthenticated) {
      this.commande.Client = new Client(
        this.clientInfoForm.value.nom,
        this.clientInfoForm.value.prenom,
        this.livraisonForm.value.adresse,
        this.clientInfoForm.value.courriel,
        false,
        this.paiementForm.value.titulaireCarteCredit,
        this.paiementForm.value.numeroCarteCredit,
        this.paiementForm.value.dateExpiration,
        this.paiementForm.value.cvcCarteCredit
      );
    }

    // Inscrire la commande
    this.commande.submit().then((success) => {
      if (success) {
        this.router.navigate(['/']);
      } else {
        this.snackBar.open('Erreur lors de la création de la commande', 'Fermer', { duration: 5000 });
      }
    });
  }

}