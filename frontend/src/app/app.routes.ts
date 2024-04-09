import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { EmployeComponent } from './pages/employe/employe.component';
import { PanierComponent } from './general/panier/panier.component';
import { LoginComponent } from './pages/connexion/login/login.component';
import { SignupComponent } from './pages/connexion/signup/signup.component';
import { CommandeComponent } from './pages/commande/commande.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'auth', component: ConnexionComponent, children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: SignupComponent },
            { path: 'forgot-password', component: ConnexionComponent }
        ]
    },
    { path: 'commander', component: CommandeComponent },
    { path: 'employer', component: EmployeComponent },
    { path: 'panier', component: PanierComponent },
    { path: '**', redirectTo: '' }
];
