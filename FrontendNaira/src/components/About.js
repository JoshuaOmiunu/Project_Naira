import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login page if not authenticated
      navigate("/login");
    }
  }, []); // Removed 'navigate' from dependency array

  return (
    <div style={styles.pageContainer}>
      {" "}
      {/* Added full-page background container */}
      <div style={styles.container}>
        <div style={styles.flagSection}>
          <img
            src={`${process.env.PUBLIC_URL}/nigeria-flag.jpg`}
            alt="Nigerian Flag"
            style={styles.flagImage}
          />
        </div>

        {/* About Us Section */}
        <div style={styles.aboutSection}>
          <h1 style={styles.heading}>About Project Naira</h1>
          <p style={styles.text}>
            At Project Naira, our mission is to empower Nigerians with
            accessible, up-to-date information about the country’s ongoing
            inflation challenges. Our platform serves as a comprehensive
            resource, providing real-time data and predictive models to help
            users understand the economic trends affecting daily life in
            Nigeria.
          </p>
          <p style={styles.text}>
            Inflation in Nigeria impacts every aspect of life, from the prices
            of basic goods to the cost of fuel. Project Naira was born out of a
            need for transparency and public awareness. By aggregating data from
            multiple reliable sources, including government websites, economic
            reports, and news articles, we provide users with the tools to track
            and predict inflationary trends.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: "#D4E7BE", // Full-page background color
    minHeight: "100vh",
    padding: "40px 20px",
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
    display: "flex",
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontWeight: "400",
    fontSize: "18px",
    padding: "10px 15px",
    borderRadius: "5px",
    marginLeft: "20px",
    transition: "background-color 0.3s ease",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    maxWidth: "1200px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#B0D197", // Updated background color
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  flagSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    marginRight: "20px",
  },
  flagImage: {
    maxWidth: "100%",
    height: "320px", // Set fixed height
    marginTop: "80px", // Add top margin
    borderRadius: "10px",
  },

  aboutSection: {
    flex: 2,
    padding: "20px",
  },
  heading: {
    fontSize: "36px",
    color: "#333",
    marginBottom: "20px",
  },
  text: {
    fontSize: "18px",
    color: "#666",
    lineHeight: "1.8",
    marginBottom: "20px",
  },
  footer: {
    backgroundColor: "#4caf50",
    color: "white",
    textAlign: "center",
    padding: "20px",
    marginTop: "40px",
  },
  footerLink: {
    color: "white",
    textDecoration: "none",
    marginLeft: "15px",
  },
};

export default About;
