import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type AddressStateType = {
  name: string;
  details: string;
  phone: string;
  city: string;
};

const initialState: AddressStateType = {
  name: "",
  details: "",
  phone: "",
  city: "",
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress: (
      state,
      action: PayloadAction<AddressStateType>
    ) => {
      state.name = action.payload.name;
      state.details = action.payload.details;
      state.phone = action.payload.phone;
      state.city = action.payload.city;
    },

    clearAddress: (state) => {
      state.name = "";
      state.details = "";
      state.phone = "";
      state.city = "";
    },
  },
});

export const { setAddress, clearAddress } = addressSlice.actions;

export const selectedAddress = (state: RootState) => state.address;

export default addressSlice.reducer;