import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartitem';

@Component({
  selector: 'cart-modal',
  imports: [CartComponent],
  templateUrl: './cart-modal.component.html',
})
export class CartModalComponent {
  @Input() items! : CartItem[];
  // @Input() total! : number;

  @Output() openCartEventEmitter = new EventEmitter();
  @Output() onDeleteEventEmitter = new EventEmitter();

  openCart() {
    this.openCartEventEmitter.emit();
  }

  onDeleteCart(id : number) {
    this.onDeleteEventEmitter.emit(id);
  }
}
