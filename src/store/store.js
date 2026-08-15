import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice"
import cartReducer from "./slices/cartSlice"


export let store = configureStore({
    reducer :{
        user :userSlice ,
        cart : cartReducer , 
        
    }
})