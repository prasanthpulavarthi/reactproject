import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './Counter'
export const store=configureStore({
    reducer:{
        cart:cartReducer
    }
})