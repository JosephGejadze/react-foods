import * as redux from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";

const store = redux.configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export default store;
