import { configureStore } from "@reduxjs/toolkit";
import { accountReducer, brandsReducer, categoriesReducer, productsReducer } from "./features";

export const store = configureStore({
    reducer: {
        account: accountReducer,
        categories: categoriesReducer,
        products: productsReducer,
        brands: brandsReducer
    }
})