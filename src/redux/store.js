import { configureStore } from "@reduxjs/toolkit" 
import counterSlice from "./reducers/counterSlice"
import cartSlice from "./reducers/cartSlice"

const store = configureStore({
        reducer: {
        counterSlice: counterSlice,
         cart: cartSlice,
    }
})

export default store