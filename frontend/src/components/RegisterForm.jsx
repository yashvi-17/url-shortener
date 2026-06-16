import React, { useState } from "react";
import { RegisterUser } from "../api/user.api";
import { useDispatch } from "react-redux";
import { login } from "../store/slice/authSlice";
import { useNavigate } from "@tanstack/react-router";

const RegisterForm = ({
    onSwitchToLogin,
    styles
}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const data = await RegisterUser({ name, email, password });
            dispatch(login(data.user));
            navigate({ to: "/dashboard" });
        } catch (err) {
            setError(err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
                required
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
            />

            {error && <div style={styles.errorMessage}>{error}</div>}

            <button
                type="submit"
                disabled={loading}
                style={styles.button}
            >
                {loading ? "Creating account..." : "Register"}
            </button>

            {/* switch to login */}
            <p style={{ textAlign: "center", marginTop: "10px" }}>
                Already have an account?{" "}
                <span
                    onClick={onSwitchToLogin}
                    style={{
                        color: "#2563eb",
                        cursor: "pointer",
                        textDecoration: "underline"
                    }}
                >
                    Login
                </span>
            </p>

        </form>
    );
};

export default RegisterForm;