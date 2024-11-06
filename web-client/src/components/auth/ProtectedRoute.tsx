import { Outlet, useNavigate } from "react-router-dom";
import { AuthData } from "../../contexts/AuthWrapper";
import { useEffect } from "react";

export const ProtectedRoute = () => {
    const { isAuthenticated } = AuthData();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("ProtectedRoute isAuthenticated: ", isAuthenticated);
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [navigate, isAuthenticated]);

    return <Outlet />;
};
