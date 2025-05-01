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

@Component({
  selector: 'cart-app',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit{
  //products: Product[] = [];
  items : CartItem[] = [];
  total : number = 0;
  showCart : boolean = false;

  constructor(private router: Router, private sharingDataService : SharingDataService, private service: ProductService) {}

  ngOnInit(): void {
    //this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || []
    this.calculateTotal();
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart() {
    this.sharingDataService.productEventEmitter.subscribe(product => {
      const hasItem = this.items.findIndex(item => {
        return item.product.id === product.id;
      });
  
      if (hasItem > -1) {
        this.items[hasItem] = {product: this.items[hasItem].product, quantity: this.items[hasItem].quantity + 1}
      } else {
        this.items = [...this.items, {product: {...product}, quantity: 1}]
      }
      this.calculateTotal();
      this.saveSession();
      // navigate to cart screen
      this.router.navigate(['/cart'], {state: {items: this.items, total: this.total}})
      Swal.fire({
        title: "Shopping!",
        text: "nuevo producto agregado al carro",
        icon: "success"
      });
    });
  }

  // this function is executed in ngOnInit
  onDeleteCart() {
    // subscription to listen changes usin event emitter from angular API.
    // the param id is a number identifier of items, this value is necessary for delete a item from cart
    this.sharingDataService.idProductEventEmitter.subscribe(id => {
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

          this.items = this.items.filter(item => item.product.id !== id);
          if (this.items.length == 0) {
            sessionStorage.removeItem('cart');
            sessionStorage.clear();
          }
          this.calculateTotal();
          this.saveSession();
    
    
          // To reflect the changes after deleting an item from the cart, 
          // we refresh the cart route by navigating away and then back to it.
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/cart'], {
              state: {items: this.items, total: this.total}
            })
          })

          Swal.fire({
            title: "Eliminado!",
            text: "Tu producto fue eliminado.",
            icon: "success"
          });
        }
      });
    });
  }

  calculateTotal() {
    this.total = this.items.reduce((acc, item) => acc + item.product.price * item.quantity ,0);
  }

  saveSession() {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  openCart() {
    this.showCart = !this.showCart;
  }
}
