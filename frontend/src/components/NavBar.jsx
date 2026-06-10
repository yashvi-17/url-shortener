import React from "react";
import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      {/* Left */}
      <div style={styles.brand}>
        🔗 URL Shortener
      </div>

      {/* Center */}
      <div style={styles.centerLinks}>
        <Link to="/" style={styles.link}>
          Home
        </Link> {/*we use links instead of a tags as they refresh the page and this saves us from constant reloads*/}

        <Link to="/dashboard" style={styles.link}>
          Dashboard
        </Link>

        <Link to="/analytics" style={styles.link}>
          Analytics
        </Link>
      </div>

      {/* Right */}
      <div style={styles.authSection}>
        <Link to="/auth" style={styles.loginBtn}>
          Login
        </Link>

        <Link to="/auth" style={styles.signupBtn}>
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    height: "70px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 40px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  brand: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#667eea",
    minWidth: "200px",
  },

  centerLinks: {
    display: "flex",
    gap: "30px",
    alignItems: "center",
  },

  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
    fontSize: "1rem",
  },

  authSection: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    minWidth: "200px",
    justifyContent: "flex-end",
  },

  loginBtn: {
    textDecoration: "none",
    color: "#667eea",
    fontWeight: "600",
    padding: "10px 18px",
    borderRadius: "8px",
  },

  signupBtn: {
    textDecoration: "none",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "10px 18px",
    borderRadius: "8px",
    fontWeight: "600",
  },
};

export default Navbar;