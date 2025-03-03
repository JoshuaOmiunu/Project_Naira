import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import Swal

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      navigate("/");
    }
  }, [navigate]);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const API_URL = process.env.REACT_APP_API_URL

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      Swal.fire("Success", "Login successful!", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    const API_URL = process.env.REACT_APP_API_URL;

    try {
      
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (!response.ok) {
        throw new Error("Registration failed. Please try again.");
      }

      const data = await response.json();
      Swal.fire(
        "Success",
        "Registration successful! You can log in now.",
        "success"
      );
      navigate("/");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    Swal.fire("Logged Out", "You have successfully logged out.", "info");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      {isLoggedIn ? (
        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      ) : (
        <div style={styles.formRow}>
          <div style={styles.formContainer}>
            <h1 style={styles.title}>Log In</h1>
            <form onSubmit={handleLoginSubmit}>
              <div style={styles.formGroup}>
                <label htmlFor="loginEmail" style={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="loginEmail"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="loginPassword" style={styles.label}>
                  Password
                </label>
                <input
                  type="password"
                  id="loginPassword"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                  style={styles.input}
                />
              </div>
              <button type="submit" style={styles.button}>
                Log In
              </button>
            </form>
          </div>

          <div style={{ ...styles.formContainer, marginLeft: "50px" }}>
            <h1 style={styles.title}>Register</h1>
            <form onSubmit={handleRegisterSubmit}>
              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.label}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="username" style={styles.label}>
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={registerData.username}
                  onChange={handleRegisterChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="registerEmail" style={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="registerEmail"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="registerPassword" style={styles.label}>
                  Password
                </label>
                <input
                  type="password"
                  id="registerPassword"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                  style={styles.input}
                />
              </div>
              <button type="submit" style={styles.button}>
                Register
              </button>
            </form>
          </div>
        </div>
      )}
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
    flexDirection: "column",
  },
  formRow: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    maxWidth: "1200px",
  },
  formContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    width: "45%",
    textAlign: "center",
  },
  title: {
    marginBottom: "1.5rem",
    color: "#fff",
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
};

export default Login;
