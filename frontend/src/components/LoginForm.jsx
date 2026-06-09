import React, { useState } from "react";
import { loginUser } from "../api/user.api";

const LoginForm = ({
    state,
    onLoginSuccess,
    onSwitchToRegister,
    styles
}) => {
    const [email, setEmail] = useState("yashvivr@gmail.com");
    const [password, setPassword] = useState("password123");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const data = await loginUser(password,email);

            if (onLoginSuccess) {
                onLoginSuccess(data);
            }
            
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
        <div>
            <form onSubmit={handleSubmit}>
                <div style={styles.inputGroup}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
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
                    style={{
                        ...styles.button,
                        opacity: loading ? 0.7 : 1,
                        cursor: loading ? "not-allowed" : "pointer",
                    }}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                <div
                    style={{
                        textAlign: "center",
                        marginTop: "15px",
                    }}
                >
                    <p cursor-pointer="true" >Don't have an account? <span  onClick={onSwitchToRegister}></span></p>

                    <button
                        type="button"
                        onClick={onSwitchToRegister}
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
        </div>
    );
};

export default LoginForm;