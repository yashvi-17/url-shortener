import React, { useState } from 'react';
import { createShortUrl } from '../api/shortUrl.api'
import { useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';

const UrlForm = ({
  error,
  styles
}) => {
  const [url, setUrl] = useState("https://www.google.com");
  const [shortUrl, setShortUrl] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [customSlug, setCustomSlug] = useState("");

  const {isAuthenticated} = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError("");
    setCopyMessage("");

    try {
      const result = await createShortUrl(url,customSlug);
      setShortUrl(result);
      queryClient.invalidateQueries({querykey: ["userUrls"]});
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

      {/*only logged in users get the option for custom slug*/}
      {isAuthenticated && ( 
        <>
          <p
            style={{
              color: "#666",
              fontSize: "0.9rem",
              marginBottom: "8px",
            }}
          >
            Custom URL (optional)
          </p>

          <input
            type="text"
            placeholder="Enter Custom Slug"
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
            style={{
              ...styles.input,
              width: "1185px",
              boxSizing: "border-box",
            }}
          />
        </>
      )}
      {/*{ later in api request
            longUrl: urlInput,
            customSlug
          }*/}

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