import React from "react";
import UrlForm from "../components/UrlForm";
import { styles } from "../styles";

const Homepage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>URL Shortener</h1>

        <UrlForm
          error=""
          styles={styles}
        />
      </div>
    </div>
  );
};

export default Homepage;