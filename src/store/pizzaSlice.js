import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dummyData: [
    {
      id: 'p1',
      name: 'Margherita',
      basePrice: 100,
      image: 'https://images.dominos.co.in/new_margherita_2502.jpg',
      description: 'A classic delight with 100% Real mozzarella cheese ',
      quantity: 0,
      topping: [],
    },
    {
      id: 'p2',
      name: 'Farmhouse',
      basePrice: 100,
      image: 'https://images.dominos.co.in/farmhouse.png',
      description: 'A classic delight with 100% Real mozzarella cheese ',
      quantity: 0,
      topping: [],
    },
    {
      id: 'p3',
      name: 'Peppy Paneer',
      basePrice: 100,
      image: 'https://images.dominos.co.in/farmhouse.png',
      description: 'A classic delight with 100% Real mozzarella cheese ',
      quantity: 0,
      topping: [],
    },
    {
      id: 'p4',
      name: 'Mexican Green Wave',
      basePrice: 100,
      image: 'https://images.dominos.co.in/farmhouse.png',
      description: 'A classic delight with 100% Real mozzarella cheese ',
      quantity: 0,
      topping: [],
    },
    {
      id: 'p5',
      name: 'Extravenza',
      basePrice: 100,
      image: 'https://images.dominos.co.in/farmhouse.png',
      description: 'A classic delight with 100% Real mozzarella cheese ',
      quantity: 0,
      topping: [],
    },
  ],
  vegToppings: [
    {
      id: 't1',
      url: 'https://images.dominos.co.in/toppingsCapsicum.jpg',
      name: 'Capsicum',
      selected: false,
    },
    {
      id: 't2',
      url: 'https://images.dominos.co.in/toppingsJalapeno.jpg',
      name: 'Jalepenos',
      selected: false,
    },
    {
      id: 't3',
      url: 'https://images.dominos.co.in/toppingsGoldenCorn.jpg',
      name: 'Corn',
      selected: false,
    },
    {
      id: 't4',
      url: 'https://images.dominos.co.in/toppingsMushroom.jpg',
      name: 'Mushrooms',
      selected: false,
    },
  ],
  nonVegToppings: [
    {
      id: 't5',
      url: 'https://images.dominos.co.in/toppingsChickenTikka.jpg',
      name: 'Chicken Tikka',
    },
    {
      id: 't6',
      url: 'https://images.dominos.co.in/topping_chicken_keema.jpg',
      name: 'Chicken Keema',
    },
    {
      id: 't7',
      url: 'https://images.dominos.co.in/toppingsPeriPeriChicken.jpg',
      name: 'Peri Peri Chicken',
    },
  ],
  sizes: ['Regular', 'Medium', 'Large'],
  prices: { Regular: 219, Medium: 309, Large: 419 },
  crusts: ['Pan Pizza', 'Chesse Burst', 'Thin Crust'],
  vegToppingPrice: 35,
  nonVegToppingPrice: 50,
  showCustomization: false,
  crustPrices: { 'Pan Pizza': 399, 'Cheese Burst': 449, 'Thin Crust': 498 },
  customizePizzaId: null,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    quantityIncrease(state, action) {
      state.dummyData.map((item, index) => {
        if (item.id === action.payload) {
          state.dummyData[index].quantity++;
        }
      });
    },
    quantityDecrease(state, action) {
      state.dummyData.map((item, index) => {
        if (item.id === action.payload) {
          if (state.dummyData[index].quantity > 0)
            state.dummyData[index].quantity--;
        }
      });
    },
    selectTopping(state, action) {
      console.log(action.payload.checked, action.payload.name);
      if (action.payload.name && action.payload.checked) {
        state.dummyData.map((pizza) => {
          if (pizza.id === state.customizePizzaId) {
            if (!pizza.topping.includes(action.payload.name)) {
              pizza.topping.push(action.payload.name);
            }
          }
        });
      } else {
        state.dummyData.map((pizza) => {
          if (pizza.id === state.customizePizzaId) {
            if (pizza.topping.includes(action.payload.name)) {
              pizza.topping = pizza.topping.filter(
                (topping) => topping !== action.payload.name
              );
            }
          }
        });
      }
    },
    closeModal(state) {
      state.customizePizzaId = null;
      state.showCustomization = false;
    },
    showModal(state, action) {
      state.customizePizzaId = action.payload;
      state.showCustomization = true;
    },
  },
});

export const pizzaActions = pizzaSlice.actions;

export const pizzaReducer = pizzaSlice.reducer;
