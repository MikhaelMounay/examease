import { createContext, useContext, useEffect, useState } from "react";
import { UserWithoutPassword } from "../types/User";
import MainLayout from "../layouts/MainLayout";
import LoginLayout from "../layouts/LoginLayout";

// Types & Interfaces
type AuthContextData = {
    userData?: UserWithoutPassword | null;
    token?: string | null;
    isAuthenticated: boolean;
};

const AuthContext = createContext<{
    user: AuthContextData;
    login: (email: string, password: string) => Promise<unknown>;
    logout: () => void;
}>({
    user: {
        userData: null,
        token: null,
        isAuthenticated: false,
    },
    login: async () => {},
    logout: () => {},
});
export const AuthData = () => useContext(AuthContext);

const AuthWrapper: React.FC = function () {
    // States
    const [user, setUser] = useState<AuthContextData>({
        userData: null,
        token: null,
        isAuthenticated: true,
    });

    useEffect(() => {
        const token = localStorage.getItem("user_token");
        if (!token) {
            return;
        }

        fetch(import.meta.env.VITE_API_URL + "/users/user", {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (token && data) {
                    setUser({
                        userData: JSON.parse(data),
                        token: token,
                        isAuthenticated: true,
                    });
                }
            })
            .catch((err) => {
                console.log("Error: ", err);
            });
    }, []);

    // Methods
    function login(email: string, password: string) {
        return new Promise((resolve, reject) => {
            try {
                fetch(import.meta.env.VITE_API_URL + "/users/login", {
                    body: JSON.stringify({ email, password }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        const { token, ...userWithoutPassword } = data;
                        setUser({
                            userData: userWithoutPassword,
                            token: token,
                            isAuthenticated: true,
                        });
                        localStorage.setItem("user_token", token);
                        resolve(data);
                    });
            } catch (err) {
                console.log("Error: ", err);
                reject(err);
            }
        });
    }

    function logout() {
        setUser({ userData: null, token: null, isAuthenticated: false });
        localStorage.removeItem("user_token");
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {user.isAuthenticated && <MainLayout />}
            {!user.isAuthenticated && <LoginLayout />}
        </AuthContext.Provider>
    );
};

export default AuthWrapper;
