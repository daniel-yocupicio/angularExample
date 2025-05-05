import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/cartitem';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product';
import { Store } from '@ngrx/store';
import { StoreItemsState } from '../../store/items.reducer';

@Component({
  selector: 'navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  items!: CartItem[];
  // total was deleted because is a global value

  // set new values in items
  constructor(private store : Store<{items: StoreItemsState}>) {
    this.store.select('items').subscribe(state => {
      this.items = state.items;
    })
  }
}
