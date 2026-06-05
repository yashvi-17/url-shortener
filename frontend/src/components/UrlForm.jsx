import React,{useState} from 'react';
import axios from 'axios';
import {createShortUrl} from '../api/shortUrl.api'
const UrlForm = ({
  error,
  styles
}) => {
    const [url,setUrl]=useState("https://www.google.com");
    const [shortUrl,setShortUrl]=useState();
    const [copyMessage, setCopyMessage] = useState("");
    const [apiError, setApiError] = useState("");

    const handleSubmit= async () => {
      const shortUrl = await createShortUrl(url);
      setShortUrl(shortUrl);
    }

    const handleCopy = async () => {
      await navigator.clipboard.writeText(shortUrl);
      setCopyMessage("Copied!");
    };

    const handleReset = () => {
      setUrl("");
      setShortUrl("");
      setCopyMessage("");
    };

  return (
    <div>
      <div style={styles.inputGroup}>
        <input
          type="url"
          value={url}
          onInput={(event)=>setUrl(event.target.value)}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your URL here..."
          style={styles.input}
          required
        />
        <button 
          type="button"
          onClick={() => {
            handleSubmit();
          }}
          style={styles.button}
        >
          Shorten URL
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
              onClick={handleCopy} 
              style={styles.copyButton}
            >
              Copy
            </button>
          </div>

          {/* Copy Success Message */}
          {copyMessage && (
            <div style={styles.copyMessage}>
              {copyMessage}
            </div>
          )}

          {/* Reset Button */}
          <button 
            onClick={handleReset} 
            style={styles.resetButton}
          >
            Shorten Another URL
          </button>
        </div>
      )}
    </div>
  );
};

export default UrlForm;