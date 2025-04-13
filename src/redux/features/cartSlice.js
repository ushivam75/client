import { createSlice } from "@reduxjs/toolkit";
import { startTransition } from "react";

const initialState = {
  carts: [],
};

//cart Slice
const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    //add to cart
    addToCart: (state, action) => {
      const itemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex > -1) {
        state.carts[itemIndex].qnty += 1;
      } else {
        const newPayload = { ...action.payload, qnty: 1 };
        state.carts = [...state.carts, newPayload];
      }
    },
    //remove from cart
    removeToCart: (state, action) => {
      state.carts = state.carts.filter((item) => item.id !== action.payload);
    },

    //remove single items
    removeSingleItems: (state, action) => {
      const itemIndex_Dec = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.carts[itemIndex_Dec].qnty > 1) {
        state.carts[itemIndex_Dec].qnty -= 1;
      } else {
        if (itemIndex_Dec !== -1) state.carts.splice(itemIndex_Dec, 1);
      }
    },
    //clear cart
    emptyCartItem: (state) => {
      state.carts = [];
    },
  },
});

export const { addToCart, removeToCart, removeSingleItems, emptyCartItem } =
  cartSlice.actions;
export default cartSlice.reducer;
