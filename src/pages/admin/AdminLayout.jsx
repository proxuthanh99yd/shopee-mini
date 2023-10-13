import { Outlet, useNavigate } from "react-router-dom";
import { Navbar, Sidebar } from "../../components/admin";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../features/account/accountThunkApi";
export default function AdminLayout() {
    const { authToken, user, isAuthenticated, isAuthenticating } = useSelector(
        (state) => state.account,
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (authToken && !isAuthenticated) {
            dispatch(getUserProfile({ authToken }));
        }
        if (
            (!authToken && !isAuthenticated) ||
            (authToken && isAuthenticated && user.role !== 0)
        ) {
            navigate("/", { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);
    const [menu, setMenu] = useState(true);
    useEffect(() => {
        if (screen.width < 768) {
            setMenu(false);
        }
    }, []);
    if (isAuthenticating) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <div className="loading">
                    <div className="loadingSpinner">
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (!isAuthenticating && isAuthenticated && user.role === 0) {
        return (
            <div className="relative">
                <div
                    className={`fixed top-0 h-screen bg-neutral-100 shadow-lg shadow-neutral-300 transition-all ${
                        menu ? "left-0 w-1/6" : "-left-full"
                    }`}
                >
                    <Sidebar menu={menu} />
                </div>
                <div
                    className={`ml-auto flex flex-col transition-all ${
                        menu ? "w-5/6" : "w-full"
                    }`}
                >
                    <Navbar name={user.name} setMenu={setMenu} />
                    <Outlet />
                </div>
                <ToastContainer />
            </div>
        );
    }
}
