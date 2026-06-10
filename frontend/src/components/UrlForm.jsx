import React, { useState } from 'react';
import { createShortUrl } from '../api/shortUrl.api'

const UrlForm = ({
  error,
  styles
}) => {
  const [url, setUrl] = useState("https://www.google.com");
  const [shortUrl, setShortUrl] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError("");
    setCopyMessage("");

    try {
      const result = await createShortUrl(url);
      setShortUrl(result);
    } catch (err) {
      setApiError(err.message || "Error creating short URL");
      setShortUrl("");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopyMessage("Copied to clipboard!");
    setTimeout(() => setCopyMessage(""), 2000);
  };

  const handleReset = () => {
    setUrl("https://www.google.com");
    setShortUrl("");
    setCopyMessage("");
    setApiError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={styles.inputGroup}>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your URL here..."
          style={styles.input}
          required
        />
        <button 
          type="submit"
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
          disabled={loading}
        >
          {loading ? "Creating..." : "Shorten URL"}
        </button>
      </div>

      {error && (
        <div style={styles.errorMessage}>
          {error}
        </div>
      )}

      {apiError && (
        <div style={styles.errorMessage}>
          {apiError}
        </div>
      )}

      {shortUrl && (
        <div style={styles.resultCard}>
          <h3 style={styles.resultTitle}>Your Shortened URL</h3>
          <div style={styles.resultDisplay}>
            <input
              type="text"
              value={shortUrl}
              readOnly
              style={styles.shortUrlInput}
            />
            <button 
              type="button"
              onClick={handleCopy} 
              style={styles.copyButton}
            >
              Copy
            </button>
          </div>

          {copyMessage && (
            <div style={styles.copyMessage}>
              {copyMessage}
            </div>
          )}

          <button 
            type="button"
            onClick={handleReset} 
            style={styles.resetButton}
          >
            Shorten Another URL
          </button>
        </div>
      )}
    </form>
  );
};

export default UrlForm;