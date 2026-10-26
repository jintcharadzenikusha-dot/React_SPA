import { createSlice, createSelector, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
export interface CartItem { productId: string; quantity: number; }
export interface Order { id: string; recipient: string; email: string; address: string; postalCode: number; total: number; items: CartItem[]; date: string; }
export interface CartState { items: CartItem[]; orders: Order[]; }
const initialState: CartState = { items: [], orders: [] };
const cartSlice = createSlice({
  name: 'cart', initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      const item = state.items.find(i => i.productId === action.payload);
      if (item) item.quantity += 1;
      else state.items.push({ productId: action.payload, quantity: 1 });
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(i => i.productId === action.payload);
      if (!item) return;
      if (item.quantity <= 1) state.items = state.items.filter(i => i.productId !== action.payload);
      else item.quantity -= 1;
    },
    removeFromCart(state, action: PayloadAction<string>) { state.items = state.items.filter(i => i.productId !== action.payload); },
    clearCart(state) { state.items = []; },
    completeOrder(state, action: PayloadAction<Order>) { state.orders.unshift(action.payload); state.items = []; }
  }
});
export const { addToCart, decreaseQuantity, removeFromCart, clearCart, completeOrder } = cartSlice.actions;
export default cartSlice.reducer;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectProducts = (state: RootState) => state.products.items;
export const selectCartCount = createSelector([selectCartItems], items => items.reduce((sum, item) => sum + item.quantity, 0));
export const selectCartTotal = createSelector([selectCartItems, selectProducts], (items, products) => items.reduce((sum, item) => sum + (products.find(p => p.id === item.productId)?.price ?? 0) * item.quantity, 0));
