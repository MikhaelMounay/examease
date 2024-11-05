import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout: React.FC = function () {
        return (
            <div className="main-layout">
                <Navbar />
                <Outlet />
            </div>
        );
};

export default MainLayout;
