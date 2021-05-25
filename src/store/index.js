import { configureStore } from '@reduxjs/toolkit';
import { pizzaReducer } from './pizzaSlice';
import { cartReducer } from './cartSlice';
const store = configureStore({
  reducer: {
    pizza: pizzaReducer,
    cart: cartReducer,
  },
});
export default store;
