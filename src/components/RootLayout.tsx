import Footer from "./Footer";
import Nav from "./Nav";
import { Outlet } from "react-router";

export default function RootLayout() {
    return (
        <>
        
            <Nav />
            <Outlet />
            <Footer />
        </>
    )
}