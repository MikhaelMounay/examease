import { Navigate } from "react-router-dom";
import { AuthData } from "../../contexts/AuthWrapper";

export const ProtectedRoute = ({ Component }: { Component: React.FC }) => {
    const { user } = AuthData();

    if (!user.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Component />;
};
