import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    // Handle registration logic here
    console.log("Registration data:", formData);
    setError("");
    // You can make an API call to register the user here
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Sign Up</h1>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="confirm-password" style={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
        <p style={styles.text}>
          Already have an account?{" "}
          <a href="/login" style={styles.link}>
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#82B37F",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  formContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    marginBottom: "1.5rem",

    color: "#fff",
  },
  error: {
    color: "red",
  },
  formGroup: {
    marginBottom: "1rem",
    textAlign: "left",
  },
  label: {
    display: "block",
    color: "#fff",
    marginBottom: "0.5rem",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  button: {
    width: "100%",
    padding: "1rem",
    backgroundColor: "#365F3C",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  text: {
    color: "#fff",
    marginTop: "1rem",
  },
  link: {
    color: "#4caf50",
    textDecoration: "none",
  },
};

export default Register;
