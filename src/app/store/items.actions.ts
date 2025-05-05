import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product';
import { CartItem } from '../models/cartitem';

export {createAction} from '@ngrx/store';

export const add = createAction('add', props<{product : Product}>());
export const loadSessionStorage = createAction('loadSessionStorage', props<{items : CartItem[]}>());
export const remove = createAction('remove', props<{id : number}>());
export const total = createAction('total');