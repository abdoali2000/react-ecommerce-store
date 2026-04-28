import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter", 
    initialState: {
        // State
        count: 0,
    },
    reducers: {
        increaseCounter: (state, action) => {
            state.count = action.payload
        },
        decreaseCounter: (state) => {
           
            state.count >= 1 ? state.count -=1 : state.count =0;
        }
    }
})
export const { increaseCounter, decreaseCounter} = counterSlice.actions
export default counterSlice.reducer