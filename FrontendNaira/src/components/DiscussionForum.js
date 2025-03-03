import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const DiscussionForum = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const submitMessage = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name && email && message) {
      if (!emailPattern.test(email)) {
        Swal.fire({
          icon: "warning",
          title: "Invalid email",
          text: "Please enter a valid email address.",
          confirmButtonColor: "#ff9800",
        });
        return;
      }

      const newMessage = { name, email, text: message };
      setIsLoading(true); // Show loader
      const API_URL = process.env.REACT_APP_API_URL

      try {
        await axios.post(`${API_URL}/api/discussion`, newMessage, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setMessages([...messages, newMessage]);
        setName("");
        setEmail("");
        setMessage("");

        Swal.fire({
          icon: "success",
          title: "Message sent!",
          text: "Your message has been successfully sent.",
          confirmButtonColor: "#4caf50",
        });
      } catch (error) {
        console.error("Error sending message:", error);

        Swal.fire({
          icon: "error",
          title: "Failed to send message",
          text: "There was an error sending your message. Please try again.",
          confirmButtonColor: "#d33",
        });
      } finally {
        setIsLoading(false); // Hide loader
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please enter your name, email, and message.",
        confirmButtonColor: "#ff9800",
      });
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.title}>Discussion Forum</h1>
        <div style={styles.formGroup}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            style={styles.input}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            style={styles.input}
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            placeholder="Your Message"
            style={styles.textarea}
          ></textarea>
          <button onClick={submitMessage} style={styles.button}>
            Submit
          </button>
        </div>

        {isLoading && (
          <div style={styles.loaderContainer}>
            <div style={styles.loader}></div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#b0d197",
    textAlign: "center",
    margin: 0,
    padding: 0,
    height: "100vh", // Full viewport height
    display: "flex",
    justifyContent: "center",
    alignItems: "center", // Center content vertically and horizontally
  },
  container: {
    maxWidth: "800px",
    width: "100%",
    padding: "20px",
    boxSizing: "border-box",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "36px",
    color: "#333",
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    marginBottom: "10px",
  },

  button: {
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "18px",
  },
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
  loader: {
    width: "40px",
    height: "40px",
    border: "5px solid #f3f3f3",
    borderTop: "5px solid #4caf50",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
};

export default DiscussionForum;
