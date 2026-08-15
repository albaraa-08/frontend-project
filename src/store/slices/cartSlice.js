// to make a slice you first give it a name , an initial value and finally reducers which is the functions that you will use across your websit/project 

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const cartSlice = createSlice({
    name :"cart",
    initialState : {
        items : JSON.parse(localStorage.getItem("items")) || [],
        totalAmount : 0,
    },


    // functions in reducers --> addtocart , removefromcart , clearcart , increaseqt , decreaseqt 

    reducers :{

        addToCart :(state , action)=>{
            // go get the product > onclick 
            const product = action.payload;
            // 1- product is already in cart and i wan tto + the qt
            // 2- product is yet to be added for the first time
            const item = state.items?.find((item)=> item.id == product.id);
            if(item){
                if(item.quantity > product.stock){
                    toast.error("Not enough in stock");
                    return;
                }
                item.quantity+=1;
            }else{
                state.items.push({...product , quantity:1});
                toast.success("Added successfully");
                localStorage.setItem("items" , JSON.stringify(state.items))
                cartSlice.caseReducers.calcTotalAmount(state);
            }
        },
        removeFromCart :(state , action)=>{
            const product = action.payload;
            state.items = state.items.filter((item)=> item.id !== product.id );
            localStorage.setItem("items" , JSON.stringify(state.items));
            cartSlice.caseReducers.calcTotalAmount(state);
        },
        clearCart:(state , action)=>{
            state.items = [],
            state.totalAmount = 0 ,
            localStorage.removeItem("items")
        },
        increaseQuantity: (state , action)=>{
            const product = action.payload;
            const item = state.items.find((item)=> item.id == product.id );
            // check if the amount/qt is more than the stock or not
            if(item.quantity > product.stock){
                toast.error("Product out of stock");
                return;
            }
            item.quantity+=1;
            localStorage.setItem("items" , JSON.stringify(state.items));
            cartSlice.caseReducers.calcTotalAmount(state);
        },
        decreaseQuantity: (state , action)=>{
            const product = action.payload;
            const item = state.items.find((item)=> item.id == product.id);
            if(item.quantity == 1){
                toast.error("already at the lowest amount")
                return;
            }
            item.quantity-=1;
            localStorage.setItem("items" , JSON.stringify(state.items));
            cartSlice.caseReducers.calcTotalAmount(state);
        },
        calcTotalAmount:(state , action)=>{
            state.totalAmount = state.items.reduce((sum ,item)=> sum+item.price * item.quantity,0);
        },

    }
});

export const {addToCart , removeFromCart , clearCart , increaseQuantity , decreaseQuantity} = cartSlice.actions;

export default cartSlice.reducer;
