export const orderInitState = {
    checkoutItems: [],
    loadingMessage: "",
    successMessage: "",
    errorMessage: "",
    toastLoading: false,
    toastSuccess: false,
    toastError: false,
    isLoading: true,
    isError: false,
    orderItems: [],
    orderFilter: [
        {
            label: "All",
            param: "all"
        },
        {
            label: "To Wait",
            param: "to_wait"
        },
        {
            label: "To Ship",
            param: "to_ship"
        }, {
            label: "Completed",
            param: "completed"
        }, {
            label: "Cancelled",
            param: "cancelled"
        }
    ],
    selectFilter: "all" 
}