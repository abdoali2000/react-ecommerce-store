import { configureStore } from "@reduxjs/toolkit" 
import counterSlice from "./reducers/counterSlice"
import cartSlice from "./reducers/cartSlice"
import themeSlice from "./reducers/themeSlice"

const CART_STORAGE_KEY = "cartItems";
const THEME_STORAGE_KEY = "themeMode";

const loadCartItems = () => {
    try {
        const storedItems = localStorage.getItem(CART_STORAGE_KEY);
        return storedItems ? JSON.parse(storedItems) : [];
    } catch {
        return [];
    }
};

const loadThemeMode = () => {
    try {
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        return storedTheme === "light" ? "light" : "dark";
    } catch {
        return "dark";
    }
};

const store = configureStore({
    reducer: {
        counterSlice: counterSlice,
        cart: cartSlice,
        theme: themeSlice,
    },
    preloadedState: {
        cart: {
            items: loadCartItems(),
        },
        theme: {
            mode: loadThemeMode(),
        },
    },
})

store.subscribe(() => {
    try {
        const { items } = store.getState().cart;
        const { mode } = store.getState().theme;
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
        // Ignore storage write errors to keep app functional.
    }
});

export default store