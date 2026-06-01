import React, { useState } from 'react';
import UrlForm from "./components/UrlForm";
import Homepage from "./pages/homepage";
const App = () => {
  const [urlInput, setUrlInput] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

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

  const styles = {
    container: {
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    card: {
      background: 'white',
      borderRadius: '12px',
      padding: '40px 30px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      width: '100%',
      maxWidth: '600px',
    },
    title: {
      color: '#333',
      fontSize: '2.5rem',
      marginBottom: '10px',
      textAlign: 'center',
      margin: '0 0 10px 0',
    },
    subtitle: {
      color: '#666',
      fontSize: '1rem',
      textAlign: 'center',
      marginBottom: '30px',
    },
    inputGroup: {
      display: 'flex',
      gap: '10px',
      marginBottom: '15px',
      flexWrap: 'wrap',
    },
    input: {
      flex: 1,
      minWidth: '200px',
      padding: '12px 16px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
    },
    button: {
      padding: '12px 28px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      whiteSpace: 'nowrap',
    },
    errorMessage: {
      color: '#e74c3c',
      fontSize: '0.9rem',
      marginTop: '8px',
      padding: '10px',
      backgroundColor: '#fadbd8',
      borderRadius: '6px',
      borderLeft: '4px solid #e74c3c',
    },
    resultSection: {
      animation: 'slideIn 0.3s ease',
    },
    resultCard: {
      background: '#f8f9fa',
      border: '2px solid #667eea',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
    },
    resultTitle: {
      color: '#333',
      marginBottom: '15px',
      fontSize: '1.2rem',
      margin: '0 0 15px 0',
    },
    resultDisplay: {
      display: 'flex',
      gap: '10px',
      marginBottom: '15px',
      flexWrap: 'wrap',
    },
    shortUrlInput: {
      flex: 1,
      minWidth: '200px',
      padding: '12px 16px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '1rem',
      background: 'white',
      color: '#333',
      fontWeight: '500',
    },
    copyButton: {
      padding: '12px 24px',
      background: '#27ae60',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
    },
    copyMessage: {
      color: '#27ae60',
      fontSize: '0.9rem',
      padding: '10px',
      backgroundColor: '#d5f4e6',
      borderRadius: '6px',
      borderLeft: '4px solid #27ae60',
      textAlign: 'center',
      marginTop: '10px',
    },
    resetButton: {
      width: '100%',
      padding: '12px',
      background: '#95a5a6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
  };

  return (
  <>
    <Homepage
      error={error}
      styles={styles}
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

export default App;