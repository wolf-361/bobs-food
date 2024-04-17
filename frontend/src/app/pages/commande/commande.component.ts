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
import { PanierComponent } from '../../general/panier-items/panier.component';
import { Client } from '../../dto/user/client';
import { MatRadioModule } from '@angular/material/radio';
import { Restaurent } from '../../dto/restaurent/restaurent';
import { MatSelectModule } from '@angular/material/select';
import { ChangeDetectorRef } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CommandeService } from '../../services/commande/commande.service';
import { Commande } from '../../dto/commande/commande';
import { TypeCommande } from '../../dto/commande/type-commande';
import { ItemCommande } from '../../dto/commande/item-commande';
import { TypePaiement } from '../../dto/commande/type-paiement';
import {MatChipsModule} from '@angular/material/chips';
import { MatTooltipModule}  from '@angular/material/tooltip';



@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [ CommonModule,
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
    PanierComponent,
    MatChipsModule,
    MatTooltipModule
],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.scss'
})
export class CommandeComponent implements OnInit  {
  
  total: number = 0;
  selectedValue: string = 'Livraison';
  selectedValuePaiement: string = ''
  selectedValueTypePaiement: string = '';
  value: string = '';
  enteredAddress: string = '';
  isPaiementEnPersonne: boolean = false;

  
  

  foods: Restaurent[] = [
    {
      id: 'Restaurent A', adresse: '100 Rue Alpes',
      menu: []
    },
    {
      id: 'Restaurent B', adresse:  '200 Rue Alpes',
      menu: []
    } ,
    {
      id: 'Restaurent C', adresse: '300 Rue Alpes',
      menu: []
    },
  ];
  



  clientInfoForm: FormGroup = new FormGroup({
    prenom: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    nom: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    courriel: new FormControl('', [Validators.required, Validators.email]),
  });

  livraisonForm: FormGroup = new FormGroup({
    typeLivraison: new FormControl('Livraison', [Validators.required]),
    adresseLivraison: new FormControl('', [Validators.required]),
  });

  creditCardForm: FormGroup = new FormGroup({
    typePaiement: new FormControl('', [Validators.required]),
    typePaiementDistance:  new FormControl('', [Validators.required]),
    titulaireCarteCredit: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]), 
    numeroCarteCredit: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]),
    dateExpiration: new FormControl('', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)]),
    cvcCarteCredit: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{3}$/)]),
  });
  
  


  stepperOrientation: Observable<StepperOrientation>;
  client?: Client;
  commande?: Commande;


  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private changeDetectorRef: ChangeDetectorRef,
    private commandeService: CommandeService,
    breakpointObserver: BreakpointObserver
  ) { 
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  handleSelectionChange(value: string) {
    if (value === 'Livraison') {
      this.livraisonForm.get('adresseLivraison')?.reset();
    }
  
    this.selectedValue = value;
    this.changeDetectorRef.detectChanges(); 
  }

  handleSelectionChangePaiement(value: string) {
    const typePaiementControl = this.creditCardForm.get('typePaiement');
    if (typePaiementControl) {
        typePaiementControl.reset();
        this.selectedValuePaiement = value;
        this.changeDetectorRef.detectChanges();

        if (this.selectedValuePaiement === 'En Personne') {
            const titulaireCarteCreditControl = this.creditCardForm.get('titulaireCarteCredit');
            const numeroCarteCreditControl = this.creditCardForm.get('numeroCarteCredit');
            const dateExpirationControl = this.creditCardForm.get('dateExpiration');
            const cvcCarteCreditControl = this.creditCardForm.get('cvcCarteCredit');

            if (titulaireCarteCreditControl) {
                titulaireCarteCreditControl.clearValidators();
                titulaireCarteCreditControl.updateValueAndValidity();
            }
            if (numeroCarteCreditControl) {
                numeroCarteCreditControl.clearValidators();
                numeroCarteCreditControl.updateValueAndValidity();
            }
            if (dateExpirationControl) {
                dateExpirationControl.clearValidators();
                dateExpirationControl.updateValueAndValidity();
            }
            if (cvcCarteCreditControl) {
                cvcCarteCreditControl.clearValidators();
                cvcCarteCreditControl.updateValueAndValidity();
            }
        }

        if (this.selectedValuePaiement === 'En ligne') {
            const titulaireCarteCreditControl = this.creditCardForm.get('titulaireCarteCredit');
            const numeroCarteCreditControl = this.creditCardForm.get('numeroCarteCredit');
            const dateExpirationControl = this.creditCardForm.get('dateExpiration');
            const cvcCarteCreditControl = this.creditCardForm.get('cvcCarteCredit');

            if (titulaireCarteCreditControl) {
                titulaireCarteCreditControl.setValidators([Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]);
                titulaireCarteCreditControl.updateValueAndValidity();
            }
            if (numeroCarteCreditControl) {
                numeroCarteCreditControl.setValidators([Validators.required, Validators.pattern(/^[0-9]{16}$/)]);
                numeroCarteCreditControl.updateValueAndValidity();
            }
            if (dateExpirationControl) {
                dateExpirationControl.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)]);
                dateExpirationControl.updateValueAndValidity();
            }
            if (cvcCarteCreditControl) {
                cvcCarteCreditControl.setValidators([Validators.required, Validators.pattern(/^[0-9]{3}$/)]);
                cvcCarteCreditControl.updateValueAndValidity();
            }
        }
    }
}

handleSelectionChangeTypePaiement(value: string) {
  this.selectedValueTypePaiement = value;
   this.changeDetectorRef.detectChanges(); 
}

copyAddress(input: HTMLInputElement) {
  input.value = this.enteredAddress;
}

ngOnInit(): void {
 
}

isAddressFilled(): boolean {
  return this.livraisonForm.get('adresseLivraison')?.value !== '';
}

 
  /**
 * Getter for easy access to form fields
 * @returns {Object} The form controls
 * @example form['email'].value
 */
  get signup(): { [key: string]: AbstractControl } {
    return this.livraisonForm.controls;
  }

  get clientInfo(): { [key: string]: AbstractControl } {
    return this.clientInfoForm.controls;
  }

  get creditCard(): { [key: string]: AbstractControl } {
    return this.creditCardForm.controls;
  }

  // Vérifier si le client est déjà inscrit
  verifierSignup() {
  
    // Vérifier si le client est déjà inscrit
    this.api.getClient(this.livraisonForm.value.courriel).subscribe(
      (response) => {
        // Si le client n'est pas inscrit, on affiche un message de succès
        if (response === null) {
          return
        }
        // Si le client est déjà inscrit, on affiche un message d'erreur
        this.snackBar.open('Le client est déjà inscrit', 'Fermer', { duration: 5000 });
      },
    );
  }

  verifierClientInfo() {
    if (!this.clientInfoForm.valid) {
      this.snackBar.open('Veuillez remplir tous les champs', 'Fermer', { duration: 5000 });
      return;
    }
  }

  verifierCreditCard() {
    

    // Vérifier que si un champs as été touché, les autres champs sont remplis (note le nom peut être vide si on prend le nom et prénom du client (mettre case à cocher))
    if (this.creditCardForm.touched) {
      // Si un champs est rempli, tous les champs doivent être remplis
      if (this.creditCardForm.value.titulaireCarteCredit != '' || this.creditCardForm.value.numeroCarteCredit != '' || this.creditCardForm.value.dateExpiration != '' || this.creditCardForm.value.cvcCarteCredit != '') {
        if (!this.creditCardForm.value.titulaireCarteCredit || !this.creditCardForm.value.numeroCarteCredit || !this.creditCardForm.value.dateExpiration || !this.creditCardForm.value.cvcCarteCredit) {
          this.snackBar.open('Veuillez remplir tous les champs', 'Fermer', { duration: 5000 });
          return;
        }
      }
    }
  }

  verifierClient() {  //  TODO, DOIT CHANGER POUR COMMANDE ET NON CLIENT
    if (!this.livraisonForm.valid || !this.clientInfoForm.valid || !this.creditCardForm.valid) {
      return;
    }

    let titulaireCarteCredit: string | null;
    let numeroCarteCredit: string | null;
    let dateExpiration: string | null;
    let cvcCarteCredit: string | null;

    // Si la carte de crédit n'est pas valide (un champs autre que nom vide), on ne l'inclut pas dans le client
    if (this.creditCardForm.value.numeroCarteCredit && this.creditCardForm.value.dateExpiration && this.creditCardForm.value.cvcCarteCredit) {
      // Si le titulaire de la carte n'est pas spécifié, on prend le nom et prénom du client
      if (!this.creditCardForm.value.titulaireCarteCredit) {
        this.creditCardForm.value.titulaireCarteCredit = this.clientInfoForm.value.prenom + ' ' + this.clientInfoForm.value.nom;
      }

      const date = this.creditCardForm.value.dateExpiration.split('/');

      this.client = {
        courriel: this.livraisonForm.value.courriel,
        prenom: this.clientInfoForm.value.prenom,
        nom: this.clientInfoForm.value.nom,
        estInscrit: true,
        adresse: this.clientInfoForm.value.adresseLivraison,
        titulaireCarteCredit: this.creditCardForm.value.titulaireCarteCredit,
        numeroCarteCredit: this.creditCardForm.value.numeroCarteCredit,
        dateExpirationCarteCredit: this.creditCardForm.value.dateExpiration,
        cvcCarteCredit: this.creditCardForm.value.cvcCarteCredit,
      };
    } else {
      this.client = {
        courriel: this.livraisonForm.value.courriel,
        prenom: this.clientInfoForm.value.prenom,
        nom: this.clientInfoForm.value.nom,
        estInscrit: true,
        adresse: this.clientInfoForm.value.adresse,
      };
    }
  }

  verifierCommande(){
    if (!this.livraisonForm.valid || !this.clientInfoForm.valid || !this.creditCardForm.valid) {
      return;
    }

    let titulaireCarteCredit: string | null;
    let numeroCarteCredit: string | null;
    let dateExpiration: string | null;
    let cvcCarteCredit: string | null;

    // Si la carte de crédit n'est pas valide (un champs autre que nom vide), on ne l'inclut pas dans le client
    if (this.creditCardForm.value.numeroCarteCredit && this.creditCardForm.value.dateExpiration && this.creditCardForm.value.cvcCarteCredit) {
      // Si le titulaire de la carte n'est pas spécifié, on prend le nom et prénom du client
      if (!this.creditCardForm.value.titulaireCarteCredit) {
        this.creditCardForm.value.titulaireCarteCredit = this.clientInfoForm.value.prenom + ' ' + this.clientInfoForm.value.nom;
      }

      const date = this.creditCardForm.value.dateExpiration.split('/');

      this.commande = {
        type: this.livraisonForm.value.typeLivraison,
        total: 0,
        date: new Date(),
        items: [],
        client: this.client,
        paiement: {
          id: 0,
          type: TypePaiement.CARTE,
          montant: 0
        }
      }
    } 
  }

  onSubmitClient() {  // TODO, sauve les informations du client
    if (!this.livraisonForm.valid || !this.clientInfoForm.valid || !this.creditCardForm.valid) {
      return;
    }
  
    this.verifierClient();
  
    if (!this.client) {
      return;
    }
  }

  
  onSubmitCommande() {  // TODO, permet d'enregistrer la commande
    if (!this.livraisonForm.valid || !this.clientInfoForm.valid || !this.creditCardForm.valid) {
      return;
    }
    
    this.verifierCommande(); // Vérifier les informations du client (etre certain que le client est fait )

    if (!this.client) {
      return;
    }

    // Inscrire la commande
    


  }

  /**
   * Handle the http success response from the signup request
   * @param response The response to handle
   */
  private handleSignupSuccess(response: LoginResponse): void {
    // Store the session in the auth service
    this.auth.Session = response;

    // Redirect to the home
    this.router.navigate(['/']);   
  }

  /**
   * Handle the http error response from the signup request
   * @param error The error to handle
   */
  private handleSignupError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.snackBar.open('Email ou mot de passe invalide', 'Fermer', { duration: 5000 });
      // Clear the fields
      this.livraisonForm.reset();
    }

    if (error.status === 404) {
      this.snackBar.open('Utilisateur introuvable', 'Fermer', { duration: 5000 });
      this.livraisonForm.reset();
    }
    
    if (error.status === 500) {
      this.snackBar.open('Erreur interne du serveur', 'Fermer', { duration: 5000 });
    }
  }

}