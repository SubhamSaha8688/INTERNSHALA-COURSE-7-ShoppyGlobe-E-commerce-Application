import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.products;
  }
);

const initialState = {
  products: [],
  searchResults: [],
  isSearching: false,
  status: 'idle',
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchProducts: (state, action) => {
      const searchTerm = action.payload;
      
      if (!searchTerm.trim()) {
        state.isSearching = false;
        return;
      }
      
      state.searchResults = state.products.filter(
        product => 
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      state.isSearching = true;
    },
    clearSearch: (state) => {
      state.isSearching = false;
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export const { searchProducts, clearSearch } = productsSlice.actions;


export const selectAllProducts = (state) => state.products.products;
export const selectSearchResults = (state) => state.products.searchResults;
export const selectIsSearching = (state) => state.products.isSearching;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;


export default productsSlice.reducer;