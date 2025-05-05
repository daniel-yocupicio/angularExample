import { createReducer, on } from "@ngrx/store";
import { CartItem } from "../models/cartitem";
import { add, loadSessionStorage, remove, total } from "./items.actions";
import { products } from '../data/product.data';

export interface StoreItemsState {
    items: CartItem[],
    total: number,
}

export const initialState : StoreItemsState = {
    items: JSON.parse(sessionStorage.getItem('cart') || '[]'),
    total: 0,
};

export const itemsReducer = createReducer(
    initialState,
    on(add, (state, {product}) => {
        let items = [...state.items];

        const hasItem = items.findIndex(item => {
            return item.product.id === product.id;
        });
       
        if (hasItem > -1) {
            items[hasItem] = {product: state.items[hasItem].product, quantity: state.items[hasItem].quantity + 1}
        } else {
            items = [...state.items, {product: {...product}, quantity: 1}]
        }

        return {
            items,
            total: state.total,
        }
    }),
    on(remove, (state, {id}) => {
        return {
            items: state.items.filter(item => item.product.id !== id),
            total: state.total,
        }
    }),
    on(total, state => {
        return {
            items: state.items,
            total: state.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0),
        }
    }),
    on(loadSessionStorage, (state, {items}) => {
        return {
            items: items,
            total: items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0),
        }
    }),
);
