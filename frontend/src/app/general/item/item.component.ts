import { Component, Input } from '@angular/core';
import { Item } from '../../dto/item/item';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  @Input({required: true}) item!: Item;
}
