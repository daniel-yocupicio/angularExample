import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { products } from '../../data/product.data';
import { Product } from '../../models/product';
import { CatalogComponent } from '../catalog/catalog.component';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartitem';
import { NavbarComponent } from '../navbar/navbar.component';
import { CartModalComponent } from '../cart-modal/cart-modal.component';

@Component({
  selector: 'cart-app',
  imports: [CatalogComponent, NavbarComponent, CartModalComponent],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit{
  products: Product[] = [];
  items : CartItem[] = [];
  // total : number = 0;
  showCart : boolean = false;

  constructor(private service: ProductService) {
    
  }

  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || []
    // this.calculateTotal();
  }

  onAddCart(product: Product) {
    const hasItem = this.items.findIndex(item => {
      return item.product.id === product.id;
    });

    if (hasItem > -1) {
      this.items[hasItem] = {product: this.items[hasItem].product, quantity: this.items[hasItem].quantity + 1}
    } else {
      this.items = [...this.items, {product: {...product}, quantity: 1}]
    }
    // this.calculateTotal();
    // this.saveSession();
  }

  onDeleteCart(id: number) {
    this.items = this.items.filter(item => item.product.id !== id);
    if (this.items.length == 0) {
      sessionStorage.removeItem('cart');
      sessionStorage.clear();
    }
    // this.calculateTotal();
    // this.saveSession()
  }

  /*calculateTotal() {
    this.total = this.items.reduce((acc, item) => acc + item.product.price * item.quantity ,0);
  }

  saveSession() {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }*/

  openCart() {
    this.showCart = !this.showCart;
  }
}
