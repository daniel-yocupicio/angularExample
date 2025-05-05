import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'catalog',
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit {
  @Input() products! : Product[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    if (!this.products) {
      this.products = this.productService.findAll();
    }
  }
}

/*
  onAddCart(product: Product) {
    this.sharingDataService.productEventEmitter.emit(product);
    //this.productEventEmitter.emit(product);
  }
*/
