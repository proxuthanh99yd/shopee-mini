import { createSlice } from "@reduxjs/toolkit";
import { cartsInitState as initialState } from "./cartsInitState";
import { addCart, buyNowCart, deleteCart, fetchMyCarts, updateCart } from "./cartsThunkApi";
const cartsSlice = createSlice({
    name: 'carts',
    initialState,
    reducers: {
        incrementProduct: (state) => {
            if (state.selected.stock > 0) {
                state.selected.stock--;
                state.addToCartForm.quantity++;
            }
        },
        decrementProduct: (state) => {
            if (state.addToCartForm.quantity > 0) {
                state.selected.stock++;
                state.addToCartForm.quantity--;
            }
        },
        setQuantity: (state, { payload }) => {
            const sum = Number(state.selected.stock) + Number(state.addToCartForm.quantity);

            if (payload.quantity >= sum) {
                state.addToCartForm.quantity = sum;
                state.selected.stock = 0;
            } else {
                state.addToCartForm.quantity = payload.quantity;
                state.selected.stock = sum - payload.quantity;
            }
        },
        setSelected: (state, { payload }) => {
            state.selected.classifyId = payload.classifyId;
            state.selected.productId = payload.productId;
            state.selected.stock = payload.stock;
            state.addToCartForm.classifyId = payload.classifyId;
            state.addToCartForm.productId = payload.productId;
            state.addToCartForm.quantity = 0;
        },
        clearSelect: (state) => {
            state.selected.classifyId = "";
            state.selected.productId = "";
            state.selected.stock = 0;
            state.addToCartForm.classifyId = "";
            state.addToCartForm.productId = "";
            state.addToCartForm.quantity = 0;
        },
        changeQuantity: (state, { payload }) => {
            if (payload.quantity > 0) {
                state.myCart = state.myCart.map(cart => {
                    if (cart.id == payload.id) {
                        return { ...cart, quantity: payload.quantity }
                    }
                    return cart
                })
            }
        },
        incrementCart: (state, { payload }) => {
            state.myCart = state.myCart.map(cart => {
                if (cart.id == payload.id) {
                    return { ...cart, quantity: ++cart.quantity }
                }
                return cart
            })
        },
        decrementCart: (state, { payload }) => {
            state.myCart = state.myCart.map(cart => {
                if (cart.id == payload.id) {
                    return { ...cart, quantity: --cart.quantity || 1 }
                }
                return cart
            })
        },
        selectSingleCartCheckout: (state, { payload }) => {
            state.myCart = state.myCart.map(cart => {
                if (cart.id == payload.id) {
                    return { ...cart, checked: !cart.checked }
                }
                return cart
            })
        },
        selectAllCartCheckout: (state, { payload }) => {
            state.myCart = state.myCart.map(cart => {
                return { ...cart, checked: payload.checked }
            })
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchMyCarts.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchMyCarts.fulfilled, (state, { payload }) => {
                state.myCart = payload.map(item => {
                    return {
                        ...item, checked: false
                    }
                })
            })
            .addCase(fetchMyCarts.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.errorMessage = `${payload.status} - ${payload.data.message}`
            })
            .addCase(addCart.pending, (state) => {
                state.toastLoading = true;
                state.toastSuccess = false;
                state.toastError = false;
                state.loadingMessage = "Adding to cart";
                state.successMessage = "";
                state.errorMessage = "";
            })
            .addCase(addCart.fulfilled, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = true;
                state.toastError = false;
                state.loadingMessage = "";
                state.successMessage = "Added to cart";
                state.errorMessage = "";
                const isCart = state.myCart.find(cart => cart.id == payload.id)
                if (isCart) {
                    state.myCart = state.myCart.map(cart => {
                        if (cart.id == payload.id) {
                            return {
                                ...cart, quantity: payload.quantity

                            }
                        }
                        return cart
                    })
                } else {

                    state.myCart.push(payload);
                }
            })
            .addCase(addCart.rejected, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = false;
                state.toastError = true;
                state.loadingMessage = "";
                state.successMessage = "";
                state.errorMessage = `${payload.status} - ${payload.data.message}`
            })
            .addCase(buyNowCart.pending, () => {
                // state.toastLoading = true;
                // state.toastSuccess = false;
                // state.toastError = false;
                // state.loadingMessage = "Adding to cart";
                // state.successMessage = "";
                // state.errorMessage = "";
            })
            .addCase(buyNowCart.fulfilled, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = true;
                state.toastError = false;
                state.loadingMessage = "";
                state.successMessage = "Added to cart";
                state.errorMessage = "";
                const isCart = state.myCart.find(cart => cart.id == payload.id)
                if (isCart) {
                    state.myCart = state.myCart.map(cart => {
                        if (cart.id == payload.id && cart.classify_id == payload.classify_id) {
                            return { ...cart, quantity: payload.quantity, checked: true }
                        }
                        return cart
                    })
                } else {
                    state.myCart.push({ ...payload, checked: true });
                }
            })
            .addCase(buyNowCart.rejected, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = false;
                state.toastError = true;
                state.loadingMessage = "";
                state.successMessage = "";
                state.errorMessage = `${payload.status} - ${payload.data.message}`
            })
            .addCase(updateCart.pending, (state) => {
                state.toastLoading = true;
                state.toastSuccess = false;
                state.toastError = false;
                state.loadingMessage = "Updating to cart";
                state.successMessage = "";
                state.errorMessage = "";
            })
            .addCase(updateCart.fulfilled, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = true;
                state.toastError = false;
                state.loadingMessage = "";
                state.successMessage = "Updated to cart";
                state.errorMessage = "";
                state.myCart = state.myCart.map(cart => {
                    if (cart.id == payload.id) {
                        return { ...cart, quantity: payload.quantity }
                    }
                    return cart
                })
            })
            .addCase(updateCart.rejected, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = false;
                state.toastError = true;
                state.loadingMessage = "";
                state.successMessage = "";
                state.errorMessage = `${payload.status} - ${payload.data.message}`
            })
            .addCase(deleteCart.pending, (state) => {
                state.toastLoading = true;
                state.toastSuccess = false;
                state.toastError = false;
                state.loadingMessage = "Deleting form cart";
                state.successMessage = "";
                state.errorMessage = "";
            })
            .addCase(deleteCart.fulfilled, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = true;
                state.toastError = false;
                state.loadingMessage = "";
                state.successMessage = "Deleted from cart";
                state.errorMessage = "";
                state.myCart = state.myCart.filter(cart => cart.id !== payload.id);
            })
            .addCase(deleteCart.rejected, (state, { payload }) => {
                state.toastLoading = false;
                state.toastSuccess = false;
                state.toastError = true;
                state.loadingMessage = "";
                state.successMessage = "";
                state.errorMessage = `${payload.status} - ${payload.data.message}`
            })
    }
})
export const {
    setSelected,
    setQuantity,
    incrementProduct,
    decrementProduct,
    changeQuantity,
    decrementCart,
    incrementCart,
    clearSelect,
    selectAllCartCheckout,
    selectSingleCartCheckout } = cartsSlice.actions
export default cartsSlice.reducer