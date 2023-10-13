import { createBrowserRouter } from "react-router-dom";
import {
    AccountLayout,
    CartPage,
    ChangePassPage,
    CheckoutPage,
    HomePage,
    Layout,
    LoginPage,
    ProductPage,
    ProfilePage,
    PurchasePage,
    SignUpPage,
} from "../pages/client";
import {
    AdminLayout,
    Brands,
    Categories,
    CreateProduct,
    Dashboard,
    EditProduct,
    Products,
} from "../pages/admin";

export const router = createBrowserRouter([
    {
        path: "login",
        element: <LoginPage />,
    },
    {
        path: "signup",
        element: <SignUpPage />,
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "product/:id",
                element: <ProductPage />,
            },
            {
                path: "cart",
                element: <CartPage />,
            },
            {
                path: "checkout",
                element: <CheckoutPage />,
            },
            {
                path: "account",
                element: <AccountLayout />,
                children: [
                    {
                        path: "profile",
                        element: <ProfilePage />,
                    },
                    {
                        path: "change_password",
                        element: <ChangePassPage />,
                    },
                    {
                        path: "purchase",
                        element: <PurchasePage />,
                    },
                ],
            },
        ],
    },
    {
        path: "admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "products",
                element: <Products />,
            },
            {
                path: "products/:id/edit",
                element: <EditProduct />,
            },
            {
                path: "products/create",
                element: <CreateProduct />,
            },
            {
                path: "products/categories",
                element: <Categories />,
            },
            {
                path: "products/brands",
                element: <Brands />,
            },
        ],
    },
]);
