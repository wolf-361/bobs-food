import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { Item } from '../../../dto/item/item';
import { BaseItemComponent } from '../base-item/base-item.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-toggle-item',
  standalone: true,
  imports: [
    BaseItemComponent,
    MatCheckboxModule
  ],
  templateUrl: './toggle-item.component.html',
  styleUrl: './toggle-item.component.scss'
})
export class ToggleItemComponent implements OnDestroy {
  @Input({ required: true }) item!: Item;
  @Input({ required: true }) isSelected!: boolean;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { 
    this.toggle.asObservable().subscribe((value: boolean) => {
      this.isSelected = value;
    });
  }

  toggleSelection() {
    this.toggle.emit(!this.isSelected);
  }

  ngOnDestroy() {
    this.toggle.unsubscribe();
  }
}
