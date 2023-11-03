import { Outlet, useNavigate } from "react-router-dom";
import { Footer, Header } from "../../components/client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    authentication,
    logout,
} from "../../features/client/account/accountThunkApi";
import { fetchMyCarts } from "../../features/client/carts/cartsThunkApi";
import { setSearchParam } from "../../features/client/products/productsSlice";
import { fetchProducts } from "../../features/client/products/productsThunkApi";
import { setSidebar } from "../../features/client/account/accountSlice";
export default function Layout() {
    const {
        authToken,
        user,
        isAuthenticating,
        isAuthenticated,
        isLogin,
        sidebar,
    } = useSelector((state) => state.account);
    const { searchParam, sort, brandFilter, categoryFilter, currentPage } =
        useSelector((state) => state.products);
    const { myCart } = useSelector((state) => state.carts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user?.name) {
            if (authToken) {
                dispatch(authentication());
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (isAuthenticated || isLogin) {
            dispatch(fetchMyCarts());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isLogin]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/", { replace: true });
    };
    const handleSetSearchParam = (e) => {
        dispatch(setSearchParam(e.target.value));
    };
    const handleSearch = () => {
        dispatch(
            fetchProducts({
                sort,
                brandFilter,
                categoryFilter,
                page: currentPage,
                search: searchParam,
            }),
        );
    };
    const handleSetSidebar = () => {
        dispatch(setSidebar());
    };
    return (
        <>
            <Header
                sidebar={sidebar}
                setSidebar={handleSetSidebar}
                handleSearch={handleSearch}
                setSearchParam={handleSetSearchParam}
                searchParam={searchParam}
                carts={myCart}
                isAdmin={user?.role === 0}
                name={user?.name}
                handleLogout={handleLogout}
                isAuthenticating={isAuthenticating}
                isAuthenticated={isAuthenticated}
                isLogin={isLogin}
            />
            <Outlet context={{ isAuthenticated, isLogin }} />
            <Footer />
        </>
    );
}
