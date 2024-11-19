import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthWrapper";
import { useEffect, useState } from "react";
import Preloader from "../layout/Preloader.tsx";

const NavigationGuard = function () {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("NavigationGuard isAuthenticated: ", isAuthenticated);
        if ((isAuthenticated && pathname.includes("login")) || pathname.includes("register")) {
            navigate("/", { replace: true });
            setIsLoading(false);
        } else if (isAuthenticated === false) {
            navigate("/login");
            setIsLoading(false);
        }
    }, [navigate, isAuthenticated]);

    if (isLoading) {
        return <Preloader />;
    }

    return <Outlet />;
};

export default NavigationGuard;
