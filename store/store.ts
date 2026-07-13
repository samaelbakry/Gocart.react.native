import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from "react-redux";
import appReducer from "./slices/appSlice";


export const store = configureStore({
    reducer:{
        app:appReducer
    }
})

export type RootApp = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch


export const useAppSelector = useSelector.withTypes<RootApp>()
export const useAppDispatch = useDispatch.withTypes<DispatchType>()
