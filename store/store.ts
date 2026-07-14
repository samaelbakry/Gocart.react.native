import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from "react-redux";
import authSlice from "./slices/authSlice";


export const store = configureStore({
    reducer:{
        auth:authSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch


export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<DispatchType>()
