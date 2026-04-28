import { configureStore } from "@reduxjs/toolkit" 
import counterSlice from "./reducers/counterSlice"
import cartSlice from "./reducers/cartSlice"

const CART_STORAGE_KEY = "cartItems";

const loadCartItems = () => {
    try {
        const storedItems = localStorage.getItem(CART_STORAGE_KEY);
        return storedItems ? JSON.parse(storedItems) : [];
    } catch {
        return [];
    }
};

const store = configureStore({
    reducer: {
        counterSlice: counterSlice,
        cart: cartSlice,
    },
    preloadedState: {
        cart: {
            items: loadCartItems(),
        },
    },
})

store.subscribe(() => {
    try {
        const items = store.getState().cart.items;
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
        // Ignore storage write errors to keep app functional.
    }
});

export default store