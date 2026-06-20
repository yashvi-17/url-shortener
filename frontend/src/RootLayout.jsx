import React, { useState } from 'react';
import UrlForm from "./components/UrlForm";
import Homepage from "./pages/homepage";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import AuthPage from './pages/AuthPage';
import { Outlet } from "@tanstack/react-router";
import {styles} from "./styles.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/slice/authSlice";
import { getCurrentUser } from "./api/user.api";

const RootLayout = () => {
  const [urlInput, setUrlInput] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState('');
  const [copyMessage, setCopyMessage] = useState('');
  const dispatch = useDispatch();

  const generateShortUrl = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortCode = '';
    for (let i = 0; i < 6; i++) {
      shortCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return `https://short.url/${shortCode}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopyMessage('Copied to clipboard!');
    setTimeout(() => setCopyMessage(''), 2000);
  };

  const handleReset = () => {
    setUrlInput('');
    setShortUrl('');
    setShowResult(false);
    setError('');
    setCopyMessage('');
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking auth...");
        const data = await getCurrentUser();
        console.log("ME RESPONSE:", data);
        dispatch(login(data.user));
      } catch (err) {
        console.log("AUTH FAILED:", err);
        dispatch(logout());
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <>
      <NavBar/>
      <Outlet
        context={{
          urlInput,
          setUrlInput,
          shortUrl,
          setShortUrl,
          showResult,
          setShowResult,
          error,
          setError,
          copyMessage,
          setCopyMessage,
          styles,
          handleCopy,
          handleReset,
          generateShortUrl,
        }}
      />

      {showResult && (
        <div style={styles.resultSection}>
          <div style={styles.resultCard}>
            <h3 style={styles.resultTitle}>Your Shortened URL</h3>

            <div style={styles.resultDisplay}>
              <input
                type="text"
                value={shortUrl}
                readOnly
                style={styles.shortUrlInput}
              />
              <button onClick={handleCopy} style={styles.copyButton}>
                Copy
              </button>
            </div>

            {copyMessage && (
              <div style={styles.copyMessage}>
                {copyMessage}
              </div>
            )}
          </div>

          <button onClick={handleReset} style={styles.resetButton}>
            Shorten Another URL
          </button>
        </div>
      )}
    </>
  );
};

export default RootLayout;