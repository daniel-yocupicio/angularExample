import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartitem';

@Component({
  selector: 'navbar',
  imports: [],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input() items!: CartItem[];
  @Output() openCartEventEmitter = new EventEmitter();

  openCart() {
    this.openCartEventEmitter.emit();
  }
}
