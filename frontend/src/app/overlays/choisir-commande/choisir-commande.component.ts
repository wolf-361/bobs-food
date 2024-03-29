import { Component } from '@angular/core';
import { BaseOverlayComponent } from '../base-overlay/base-overlay.component';

@Component({
  selector: 'app-choisir-commande',
  standalone: true,
  imports: [ BaseOverlayComponent ],
  templateUrl: './choisir-commande.component.html',
  styleUrl: './choisir-commande.component.scss'
})
export class ChoisirCommandeComponent {

}
