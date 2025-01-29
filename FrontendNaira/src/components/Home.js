import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Footer from "./Footer"; // Import Footer component

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token is available
    const token = localStorage.getItem("token");

    if (!token) {
      // If no token, redirect to the login page
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <div style={styles.container}>
        <h1 style={styles.title}>Welcome to Project Naira</h1>
        <p style={styles.description}>
          Explore real-time insights into Nigeria's inflation trends. Our
          platform offers up-to-date data, predictive models, and historical
          analysis to help you understand the economic changes impacting the
          Naira's purchasing power. Stay informed with our accurate inflation
          tracking tools.
        </p>

        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/DDAd4vMGuT4?si=NhmYigaOdKL1H5gm"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={styles.video}
        ></iframe>
      </div>

      {/* Add Footer component */}
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#b0d197",
    margin: 0,
    padding: 0,
  },
  nav: {
    backgroundColor: "#4caf50",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "600",
    color: "white",
  },
  navLinks: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    display: "flex",
  },
  navLink: {
    textDecoration: "none",
    color: "white",
    fontWeight: "400",
    fontSize: "18px",
    padding: "10px 15px",
    borderRadius: "5px",
    marginLeft: "20px",
    transition: "background-color 0.3s ease",
  },
  container: {
    textAlign: "center",
    padding: "50px 20px",
    backgroundColor: "#b0d197",
  },
  title: {
    fontSize: "50px",
    color: "#333",
    marginBottom: "20px",
  },
  description: {
    fontSize: "20px",
    color: "#666",
    lineHeight: 1.6,
    maxWidth: "800px",
    margin: "0 auto 40px auto",
  },
  video: {
    width: "80%",
    height: "450px",
    maxWidth: "800px",
    border: "none",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    marginTop: "30px",
  },
};

export default Home;
