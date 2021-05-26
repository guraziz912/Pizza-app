import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
  prices: { Regular: 219, Medium: 309, Large: 419 },
  crustPrices: { 'Pan Pizza': 399, 'Cheese Burst': 449, 'Thin Crust': 498 },
  vegToppingPrice: 30,
  nonVegToppingPrice: 50,
};
function arrayCompare(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  if (JSON.stringify(arr1) !== JSON.stringify(arr2)) {
    return false;
  }

  return true;
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      let count = 0;

      if (state.cartItems.length > 0) {
        state.cartItems.map((item, index) => {
          if (
            item.id === action.payload.id &&
            arrayCompare(item.vegTopping, action.payload.vegTopping) &&
            item.pizzaSize === action.payload.pizzaSize
          ) {
            let vegToppingNumber = state.cartItems[index].vegTopping.length;
            state.cartItems[index].quantity++;
            state.cartItems[index].totalPrice =
              state.cartItems[index].totalPrice +
              state.cartItems[index].basePrice +
              vegToppingNumber * state.vegToppingPrice;
          } else {
            count++;
          }
        });

        if (count === state.cartItems.length) {
          let vegToppingsNumber = action.payload.vegTopping.length;
          let newTotalPrice =
            action.payload.totalPrice +
            action.payload.basePrice +
            vegToppingsNumber * state.vegToppingPrice;
          state.cartItems = [
            ...state.cartItems,
            {
              ...action.payload,
              totalPrice: newTotalPrice,
              quantity: 1,
            },
          ];
        }
      } else {
        let vegToppingsNumber = action.payload.vegTopping.length;
        let newTotalPrice =
          action.payload.totalPrice +
          action.payload.basePrice +
          vegToppingsNumber * state.vegToppingPrice;
        state.cartItems = [
          ...state.cartItems,
          {
            ...action.payload,
            totalPrice: newTotalPrice,
          },
        ];
      }
    },
    removeFromCart(state, action) {
      state.cartItems.map((item, index) => {
        if (
          item.id === action.payload.id &&
          arrayCompare(item.vegTopping, action.payload.vegTopping)
        ) {
          if (state.cartItems[index].quantity === 1) {
            state.cartItems = state.cartItems.filter(
              (item) =>
                !arrayCompare(item.vegTopping, action.payload.vegTopping)
            );
          } else {
            state.cartItems[index].quantity--;
            state.cartItems[index].totalPrice =
              state.cartItems[index].totalPrice -
              (state.cartItems[index].basePrice +
                state.cartItems[index].vegTopping.length *
                  state.vegToppingPrice);
          }
        }
      });
    },
  },
});
export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
