import {configureStore} from '@reduxjs/toolkit';
import cart from '../features/cart/cartSlice';
import {initialProducts} from '../data/products';
const catalogData = (state = {items:initialProducts}) => state;
export const store=configureStore({reducer:{cart,products:catalogData}});
export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
