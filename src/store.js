import { configureStore } from "@reduxjs/toolkit";
import { accountReducer, adminBrandsReducer, adminCategoriesReducer, adminDashboard, adminOrders, adminProductsReducer, adminUsers, brandsReducer, cartsReducer, categoriesReducer, orderReducer, productsReducer } from "./features";

export const store = configureStore({
    reducer: {
        account: accountReducer,
        categories: categoriesReducer,
        products: productsReducer,
        brands: brandsReducer,
        carts: cartsReducer,
        orders: orderReducer,
        managerCategories: adminCategoriesReducer,
        managerProducts: adminProductsReducer,
        managerBrands: adminBrandsReducer,
        managerUsers: adminUsers,
        managerOrders: adminOrders,
        managerDashboard: adminDashboard
    }
})