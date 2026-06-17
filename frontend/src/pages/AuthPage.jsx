import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false); // start on Register like your screenshot

  const switchToLogin = () => setIsLogin(true);
  const switchToRegister = () => setIsLogin(false);

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
    },
    card: {
      width: "350px",
      padding: "30px",
      borderRadius: "12px",
      background: "white",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      textAlign: "center",
    },
    inputGroup: { marginBottom: "15px" },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
    },
    button: {
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "none",
      background: "#667eea",
      color: "white",
      fontWeight: "bold",
    },
    errorMessage: {
      color: "red",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {isLogin ? (
          <LoginForm
            onSwitchToRegister={switchToRegister}
            styles={styles}
          />
        ) : (
          <RegisterForm
            onSwitchToLogin={switchToLogin}
            styles={styles}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;