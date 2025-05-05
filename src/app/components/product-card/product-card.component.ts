import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { StoreItemsState } from '../../store/items.reducer';
import { Store } from '@ngrx/store';
import { add, total } from '../../store/items.actions';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'product-card',
  imports: [],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() product! : Product;

  constructor(
    private store : Store<{items: StoreItemsState}>,
    private router : Router,
  ) {}
  

  onAddCart(product: Product) {
    this.store.dispatch(add({product}));
    this.store.dispatch(total());

    this.router.navigate(['/cart'])

    Swal.fire({
      title: "Shopping!",
      text: "nuevo producto agregado al carro",
      icon: "success"
    });
  }
}
