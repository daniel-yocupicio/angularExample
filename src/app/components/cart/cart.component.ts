import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartitem';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { StoreItemsState } from '../../store/items.reducer';
import { Store } from '@ngrx/store';
import { remove, total } from '../../store/items.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  items! : CartItem[];
  total : number = 0;

  constructor(private store : Store<{items: StoreItemsState}>) {
    this.store.select('items').subscribe(state => {
      this.items = state.items;
      this.total = state.total;

      sessionStorage.setItem('cart', JSON.stringify(state.items));
    })
  }

  // implement remove action
  onDeleteCart(id: number) {
    Swal.fire({
      title: "Estas seguro que deceas eliminar?",
      text: "Cuidado que perderas el item del carro de compras",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(remove({id}));
        this.store.dispatch(total());

        Swal.fire({
          title: "Eliminado!",
          text: "Tu producto fue eliminado.",
          icon: "success"
        });
      }
    })
  }
}
