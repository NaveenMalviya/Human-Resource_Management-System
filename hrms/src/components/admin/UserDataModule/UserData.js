import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// import Nav from '../../'
import "./UserData.css";
import { BASE_API_URL } from "../../../lib/constants.jsx";
import Nav from "../../sidebar/sidebar.js";
import Footer from "../../footer/footer.js";

const Userdata = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableData, settableData] = useState([]);
  const [togle, settogle] = useState([true]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}user/list`);
        console.log(response.data.data); // Handle the response as needed
        settableData(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [togle]);

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
              <h2 className="headerData">User Data</h2>
            </div>
            <div
              className="table-responsive"
              class="tablediv"
              style={{ marginTop: "2%" }}
            >
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Gender</th>
                    <th scope="col">DOB</th>
                    <th scope="col">Address</th>
                    <th scope="col">Role</th>
                  </tr>
                </thead>
                <tbody className="customtable">
                  {tableData.map((data, index) =>
                    data.role === "user" ? (
                      <tr key={index}>
                        <td>{data._id}</td>
                        <td>
                          {data.fname}&nbsp;{data.lname}
                        </td>
                        <td>{data.email}</td>
                        <td>{data.gender}</td>
                        <td>{data.dob}</td>
                        <td>{data.address}</td>
                        <td>{data.role}</td>
                      </tr>
                    ) : (
                      <tr key={index}></tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div></div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Userdata;
