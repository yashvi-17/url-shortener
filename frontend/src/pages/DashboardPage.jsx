import React from 'react'
import UrlForm from '../components/UrlForm';
import { styles } from '../styles';
import UserUrl from '../components/UserUrl';

const DashboardPage = () => {
  return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>URL Shortener</h1>
  
          <UrlForm
            error=""
            styles={styles}
          />
          <UserUrl/>
        </div>
      </div>
    );
}

export default DashboardPage;
