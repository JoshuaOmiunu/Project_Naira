import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function News() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login page if not authenticated
      navigate("/login");
    }
  }, [navigate]);

  const toggleMenu = () => {
    setIsMenuActive((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.newsContent}>
          <h1 style={styles.heading}>Current Events</h1>
          <p style={styles.paragraph}>
            Inflation in Nigeria has reached unprecedented levels, affecting the
            daily lives of citizens. The government is implementing various
            measures to stabilize the economy, but challenges remain.
            Understanding these developments is crucial for individuals and
            businesses alike.
          </p>
          <p style={styles.paragraph}>
            Recent reports indicate fluctuations in commodity prices, leading to
            increased costs for essential goods. By keeping track of these
            changes, consumers can make informed decisions to mitigate the
            impact of rising prices on their budgets.
          </p>
        </div>

        <div style={styles.videos}>
          <iframe
            src="https://www.youtube.com/embed/DDAd4vMGuT4"
            title="YouTube video 1"
            allowFullScreen
            style={styles.iframe}
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/mX9GgqA-unc?si=x570M_7TqQKwbJF-"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={styles.iframe}
          ></iframe>
        </div>

        {isMobileView && (
          <div onClick={toggleMenu} style={styles.menuToggle}>
            ☰
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#D4E7BE", // Full page background color
    minHeight: "100vh", // Ensures full height coverage
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    padding: 0,
  },
  container: {
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "row",
    padding: "20px",
    backgroundColor: "#b0d197", // Full-page background color
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  newsContent: {
    flex: 1,
    padding: "20px",
    color: "#666",
    textAlign: "left",
  },
  heading: {
    fontSize: "30px",
    color: "#333",
    marginBottom: "20px",
    textAlign: "center",
  },
  paragraph: {
    marginBottom: "20px",
    lineHeight: 1.6,
    textAlign: "justify",
  },
  videos: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    padding: "20px",
    flex: 1,
  },
  iframe: {
    width: "100%",
    height: "200px",
    border: "none",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  menuToggle: {
    display: "none",
    fontSize: "28px",
    color: "white",
    cursor: "pointer",
  },
};

export default News;
