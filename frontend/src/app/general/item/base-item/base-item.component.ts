import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Item } from '../../../dto/item/item';

@Component({
  selector: 'app-base-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './base-item.component.html',
  styleUrl: './base-item.component.scss'
})
export class BaseItemComponent {
  @Input({ required: true }) item!: Item;
}
