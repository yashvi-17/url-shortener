import React,{useState} from 'react';
import axios from 'axios';
const UrlForm = ({
  error,
  styles
}) => {
    const [url,setUrl]=useState("https://www.google.com");
    const [shortUrl,setShortUrl]=useState();
    const handleSubmit= async () => {
        const {data} = await axios.post("http://localhost:5000/api/create",{url});
        setShortUrl(data.shortUrl);
    }
    const [copyMessage, setCopyMessage] = useState("");
    const [apiError, setApiError] = useState("");
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
        <button onClick={handleSubmit} type="submit" style={styles.button}>
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