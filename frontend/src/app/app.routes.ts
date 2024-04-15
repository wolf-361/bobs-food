import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { EmployeComponent } from './pages/employe/employe.component';
import { PanierComponent } from './general/panier/panier.component';
import { LoginComponent } from './pages/connexion/login/login.component';
import { SignupComponent } from './pages/connexion/signup/signup.component';
import { CommandeComponent } from './pages/commande/commande.component';
import { CreationEmployeComponent } from './pages/employe/creation-employe/creation-employe.component';
import { roleGuard } from './guards/role/role.guard';
import { ModifierCommandeComponent } from './pages/employe/modifier-commande/modifier-commande.component';
import { ModifierMenuComponent } from './pages/employe/modifier-menu/modifier-menu.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'auth', component: ConnexionComponent, children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: SignupComponent },
            { path: 'forgot-password', component: ConnexionComponent }
        ]
    },
    { path: 'profile', component: ProfileComponent, canActivate: [roleGuard], data: { role: 'client, employe, gestionnaire, admin, proprietaire' } },
    { path: 'commander', component: CommandeComponent },
    { path: 'employer', component: EmployeComponent, children: [
        { path: 'create', component: CreationEmployeComponent, canActivate: [roleGuard], data: { role: 'gestionnaire, admin, proprietaire' } },
        { path: 'modify-command', component: ModifierCommandeComponent, canActivate: [roleGuard], data: { role: 'employe, gestionnaire, admin, proprietaire'} },
        { path: 'modify-menu', component: ModifierMenuComponent, canActivate: [roleGuard], data: { role: 'gestionnaire, admin, proprietaire'} },
    ], canActivate: [roleGuard], data: { role: 'employe, gestionnaire, admin, proprietaire'}},
    { path: 'panier', component: PanierComponent },
    { path: '**', redirectTo: '' }
];
