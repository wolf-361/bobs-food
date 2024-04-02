import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { EmployeComponent } from './pages/employe/employe.component';
import { PanierComponent } from './pages/panier/panier.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: ConnexionComponent },
    { path: 'employees', component: EmployeComponent },
    { path: 'panier', component: PanierComponent },
    { path: '**', redirectTo: '' }
];
