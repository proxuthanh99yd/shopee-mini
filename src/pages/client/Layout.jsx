import { Outlet } from "react-router-dom";
import { Footer, Header } from "../../components/client";

export default function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}
