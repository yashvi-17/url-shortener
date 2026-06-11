import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUserUrls } from "../api/user.api";
import { styles } from "../styles";

const AnalyticsForm = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  });

  const urls = data?.urls || [];

  const totalUrls = urls.length;

  const totalClicks = urls.reduce(
    (acc, url) => acc + Number(url.clicks || 0),
    0
  );

  const avgClicks =
    totalUrls > 0 ? (totalClicks / totalUrls).toFixed(1) : 0;

  const topUrls = [...urls]
    .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
    .slice(0, 5);

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Loading Analytics...</h2>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Error</h2>
          <p style={styles.errorMessage}>
            {error?.message || "Error loading analytics"}
          </p>
        </div>
      </div>
    );
  }

  return (
  <div>
    {/* STATS SECTION */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      <div style={styles.resultCard}>
        <h2 style={{ margin: 0, fontSize: "2rem" }}>{totalUrls}</h2>
        <p style={{ margin: 0 }}>Total URLs</p>
      </div>

      <div style={styles.resultCard}>
        <h2 style={{ margin: 0, fontSize: "2rem" }}>{totalClicks}</h2>
        <p style={{ margin: 0 }}>Total Clicks</p>
      </div>

      <div style={styles.resultCard}>
        <h2 style={{ margin: 0, fontSize: "2rem" }}>{avgClicks}</h2>
        <p style={{ margin: 0 }}>Avg Clicks</p>
      </div>
    </div>

    {/* TOP URLs */}
    <div style={{ marginTop: "30px" }}>
      <h2 style={{ marginBottom: "15px", color: "#333" }}>
        Top Performing URLs
      </h2>

      {topUrls.length === 0 ? (
        <p style={{ color: "#666" }}>No analytics data yet</p>
      ) : (
        topUrls.map((url) => (
          <div key={url._id} style={styles.resultCard}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p style={{ margin: 0, color: "#667eea", fontWeight: 600 }}>
                  {url.short_Url || url.shortUrl}
                </p>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#666" }}>
                  {url.full_Url || url.originalUrl}
                </p>
              </div>

              <div
                style={{
                  background: "#27ae60",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  fontWeight: 600,
                  height: "fit-content",
                }}
              >
                {url.clicks || 0} clicks
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);
}

export default AnalyticsForm;