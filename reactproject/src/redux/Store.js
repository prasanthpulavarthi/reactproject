import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from './Counter'
import cartSlice from "./Counter";

export const store=configureStore({    
    reducer:{
        // cart:cartReducer,
        cart: cartSlice.reducer

    }
})