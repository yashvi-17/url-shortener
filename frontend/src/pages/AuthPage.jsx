import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import {styles } from "../styles";

const AuthPage = () => {
  const [login, setLogin] = useState(true);
  return (
    <div style={styles.container}>
      {login ? (
        <div style={styles.card}>
          <h1 style={styles.title}>Login</h1>

          <LoginForm
            error=""
            styles={styles}
            onSwitchToRegister={() => setLogin(false)}
          />
        </div>
      ) : (
        <div style={styles.card}>
          <h1 style={styles.title}>Register</h1>

          <RegisterForm
            error=""
            styles={styles}
            onSwitchToLogin={() => setLogin(true)}
          />
        </div>
      )}
    </div>
  );
};

export default AuthPage;