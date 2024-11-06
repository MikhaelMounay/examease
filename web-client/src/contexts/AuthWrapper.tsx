import { createContext, useContext, useEffect, useState } from "react";
import { NewUser, UserWithoutPassword } from "../types/User";
import MainLayout from "../layouts/MainLayout";
import LoginLayout from "../layouts/LoginLayout";

// Types & Interfaces
type AuthContextData = {
    userData?: UserWithoutPassword | null;
    token?: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<unknown>;
    register: (data: NewUser) => Promise<unknown>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextData>({
    userData: null,
    token: null,
    isAuthenticated: true,
    login: async () => {},
    register: async () => {},
    logout: () => {},
});
export const AuthData = () => useContext(AuthContext);

const AuthWrapper: React.FC = function () {
    // States
    const [userData, setUserData] = useState<UserWithoutPassword | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem("user_token");
        if (!token) {
            setIsAuthenticated(false);
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
                    setUserData(data);
                    setToken(token);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            })
            .catch((err) => {
                console.log("Error: ", err);
                setIsAuthenticated(false);
            });
    }, []);

    // Methods
    function login(email: string, password: string) {
        return new Promise((resolve, reject) => {
            try {
                fetch(import.meta.env.VITE_API_URL + "/users/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        const { token, ...userWithoutPassword } = data;
                        setUserData(userWithoutPassword);
                        setToken(token);
                        setIsAuthenticated(true);
                        localStorage.setItem("user_token", token);
                        resolve(data);
                    });
            } catch (err) {
                console.log("Error: ", err);
                reject(err);
            }
        });
    }

    function register(data: NewUser) {
        return new Promise((resolve, reject) => {
            try {
                fetch(import.meta.env.VITE_API_URL + "/users/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        const { token, ...userWithoutPassword } = data;
                        setUserData(userWithoutPassword);
                        setToken(token);
                        setIsAuthenticated(true);
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
        setUserData(null);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user_token");
    }

    return (
        <AuthContext.Provider value={{ userData, token, isAuthenticated, login, register, logout }}>
            {isAuthenticated && <MainLayout />}
            {!isAuthenticated && <LoginLayout />}
        </AuthContext.Provider>
    );
};

export default AuthWrapper;
