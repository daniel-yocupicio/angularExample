import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})

// class to inject a global eventEmitter using router
export class SharingDataService {
  private _idProductEventEmitter : EventEmitter<number> = new EventEmitter();
  private _productEventEmitter : EventEmitter<Product> = new EventEmitter();

  constructor() { }

  // return EventEmitter object to emit a value
  get idProductEventEmitter() : EventEmitter<number> {
    return this._idProductEventEmitter;
  }

  get productEventEmitter() : EventEmitter<Product> {
    return this._productEventEmitter;
  }
}
