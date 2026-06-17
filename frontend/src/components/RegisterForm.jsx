import React, { useState } from "react";
import { RegisterUser } from "../api/user.api";
import { useDispatch } from "react-redux";
import { login } from "../store/slice/authSlice";
import { useNavigate } from "@tanstack/react-router";

const RegisterForm = ({ onSwitchToLogin, styles }) => {
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
      <h2 style={{ marginBottom: "20px" }}>Register</h2>

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

      {error && <div style={styles.errorMessage}>{error}</div>}

      <button type="submit" style={styles.button} disabled={loading}>
        {loading ? "Creating account..." : "Register"}
      </button>

        <div
            style={{
                textAlign: "center",
                marginTop: "15px",
                fontSize: "0.9rem"
            }}
        >
            <p>
                Already have an account?
            </p>

            <button
                type="button"
                onClick={onSwitchToLogin}
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
                Login
            </button>
        </div>
    </form>
  );
};

export default RegisterForm;