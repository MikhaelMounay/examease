import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewUser, Role } from "../../types/User.ts";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthWrapper.tsx";

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    // States
    const [errorMessage, setErrorMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [aucId, setAucId] = useState("");
    const [role, setRole] = useState<Role>("STUDENT");

    const registerMutation = useMutation({
        mutationFn: async (data: NewUser) => {
            await register(data);
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

    const handleRegister = () => {
        console.log("Function is called");
        if (name && email && password && confirmPassword && aucId && role) {
            if (!validateEmail(email)) {
                setErrorMessage("Please enter a valid email address.");
                return;
            } else if (password.length < 6) {
                setErrorMessage("Password should be at least 6 characters long.");
                return;
            } else if (password !== confirmPassword) {
                setErrorMessage("Passwords don't match");
                return;
            }
        }

        if (!name || !email || !password || !confirmPassword || !aucId || !role) {
            setErrorMessage("All fields are required");
            return;
        }

        setErrorMessage("");
        registerMutation.mutate({ name, email, password, aucId, role });
    };
    return (
        <div className="register-container">
            <h1>Register</h1>
            <div className="register-form">
                <input
                    type="text"
                    placeholder="Name"
                    className="register-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="register-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="register-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="register-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="ID"
                    className="register-input"
                    value={aucId}
                    onChange={(e) => setAucId(e.target.value)}
                />

                <div className="role-selection">
                    <label>
                        <input
                            type="radio"
                            value="Student"
                            checked={role === "STUDENT"}
                            onChange={() => setRole("STUDENT")}
                        />
                        Student
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Teacher"
                            checked={role === "INSTRUCTOR"}
                            onChange={() => setRole("INSTRUCTOR")}
                        />
                        Teacher
                    </label>
                </div>

                <button onClick={handleRegister} className="register-button">
                    Register
                </button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
            <p className="login-message">
                Already have an account?{" "}
                <span className="login-link" onClick={() => navigate("/login")}>
                    Login
                </span>
            </p>
        </div>
    );
};

export default RegisterPage;
