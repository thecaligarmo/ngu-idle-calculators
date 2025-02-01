import { Outlet } from "react-router";
import Footer from "./Footer";
import Nav from "./Nav";

export default function RootLayout() {
    return (
        <>
            <Nav />
            <Outlet />
            <Footer />
        </>
    )
}