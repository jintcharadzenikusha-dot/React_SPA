import { configureStore } from '@reduxjs/toolkit';
import products from '../features/products/productsSlice';
import auth from '../features/auth/authSlice';
export const store = configureStore({reducer:{products,auth}});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
