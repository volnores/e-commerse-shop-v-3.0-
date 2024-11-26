import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import deviceSlice from './slices/deviceSlice';
import cartSlice from './slices/cartSlice';
import typeSlice from './slices/typeSlice';
import brandSlice from './slices/brandslice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    devices: deviceSlice,
    types: typeSlice,
    cart: cartSlice,
    brands: brandSlice,
  },
});

export default store;
