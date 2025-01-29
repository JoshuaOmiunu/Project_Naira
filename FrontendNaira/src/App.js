import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import News from "./components/News";
import Login from "./components/Login";
import HistoricalImpact from "./components/HistoricalImpact";
import DiscussionForum from "./components/DiscussionForum";
import Profile from "./components/Profile";
import GDP from "./components/GDP";
import Inflation from "./components/Inflation";
import FoodPriceChanges from "./components/FoodPriceChanges";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <div>
        <nav style={styles.nav}>
          <div style={styles.logo}>Project Naira</div>
          <ul style={styles.navLinks}>
            <li>
              <Link to="/" style={styles.navLink}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" style={styles.navLink}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/news" style={styles.navLink}>
                News
              </Link>
            </li>
            {/* Only show Login link if no token is present */}
            {!token && (
              <li>
                <Link to="/login" style={styles.navLink}>
                  Login
                </Link>
              </li>
            )}
            <li>
              <Link to="/history" style={styles.navLink}>
                Historical Impact
              </Link>
            </li>
            <li>
              <Link to="/GDP" style={styles.navLink}>
                GDP
              </Link>
            </li>
            <li>
              <Link to="/forum" style={styles.navLink}>
                Discussion Forum
              </Link>
            </li>
            <li>
              <Link to="/profile" style={styles.navLink}>
                Profile
              </Link>
            </li>
            <li>
              <Link to="/inflation" style={styles.navLink}>
                Inflation
              </Link>
            </li>
            <li>
              <Link to="/food-prices" style={styles.navLink}>
                FoodPriceChanges
              </Link>
            </li>
            {/* Render Logout button only if the token exists */}
            {token && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forum" element={<DiscussionForum />} />
          <Route path="/history" element={<HistoricalImpact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/inflation" element={<Inflation />} />
          <Route path="/GDP" element={<GDP />} />
          <Route path="/food-prices" element={<FoodPriceChanges />} />
        </Routes>
      </div>
    </Router>
  );
}

// Separate LogoutButton component with useNavigate
function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Destroy the token (stored in local storage or cookies)
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} style={styles.logoutButton}>
      Logout
    </button>
  );
}

const styles = {
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
  logoutButton: {
    color: "white",
    backgroundColor: "transparent",
    border: "none",
    fontWeight: "400",
    fontSize: "18px",
    cursor: "pointer",
    marginLeft: "20px",
    transition: "background-color 0.3s ease",
    padding: "10px 15px",
    borderRadius: "5px",
  },
};

export default App;
