import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import deviceSlice from './slices/deviceSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    devices: deviceSlice,
  },
});

export default store;
