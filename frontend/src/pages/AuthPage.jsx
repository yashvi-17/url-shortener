import React, { useState } from "react";
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthPage = ({
  error,
  styles
}) => {
    const [login, setLogin] = useState(true);
    return (
    
    <div style={styles.container}>
      {login?(
      <div style={styles.card}>
        <h1 style={styles.title}>Login</h1>
        <p style={styles.subtitle}></p>

        <LoginForm onSwitchToRegister={() => setLogin(false)}
            error={error}
            styles={styles}
        />
      </div>
      ):(
        <div style={styles.card}>
            <h1 style={styles.title}>Register</h1>
            <p style={styles.subtitle}></p>

            <RegisterForm onSwitchToLogin={() => setLogin(true)}
                error={error}
                styles={styles}
            />
        </div>
      )}
    </div>
  )
}

export default AuthPage;