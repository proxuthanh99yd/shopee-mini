export const accountInitState = {
    authToken: localStorage.getItem('auth-token') || "",
    formInput: {
        phone: "",
        name: "",
        address: "",
        email: "admin@gmail.com",
        password: "admin",
        cfPassword: "",
        gender: '',
    },
    user: {
        name: "",
        address: "",
    },
    changePassword: {
        oldPassword: "",
        newPassword: "",
        cfPassword: ""
    },
    isLogin: false,
    isError: false,
    errorMessage: "",
    isLoading: false,
    isAuthenticating: false,
    isAuthenticated: false,
    isSigned: false,
    sidebar: false,
}