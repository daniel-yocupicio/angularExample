import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { products } from '../../data/product.data';
import { Product } from '../../models/product';
import { CatalogComponent } from '../catalog/catalog.component';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartitem';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { StoreItemsState } from '../../store/items.reducer';
import { add, loadSessionStorage, total } from '../../store/items.actions';

@Component({
  selector: 'cart-app',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit{
  constructor(
    private store: Store<{items: StoreItemsState}>
  ) {}

  ngOnInit(): void {
    let items = JSON.parse(sessionStorage.getItem('cart')!) || [];
    this.store.dispatch(loadSessionStorage({items}))
  }
}
