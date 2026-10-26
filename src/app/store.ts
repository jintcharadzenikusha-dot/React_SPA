import { configureStore } from '@reduxjs/toolkit';
import products from '../features/products/productsSlice';
import auth from '../features/auth/authSlice';
import cart from '../features/cart/cartSlice';
export const store = configureStore({reducer:{products,auth,cart}});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
