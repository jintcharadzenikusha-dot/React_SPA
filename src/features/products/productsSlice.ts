import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { initialProducts, type Product } from '../../data/products';

export interface ProductsState {
  items: Product[];
  category: string;
  search: string;
  sort: 'popular' | 'low' | 'high';
}
const initialState: ProductsState = { items: initialProducts, category: 'ყველა', search: '', sort: 'popular' };
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) { state.items.unshift(action.payload); },
    setCategory(state, action: PayloadAction<string>) { state.category = action.payload; },
    setSearch(state, action: PayloadAction<string>) { state.search = action.payload; },
    setSort(state, action: PayloadAction<ProductsState['sort']>) { state.sort = action.payload; },
    resetFilters(state) { state.category = 'ყველა'; state.search = ''; state.sort = 'popular'; }
  }
});
export const { addProduct, setCategory, setSearch, setSort, resetFilters } = productsSlice.actions;
export default productsSlice.reducer;
