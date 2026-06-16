import React, { useState } from "react";
import { loginUser } from "../api/user.api";
import {useDispatch, useSelector} from "react-redux";
import { login } from "../store/slice/authSlice";
import { useNavigate } from "@tanstack/react-router";

const LoginForm = ({
    onSwitchToRegister,
    styles
}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
 
        setLoading(true);
        setError("");

        try {
            const data = await loginUser(email,password);
            dispatch(login(data.user)) //dispatch required whenever accessing functions from slice [wrapper of login]
            navigate({to:"/dashboard"});
            console.log("successful login!");
        } catch (err) {
            setError(
                err.message ||
                "Login failed. Please check your credentials."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                style={styles.input}
                required
            />

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={styles.input}
                required
            />

            {error && <div style={styles.errorMessage}>{error}</div>}

            <button
                type="submit"
                disabled={loading}
                style={styles.button}
            >
                {loading ? "Logging in..." : "Login"}
            </button>

            {/* switch to register */}
            <p style={{ textAlign: "center", marginTop: "10px" }}>
                Don’t have an account?{" "}
                <span
                    onClick={onSwitchToRegister}
                    style={{
                        color: "#2563eb",
                        cursor: "pointer",
                        textDecoration: "underline"
                    }}
                >
                    Register
                </span>
            </p>

        </form>
    );
};

export default LoginForm;