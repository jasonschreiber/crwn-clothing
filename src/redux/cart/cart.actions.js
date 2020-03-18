import {CartActionTypes} from './cart.types';

//payload is optional property
export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
});