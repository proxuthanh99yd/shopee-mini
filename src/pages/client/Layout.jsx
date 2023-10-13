import { Outlet, useNavigate } from "react-router-dom";
import { Footer, Header } from "../../components/client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfile, logout } from "../../features/account/accountThunkApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Layout() {
    const { authToken, user, isAuthenticating, isAuthenticated, isLogin } =
        useSelector((state) => state.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user?.name) {
            if (authToken) {
                dispatch(getUserProfile({ authToken }));
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleLogout = () => {
        dispatch(logout({ authToken }));
        navigate("/", { replace: true });
    };
    return (
        <>
            <Header
                isAdmin={user?.role === 0}
                name={user?.name}
                handleLogout={handleLogout}
                isAuthenticating={isAuthenticating}
                isAuthenticated={isAuthenticated}
                isLogin={isLogin}
            />
            <Outlet />
            <Footer />
            <ToastContainer />
        </>
    );
}
