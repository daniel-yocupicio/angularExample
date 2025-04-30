import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartitem';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnChanges {
  @Input() items : CartItem[] = [];
  total : number = 0;

  @Output() idProductEventEmitter = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateTotal();
    this.saveSession();
    /*if (!itemsChange.firstChange) {
    }*/
  }

  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }

  calculateTotal() {
    this.total = this.items.reduce((acc, item) => acc + item.product.price * item.quantity ,0);
  }

  saveSession() {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
