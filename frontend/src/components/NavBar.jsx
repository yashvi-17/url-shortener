import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { logoutUser } from "../api/user.api";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slice/authSlice";
import { useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    console.log("logout clicked");

    try {
      await logoutUser();

      dispatch(logout());
      queryClient.clear();

      navigate({ to: "/auth" });
    } catch (err) {
      console.log("Logout failed:", err.message);
    }
  };

  return (
    <nav style={styles.navbar}>
      {/* LEFT */}
      <div style={styles.brand}>🔗 URL Shortener</div>

      {/* CENTER */}
      <div style={styles.centerLinks}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/analytics" style={styles.link}>Analytics</Link>
      </div>

      {/* RIGHT */}
      <div style={styles.authSection}>
        {!isAuthenticated ? (
          <>
            <Link to="/login" style={styles.loginBtn}>
              Login
            </Link>

            <Link to="/register" style={styles.signupBtn}>
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            style={styles.logoutButton}
            type="button"
          >
            Logout
          </button>
        )}
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
    zIndex: 9999,
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

  logoutButton: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#e74c3c",
    color: "white",
    fontWeight: "600",
  },
};

export default Navbar;