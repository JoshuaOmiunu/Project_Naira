import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    profilePicture: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    const API_URL = process.env.REACT_APP_API_URL

    if (!token) {
      navigate("/login");
    } else {
      fetch(`${API_URL}/api/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setUpdatedUser({
            name: data.name,
            email: data.email,
            profilePicture: data.profilePicture || null,
          });
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          navigate("/login");
        });
    }
  }, [navigate]);

  const handleEditProfile = () => setIsEditing(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setUpdatedUser((prev) => ({
        ...prev,
        profilePicture: file,
      }));
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleSaveProfile = () => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", updatedUser.name);
    formData.append("email", updatedUser.email);
    if (updatedUser.profilePicture) {
      formData.append("profilePic", updatedUser.profilePicture); // Ensure key is 'profilePic' as in Postman
    }

    // Debug: log form data
    console.log("Form Data to be sent:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const API_URL = process.env.REACT_APP_API_URL

    fetch(`${API_URL}/api/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update profile");
        }
        return response.json();
      })
      .then((data) => {
        // Update the user state with the new profile data
        setUser(data.user); // Update the user object with new profile data
        setIsEditing(false); // Stop editing mode
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        alert("Failed to update profile.");
      });
  };

  if (!user) return <p>Loading profile...</p>;

  const API_URL = process.env.REACT_APP_API_URL

  // Use a default image if profilePicture is not available
  const profileImage =
    user.profilePicture || `${API_URL}/default-profile.jpg`;

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <div style={styles.profileHeader}>
          <img src={profileImage} alt="Profile" style={styles.profilePic} />
          <div style={styles.profileInfo}>
            <h1 style={styles.title}>User Profile</h1>
            {!isEditing ? (
              <>
                <p style={styles.userDetail}>
                  <strong>Name:</strong> {user.name}
                </p>
                <p style={styles.userDetail}>
                  <strong>Email:</strong> {user.email}
                </p>
                <div>
                  <button onClick={handleEditProfile} style={styles.editButton}>
                    Update Profile
                  </button>
                  <button onClick={handleLogout} style={styles.logoutButton}>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div style={styles.editForm}>
                <input
                  type="text"
                  name="name"
                  value={updatedUser.name}
                  onChange={handleChange}
                  placeholder="Edit Name"
                  style={styles.input}
                />
                <input
                  type="email"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleChange}
                  placeholder="Edit Email"
                  style={styles.input}
                />
                <input
                  type="file"
                  onChange={handleProfileImageChange}
                  style={styles.input}
                />
                <div style={styles.actionButtons}>
                  <button onClick={handleSaveProfile} style={styles.saveButton}>
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    style={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: "#b0d197",
    minHeight: "100vh",
    padding: "20px",
  },
  container: {
    maxWidth: "900px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  },
  profileHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "30px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#fff",
  },
  profilePic: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
  },
  profileInfo: {
    flex: 1,
    color: "#333",
  },
  title: {
    fontSize: "32px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "15px",
  },
  userDetail: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "10px",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
  },
  editForm: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  actionButtons: {
    display: "flex",
    gap: "15px",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "5px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    color: "#333",
    padding: "12px 20px",
    borderRadius: "5px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
  },
};

export default Profile;
