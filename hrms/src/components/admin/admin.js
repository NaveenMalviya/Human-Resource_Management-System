import React, { useState, useEffect } from "react";
import Nav from "../sidebar/sidebar";

const AdminHome = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show loading animation for 1 second on every navigation
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="main">
      <div className="main1" style={{ position: "fixed" }}>
        <div>
          <Nav />
        </div>
      </div>
      {loading ? (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="main2" style={{ marginLeft: "12%" }}>
          <div style={{ float: "right", width: "100%", height: "100vh" }}>
            {/* Dashboard Content */}
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                style={{ padding: "20px", height: "100vh" }}
                src="https://beehivesoftware.in/wp-content/uploads/2023/07/admin-1.jpg"
                alt="Your Image"
              />
            </div>
            {/* Add additional content for dashboard here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
