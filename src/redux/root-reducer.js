//all reducers gointo the root reducer

import {combineReducers} from 'redux';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

//keys for reducers
export default combineReducers({
    user: userReducer,
    cart: cartReducer
})