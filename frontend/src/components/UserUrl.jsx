import React, { useState } from "react";
import { getAllUserUrls } from "../api/user.api";
import { useQuery } from "@tanstack/react-query";

const UserUrl = () => {
    const {
        data: urls = [],
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ["userUrls"],
        queryFn: getAllUserUrls,
        refetchInterval: 30000,
        staleTime: 0,
    });
    console.log("api data",urls);
    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = async (id, shortUrl) => {
        try {
            await navigator.clipboard.writeText(shortUrl);

            setCopiedId(id);

            setTimeout(() => {
                setCopiedId(null);
            }, 1500);

        } catch (err) {
            console.log("Copy failed");
        }
    };

    if (isLoading) {
        return <div>Loading your URLs...</div>;
    }

    if (isError) {
        return <div>Error loading your URLs: {error.message}</div>;
    }

    if (!urls.urls || urls.urls.length === 0) {
        return (
            <div style={{ textAlign: "center", marginTop: "40px" }}>
                <p>No URLs found 😕</p>
            </div>
        );
    }

    const styles = {
        container: { 
            marginTop: "30px",
            width: "100%",
            overflowX: "auto",
        },
        title: {
            fontSize: "1.8rem",
            fontWeight: "600",
            marginBottom: "20px",
            color: "#333",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "30px",
            overflowX: "auto",
            background: "white",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        },
        tableContainer: {
            maxHeight: "500px",
            overflowY: "auto",
            marginTop: "30px",
        },
        th: {
            background: "#667eea",
            color: "white",
            padding: "15px",
            textAlign: "left",
        },
        td: {
            padding: "15px",
            borderBottom: "1px solid #eee",
            whiteSpace: "nowrap",
        },
        shortUrl: {
            color: "#667eea",
            fontWeight: "600",
        },
        copyBtn: {
            padding: "8px 16px",
            border: "none",
            borderRadius: "8px",
            background: "#27ae60",
            color: "white",
            cursor: "pointer",
            marginRight: "10px",
        },
        visitBtn: {
            padding: "8px 16px",
            borderRadius: "8px",
            background: "#667eea",
            color: "white",
            textDecoration: "none",
            display: "inline-block",
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>My URLs</h2>
            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Original URL</th>
                            <th style={styles.th}>Short URL</th>
                            <th style={styles.th}>Clicks</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {[...urls.urls].reverse().map((url) => (
                            <tr key={url._id}>
                                <td style={styles.td}>{url.full_Url}</td>

                                <td
                                    style={{
                                        ...styles.td,
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center",
                                    }}
                                >
                                    <span style={styles.short_Url}>
                                        {`http://localhost:5000/${url.short_Url}`}
                                    </span>
                                </td>

                                <td style={styles.td}>{url.clicks}</td>

                                <td
                                    style={{
                                        ...styles.td,
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center",
                                    }}
                                >
                                    <button
                                        style={styles.copyBtn}
                                        onClick={() =>
                                            handleCopy(url._id, `http://localhost:5000/${url.short_Url}`)
                                        }
                                    >
                                        {copiedId === url._id ? "Copied!" : "Copy"}
                                    </button>

                                    <a
                                        href={`http://localhost:5000/${url.short_Url}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={styles.visitBtn}
                                    >
                                        Visit
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserUrl;