import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type AddressStateType = {
  id:string;
  name: string;
  details: string;
  phone: string;
  city: string;
};

const initialState: AddressStateType = {
  id:"",
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
      state.id = action.payload.id
      state.name = action.payload.name;
      state.details = action.payload.details;
      state.phone = action.payload.phone;
      state.city = action.payload.city;
    },

    clearAddress: (state) => {
      state.id="";
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