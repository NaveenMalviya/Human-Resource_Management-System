import React, { useEffect, useState } from "react";
// import Nav from '../../navbar/Navbaar.js';
import axios from "axios"; // Make sure to install axios with npm or yarn
import "./EditProfile.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../footer/footer.js";
import { BASE_API_URL } from "../../../lib/constants.jsx";
import Nav from "../../sidebar/sidebar.js";
const EditProfile = () => {
  const [message, setMessage] = useState("");
  // const [showOverlay, setShowOverlay] = useState(true); // New state to control overlay visibility
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log('model open', userId)
    // Fetch data for the given userId

    const fetchData = async () => {
      try {
        const id = localStorage.getItem("_id");
        const response = await axios.get(
          `${BASE_API_URL}user/getuserbyid?userid=${id}`
        );

        setData(response.data.data);
        // console.log('data', data)
      } catch (error) {
        console.log("model open error");

        console.error("Error fetching employee data:", error);
      }
    };
    fetchData();
  }, []);

  // const toggleOverlay = () => setShowOverlay(!showOverlay);

  const handleSubmit = async (e) => {
    console.log("data", data);
    e.preventDefault();
    // Handle form submission here
    try {
      const response = await axios.put(`${BASE_API_URL}user/edit`, data);
      console.log(response.data); // Handle the response as needed
      setMessage(response.data.msg);
      // if(response.)
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
              <h2 className="headerData">Edit Profile</h2>
            </div>
            <div class="signup-form" style={{ width: "50%" }}>
              <form onSubmit={handleSubmit} class=" border p-4 bg-light shadow">
                <div style={{ textAlign: "center" }}>
                  <h4
                    style={{ display: "inline" }}
                    className="mb-5 text-secondary"
                  >
                    Edit Your profile
                  </h4>
                </div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <input
                      type="text"
                      name="fname"
                      value={data.fname}
                      onChange={handleInputChange}
                      class="form-control"
                      placeholder="First Name"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <input
                      type="text"
                      name="lname"
                      value={data.lname}
                      onChange={handleInputChange}
                      class="form-control"
                      placeholder="Last Name"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={handleInputChange}
                      class="form-control"
                      placeholder="Email"
                      disabled="true"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <input
                      type="text"
                      name="gender"
                      value={data.gender}
                      onChange={handleInputChange}
                      class="form-control"
                      placeholder="Gender"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <input
                      type="date"
                      name="dob"
                      value={data.dob}
                      onChange={handleInputChange}
                      class="form-control"
                      placeholder="DOB"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <input
                      type="text"
                      name="city"
                      value={data.city}
                      onChange={handleInputChange}
                      class="form-control"
                      placeholder="City"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <input
                      type="text"
                      name="state"
                      value={data.state}
                      onChange={handleInputChange}
                      class="form-control"
                      placeholder="State"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <input
                      type="text"
                      name="address"
                      value={data.address}
                      onChange={handleInputChange}
                      class="form-control"
                      placeholder="Address"
                    />
                  </div>

                  <div
                    class="col-md-12"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <button type="submit">Update Profile</button>
                    <span style={{ color: "green" }}>
                      {message && <p>{message}</p>}
                    </span>
                  </div>
                </div>
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

export default EditProfile;
