import React from "react";

function Footer() {
  return (
    <div style={styles.footer}>
      <p>
        &copy; 2024 Project Naira. All Rights Reserved. |
        <a href="#" style={styles.footerLink}>
          Privacy Policy
        </a>{" "}
        |
        <a href="#" style={styles.footerLink}>
          Terms of Service
        </a>
      </p>
    </div>
  );
}

const styles = {
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

export default Footer;
