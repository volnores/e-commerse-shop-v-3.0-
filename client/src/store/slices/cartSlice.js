import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const findItem = state.cart.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeDeviceFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem('cart');
    },
    increaseQuantity: (state, action) => {
      const findItem = state.cart.find((item) => item.id === action.payload);
      if (findItem) {
        findItem.quantity += 1;
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    decreaseQuantity: (state, action) => {
      const findItem = state.cart.find((item) => item.id === action.payload);
      if (findItem && findItem.quantity > 1) {
        findItem.quantity -= 1;
      } else {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

export const { addToCart, removeDeviceFromCart, clearCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
