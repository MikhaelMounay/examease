import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../contexts/AuthWrapper";
import { useMutation } from "@tanstack/react-query";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login } = AuthData();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const loginMutation = useMutation({
        mutationFn: async (data: { email: string; password: string }) => {
            await login(data.email, data.password);
        },
        onSuccess: () => {
            navigate("/home");
        },
        onError: () => {
            setErrorMessage("Invalid login credentials, please try again.");
        },
    });

    const validateEmail = (email: string) => {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
    };

    const handleLogin = () => {
        if (!email || !password) {
            setErrorMessage("Email and password are required.");
        } else if (!validateEmail(email)) {
            setErrorMessage("Please enter a valid email address.");
        } else if (password.length < 6) {
            setErrorMessage("Password should be at least 6 characters long.");
        } else {
            setErrorMessage("");
            loginMutation.mutate({ email, password });
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <div className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <button onClick={handleLogin} className="login-button">
                    Login
                </button>
            </div>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <p className="register-message">
                New to the app?{" "}
                <span className="register-link" onClick={() => navigate("/register")}>
                    Register
                </span>
            </p>
        </div>
    );
};

export default LoginPage;
