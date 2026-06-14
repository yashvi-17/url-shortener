import React from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { styles } from "../styles";
import { useLocation } from "@tanstack/react-router";

const AuthPage = () => {
  const location = useLocation();

  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

  return (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        <h1 style={styles.title}>
          {isLogin ? "Login" : "Register"}
        </h1>

        {isLogin ? (
          <LoginForm styles={styles} />
        ) : (
          <RegisterForm styles={styles} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;