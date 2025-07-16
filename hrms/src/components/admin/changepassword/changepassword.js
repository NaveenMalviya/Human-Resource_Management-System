import React, { useEffect, useState } from "react";
// import Nav from '../../navbar/Navbaar.js';
import axios from "axios"; // Make sure to install axios with npm or yarn
import "./changepassword.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../footer/footer.js";
import { BASE_API_URL } from "../../../lib/constants.jsx";
import Nav from "../../sidebar/sidebar.js";

const ChangePassword = () => {
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showOverlay, setShowOverlay] = useState(true); // New state to control overlay visibility

  const navigate = useNavigate();

  const toggleOverlay = () => setShowOverlay(!showOverlay);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await axios.put(`${BASE_API_URL}user/changepassword`, {
        email,
        currentPassword,
        newPassword,
        confirmPassword,
      });
      setMessage(response.data.msg);
    } catch (error) {
      setMessage(error.response.data.msg || "An error occurred.");
    }
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show loading animation for 1 second on every navigation
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div class="main">
      <div class="main1">
        {/* <h1>lalala</h1> */}
        <Nav />
      </div>
      {loading ? (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      ) : (
        <div class="main2">
          <div class="allcontent">
            <div class="welcome" style={{ marginTop: "1%" }}>
              <h2 className="headerData">Change Password</h2>
            </div>
            <div class="signup-form" style={{ width: "50%" }}>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    disabled="true"
                  />
                </div>
                <div>
                  <label>Current Password:</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>New Password:</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Confirm New Password:</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button type="submit" style={{ backgroundColor: "#7d00aa" }}>
                    Change Password
                  </button>
                </div>
                <span style={{ color: "green", textAlign: "center" }}>
                  {message && <p>{message}</p>}
                </span>
              </form>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
