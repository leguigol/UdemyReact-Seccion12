import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const LayoutRoot = () => {
    return (
    <>
        <Navbar />
        <Outlet />
        <footer>Footer</footer>
    </>
    )
}

export default LayoutRoot;
