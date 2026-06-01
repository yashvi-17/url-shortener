import React,{useState} from 'react';
import axios from 'axios';
const UrlForm = ({
  error,
  styles
}) => {
    const [url,setValue]=useState("https://www.google.com");
    const handleSubmit= async () => {
        const data = await axios.post("/api/create",{url});
        console.log(data);
    }
  return (
    <form onSubmit={handleSubmit}>
      <div style={styles.inputGroup}>
        <input
          type="url"
          value={url}
          onInput={(event)=>setValue(event.target.value)}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Enter your URL here..."
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Shorten URL
        </button>
      </div>

      {error && (
        <div style={styles.errorMessage}>
          {error}
        </div>
      )}
    </form>
  );
};

export default UrlForm;