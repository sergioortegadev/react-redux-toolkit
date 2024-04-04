import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
  },
  reducers: {
    createProduct: (state, action) => {},
    readProducts: (state, action) => {
      state.data = action.payload;
    },
    updateProduct: (state, action) => {},
    deleteProduct: (state, action) => {},
  },
});

export const { createProduct, readProducts, updateProduct, deleteProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
