import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingCartItem = state.cartItems[existingCartItemIndex];
      let updatedCartItems;

      if (existingCartItem) {
        if (_.isEqual(existingCartItem.topping, action.payload.topping)) {
          const updatedItem = {
            ...existingCartItem,
            topping: existingCartItem.topping,
            quantity: existingCartItem.quantity++,
          };
          updatedCartItems = [...state.cartItems];
          updatedCartItems[existingCartItemIndex] = updatedItem;
        } else {
          state.cartItems = [
            ...state.cartItems,
            { ...action.payload, quantity: action.payload.quantity++ },
          ];
        }
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }
    },
    removeFromCart(state, action) {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      } else {
        existingItem.quantity--;
      }
    },
  },
});
export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
