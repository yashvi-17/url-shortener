import React from 'react'
import UrlForm from '../components/UrlForm';
const Homepage = ({
  error,
  styles
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>URL Shortener</h1>
        <p style={styles.subtitle}>Convert your long URLs into short, shareable links</p>

        <UrlForm
          error={error}
          styles={styles}
        />
      </div>
    </div>
  )
}
export default Homepage;
