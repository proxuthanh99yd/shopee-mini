export const cartsInitState = {
    selected: {
        productId: "",
        classifyId: "",
        stock: 0,
    },
    addToCartForm: {
        productId: "",
        classifyId: "",
        quantity: 0,
    },
    myCart: [],
    isLoading: false,
    isError: false,
    loadingMessage: "",
    successMessage: "",
    errorMessage: "",
    toastLoading: false,
    toastSuccess: false,
    toastError: false,
}