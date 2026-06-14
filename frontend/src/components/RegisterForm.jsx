import React, { useState } from "react";
import { RegisterUser} from "../api/user.api";
import { useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector} from "react-redux";
import { login } from "../store/slice/authSlice";

const RegisterForm = ({
    state,
    onRegisterSuccess,
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

        if(password.length<6){
            setError("Password must be atleast 6 characters long");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const data = await RegisterUser({name, email, password});
            dispatch(login(data.user));
            navigate({to:"/dashboard"});

            if (onRegisterSuccess) {
                onRegisterSuccess(data);
            }
        } catch (err) {
            setError(
                err.message ||
                "Registration failed. Please try again."
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
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    {loading ? "Creating account..." : "Register"}
                </button>

                {/* Switch to Login */}
                <div
                    style={{
                        textAlign: "center",
                        marginTop: "15px",
                        fontSize: "0.9rem"
                    }}
                >
                    <p cursor-pointer="true" >Already have an account?<span onClick={onSwitchToLogin}></span> </p>

                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        style={{
                            background: "none",
                            border: "none",
                            color: "#2563eb",
                            cursor: "pointer",
                            textDecoration: "underline"
                        }}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;