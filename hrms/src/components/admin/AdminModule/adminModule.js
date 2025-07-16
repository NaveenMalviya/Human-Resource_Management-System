import React, { useState, useEffect } from "react";
import Footer from "../../footer/footer";
import Nav from "../../sidebar/sidebar";

const AboutHome = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show loading animation for 1 second on every navigation
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);
  return (
    <>
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
                <h2 className="headerData">About</h2>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "90%",
                  marginTop: "2%",
                }}
              >
                <img
                  src="https://beehivesoftware.in/wp-content/uploads/2023/07/admin-1.jpg"
                  alt="Your Image"
                  style={{
                    width: "50%",
                    height: "auto",
                    border: "1px solid #7d00aa",
                    marginLeft: "10px",
                  }}
                />
                <div style={{ width: "48%", paddingLeft: "20px" }}>
                  <div style={{ color: "black" }}>
                    <h1 style={{ textAlign: "center" }}>About</h1>
                  </div>
                  <b> Human Resource Management </b>(HRM) is the term used to
                  describe formal systems devised for the management of people
                  within an organization. The responsibilities of a human
                  resource manager fall into three major areas: staffing,
                  employee compensation and benefits, and defining/designing
                  work. A Human Resources Management System (HRMS) is a software
                  application that combines many human resources functions,
                  including benefits administration, payroll, recruiting and
                  training, and performance analysis and review into one
                  package. Human Resource Management Systems provides a means of
                  acquiring, storing, analyzing and distributing information to
                  various stakeholders be it government, employee and to an
                  extent to the citizen. An HRMS (Human Resource Management
                  System) is considered a basic necessity in most of
                  private/corporate and government organizations.
                  <br />
                  Delve into the specific functionalities and responsibilities
                  endowed upon an administrator within the HRMS framework.
                  Emphasize the central role admins play in configuring the
                  system according to organizational needs, managing user roles
                  and permissions, overseeing data security, and ensuring the
                  smooth operation of all HR processes. Point out the tools
                  available for administrators for reporting, analytics, and
                  monitoring system health.
                </div>
              </div>
            </div>
            <Footer />
          </div>
        )}
      </div>
    </>
  );
};

export default AboutHome;
