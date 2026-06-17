import React, { useState } from "react";
import { loginUser } from "../api/user.api";
import { useDispatch } from "react-redux";
import { login } from "../store/slice/authSlice";
import { useNavigate } from "@tanstack/react-router";

const LoginForm = ({ styles }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const data = await loginUser(email, password);

            dispatch(login(data.user));
            navigate({ to: "/dashboard" });

            console.log("successful login!");
        } catch (err) {
            setError(
                err.message || "Login failed. Please check your credentials."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 style={{ marginBottom: "20px" }}>Login</h2>

            <div style={styles.inputGroup}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    style={styles.input}
                    required
                />
            </div>

            <div style={styles.inputGroup}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    style={styles.input}
                    required
                />
            </div>

            {error && (
                <div style={styles.errorMessage}>
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                style={styles.button}
            >
                {loading ? "Logging in..." : "Login"}
            </button>

            {/* switch to register */}
            <div
                style={{
                    textAlign: "center",
                    marginTop: "15px",
                    fontSize: "0.9rem"
                }}
            >
                <p>Don't have an account?</p>

                <button
                    type="button"
                    onClick={() => navigate({ to: "/register" })}
                    style={{
                        background: "none",
                        border: "none",
                        color: "#2563eb",
                        cursor: "pointer",
                        textDecoration: "underline",
                        padding: 0,
                        fontSize: "inherit",
                    }}
                >
                    Register
                </button>
            </div>
        </form>
    );
};

export default LoginForm;