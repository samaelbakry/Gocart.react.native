import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Cart } from "@/types/cart";

export type CartStateType = {
  cart: Cart | null;
  cartid: string | null;
  numOfCartItems: number;
};

const initialState: CartStateType = {
  cart: null,
  cartid: null,
  numOfCartItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload.cart;
      state.cartid = action.payload.cartid;
      state.numOfCartItems = action.payload.numOfCartItems;
    },
    setClearCart: (state) => {
      state.cart = null;
      state.cartid = null;
      state.numOfCartItems = 0;
    },
  },
});

export const { setCart , setClearCart} = cartSlice.actions;

export const selectedCart = (state: RootState) => state.cart.cart;
export const selectedCartId = (state: RootState) => state.cart.cartid;
export const selectedCartCount = (state: RootState) => state.cart.cart?.products.reduce((acc , item ) => acc + item.count , 0 ) ?? 0 ;
export const selectedTotalCartCount = (state: RootState) => state.cart.cart?.totalCartPrice ?? 0;

export default cartSlice.reducer;
