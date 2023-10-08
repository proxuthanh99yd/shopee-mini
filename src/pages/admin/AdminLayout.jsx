import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../../components/admin";
import { useEffect, useState } from "react";

export default function AdminLayout() {
    const [menu, setMenu] = useState(true);
    useEffect(() => {
        if (screen.width < 768) {
            setMenu(false);
        }
    }, []);
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
                <Navbar setMenu={setMenu} />
                <Outlet />
            </div>
        </div>
    );
}
