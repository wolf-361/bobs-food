import { Component } from '@angular/core';
import { OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-base-overlay',
  standalone: true,
  imports: [ OverlayModule, CommonModule, MatIconModule, MatButtonModule, MatToolbarModule ],
  templateUrl: './base-overlay.component.html',
  styleUrl: './base-overlay.component.scss'
})
export class BaseOverlayComponent {
  constructor(
    public overlayRef: OverlayRef
  ) {}

  close() {
    this.overlayRef.dispose();
  }
}
