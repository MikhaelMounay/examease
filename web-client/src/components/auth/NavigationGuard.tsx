import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthWrapper";
import { useEffect } from "react";
import Preloader from "../layout/Preloader.tsx";

const NavigationGuard = function () {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        console.log("NavigationGuard isAuthenticated: ", isAuthenticated);
        if (isAuthenticated && pathname.includes("login") || pathname.includes("register")) {
            navigate("/", { replace: true });
        } else if (isAuthenticated === false) {
            navigate("/login");
        }
    }, [navigate, pathname, isAuthenticated]);

    if (isAuthenticated === null) {
        return <Preloader />;
    }

    return <Outlet />;
};

export default NavigationGuard;
