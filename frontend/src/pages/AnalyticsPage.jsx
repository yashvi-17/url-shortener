import React from "react";
import AnalyticsForm from "../components/AnalyticsForm";
import { styles } from "../styles";

const AnalyticsPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>URL Analytics</h1>
        <p style={styles.subtitle}>
          Track performance of your shortened URLs
        </p>

        <AnalyticsForm />
      </div>
    </div>
  );
};

export default AnalyticsPage;