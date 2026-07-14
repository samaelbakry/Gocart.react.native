import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type User = {
  name: string,
  email:string,
  role:string
};

export type AuthStateType ={
    user:User | null,
    token:string | null,
    authenticated:boolean | null,
    loading:boolean
}

const initialState:AuthStateType ={
  user: null,
  token:null,
  authenticated:false,
  loading:false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state,action: PayloadAction<{ user: User;token: string;}>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.authenticated = true;
      state.loading = false;
    },
    setLoading:(state , action:PayloadAction<boolean>)=>{
      state.loading = action.payload
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.authenticated = false;
    },
  },
});

export const {setCredentials, logout , setLoading } = authSlice.actions;

export const selectedUser = (state:RootState)=>(state.auth.user)
export const selectedToken = (state:RootState)=>(state.auth.token)
export const selectedAuthenticated = (state:RootState)=>(state.auth.authenticated)
export const selectLoading = (state:RootState)=>(state.auth.loading)

export default authSlice.reducer;