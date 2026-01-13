import { Component, output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  menuToggle = output<void>();

  onMenuToggle(): void {
    this.menuToggle.emit();
  }
}
