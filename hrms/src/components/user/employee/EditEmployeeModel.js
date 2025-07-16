import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"; // For Axios
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Modal from "react-modal";
import { BASE_API_URL } from "../../../lib/constants.jsx";

const ModalBox = ({ isOpen, onRequestClose, employeeId }) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [idproof, setidproofFile] = useState("");
  const [marksheet, setmarksheet] = useState("");
  const [e_letter, seteletter] = useState("");
  const [pancard, setPancard] = useState("");
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [newdata, setnewdata] = useState("");

  useEffect(() => {
    if (isOpen && employeeId) {
      setMessage("");
      setnewdata("");
      setSelectedFile("");
      setImage("");
      setMessage("");
      setmarksheet("");
      setPancard("");
      setidproofFile("");
      seteletter("");
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${BASE_API_URL}employee/getById?_id=${employeeId}`
          );
          const employeeData = response.data.data;
          // delete employeeData.employee_resume;

          setData(employeeData);
        } catch (error) {
          console.error("Error fetching employee data:", error);
        }
      };
      fetchData();
    }
  }, [isOpen, employeeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewdata((prevState) => ({
        ...prevState,
        [name]: value
    }));
    setData((prevState) => ({
        ...prevState,
        [name]: value
    }));
};

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

const handleFileChange = (e) => {
  console.log("e->", e);
  const file = e.target.files[0];
  if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onloadend = () => {
          if (e.target.name === 'image') {
              setImage(reader.result); // Set the image Data URL
          } else {
              const base64String = arrayBufferToBase64(reader.result);
              if (e.target.name === 'id') {
                  setidproofFile(base64String);
              } else if (e.target && e.target.name === 'resume_file') {
                  setSelectedFile(base64String);
                  console.log('selectfile', base64String);
              } else if (e.target.name === 'mark') {
                  setmarksheet(base64String);
              } else if (e.target.name === 'pancard') {
                  setPancard(base64String);
              } else if (e.target.name === 'e_letter') {
                  seteletter(base64String);
              }
          }
      };
      if (e.target.name === 'image') {
          reader.readAsDataURL(file); // Read image files as Data URL
      } else {
          reader.readAsArrayBuffer(file); // Read non-image files as ArrayBuffer
      }
  } else {
      console.error("The selected file is not a Blob.");
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const mydata = { ...newdata, _id: data._id };

  if (selectedFile !== '') {
      mydata.employee_resume = selectedFile
  }
  if (idproof !== '') {
      mydata.employee_id_proof = idproof
  } if (marksheet !== '') {
      mydata.employee_marksheet = marksheet
  } if (pancard !== '') {
      mydata.employee_pan_card = pancard
  } if (e_letter !== '') {
      mydata.employee_experience_letter = e_letter
  }
  if (image !== '') {
      mydata.image = image
      mydata.image = mydata.image.split(',')[1]
      console.log("mydata.image", mydata.image)
  }
  const pdfdoc = {
      resumePdfName: "pdf",
      proofPdfName: "pdf",
      panPdfName: "pdf",
      marksheetPdfName: "pdf",
      experiencePdfName: 'pdf',
      imageName: 'png',
      id: employeeId
  };
  const mergedData = { ...mydata, ...pdfdoc };
  console.log("data", mergedData)
  e.preventDefault();
  // Handle form submission here
  try {
      const response = await axios.put(`${BASE_API_URL}employee/update`, mergedData);
      console.log(response.data); // Handle the response as needed
      setMessage(response.data.msg);
              // Close the modal after 2 seconds
              setTimeout(() => {
                setMessage("");
                onRequestClose(); // Use the onRequestClose prop to close the modal
              }, 1000);
      // setImage('');
  } catch (error) {
      console.error('Error:', error);
  }
};

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        },
        content: {
          width: "60%",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0)",
          margin: "auto",
          border: "none",
        },
      }}
    >
      <div class="row">
        <div style={{ width: "100%" }}>
          <div class="signup-form" style={{ width: "100%" }}>
            <form
              style={{ height: "90vh", overflowY: "scroll" }}
              onSubmit={handleSubmit}
              class="border p-4 bg-light shadow"
            >
              <button onClick={onRequestClose} style={{ float: "right" }}>
                Close
              </button>
              <div style={{ textAlign: "center" }}>
                <h4
                  style={{ display: "inline" }}
                  className="mb-5 text-secondary"
                >
                  Edit Employee
                </h4>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="employee_code"
                    value={data.employee_code}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Employee ID"
                  />
                </div>
                <div
                  class="mb-3 col-md-6"
                  style={{
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "50%",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <b>Profile Picture</b>{" "}
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept=".jpeg, .jpg, .png" // Only accept JPEG and PNG image formats
                    onChange={handleFileChange}
                    class="form-control"
                    placeholder="Image"
                    style={{ width: "65%" }}
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="employee_first_name"
                    value={data.employee_first_name}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="First Name"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="employee_last_name"
                    value={data.employee_last_name}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Last Name"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="employee_mobile"
                    value={data.employee_mobile}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Mobile Number"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="employee_alternate_mobile"
                    value={data.employee_alternate_mobile}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Alternate Mobile Number"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="email"
                    name="employee_email"
                    value={data.employee_email}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Email"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="employee_password"
                    value={data.employee_password}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Password"
                  />
                </div>
                <div
                  class="mb-3 col-md-6"
                  style={{
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "50%",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Date Of Birth :{" "}
                  </label>
                  <input
                    type="date"
                    name="employee_dob"
                    value={data.employee_dob}
                    onChange={handleInputChange}
                    class="form-control"
                    style={{ width: "65%" }}
                  />
                </div>
                <div
                  class="mb-3 col-md-6"
                  style={{
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "50%",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Date Of Joining :{" "}
                  </label>
                  <input
                    type="date"
                    name="employee_doj"
                    value={data.employee_doj}
                    onChange={handleInputChange}
                    class="form-control"
                    style={{ width: "65%" }}
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="employee_skills"
                    value={data.employee_skills}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Skills"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <select
                    name="employee_experience"
                    value={data.employee_experience}
                    onChange={handleInputChange}
                    class="form-control"
                  >
                    <option value="" disabled selected>
                      ── Years of Experience ──
                    </option>
                    <option value="0-1">0-1 year</option>
                    <option value="2">2 years</option>
                    <option value="3">3 years</option>
                    <option value="4">4 years</option>
                    <option value="5">5 years</option>
                    <option value="6">6 years</option>
                    <option value="7">7 years</option>
                    <option value="8">8 years</option>
                    <option value="9">9 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
                <div
                  class="mb-3 col-md-6"
                  style={{
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "50%",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <b>Upload Resume</b>{" "}
                  </label>
                  <input
                    type="file"
                    name="resume_file"
                    accept=".pdf" // Restrict to .pdf files only
                    onChange={handleFileChange}
                    class="form-control"
                    placeholder="resume file"
                    style={{ width: "65%" }}
                  />
                </div>
                <div
                  class="mb-3 col-md-6"
                  style={{
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "50%",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <b>Upload Id Proof</b>{" "}
                  </label>
                  <input
                    type="file"
                    name="id"
                      onChange={handleFileChange}
                    class="form-control"
                    placeholder="Id Proof"
                    style={{ width: "65%" }}
                  />
                </div>
                <div
                  class="mb-3 col-md-6"
                  style={{
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "50%",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <b>Highest Education</b>{" "}
                  </label>
                  <input
                    type="file"
                    name="mark"
                      onChange={handleFileChange}
                    class="form-control"
                    placeholder="Highest Education"
                    style={{ width: "65%" }}
                  />
                </div>
                <div
                  class="mb-3 col-md-6"
                  style={{
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "50%",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <b>Pan Card</b>{" "}
                  </label>
                  <input
                    type="file"
                    name="pancard"
                      onChange={handleFileChange}
                    class="form-control"
                    placeholder="Pan Card"
                    style={{ width: "65%" }}
                  />
                </div>
                <div
                  class="mb-3 col-md-6"
                  style={{
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "50%",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <b>Experience Certificate</b>{" "}
                  </label>
                  <input
                    type="file"
                    name="e_letter"
                      onChange={handleFileChange}
                    class="form-control"
                    placeholder="Experience Letter"
                    style={{ width: "60%" }}
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="employee_city"
                    value={data.employee_city}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="City"
                  />
                </div>
                <div class="">
                  <input
                    type="text"
                    name="employee_address"
                    value={data.employee_address}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Address"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="employee_state"
                    value={data.employee_state}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="State"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="employee_other_info"
                    value={data.employee_other_info}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Employee Other Info"
                  />
                </div>

                
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="employee_reference_one_name"
                    value={data.employee_reference_one_name}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Reference One Name"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="employee_reference_one_mobile"
                    value={data.employee_reference_one_mobile}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Reference One Mobile"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="employee_reference_two_name"
                    value={data.employee_reference_two_name}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Reference Two Name"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="employee_reference_two_mobile"
                    value={data.employee_reference_two_mobile}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Reference Two Mobile"
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
                  <button type="submit">Update Employee</button>
                  <span style={{ color: "green" }}>
                    {message && <p>{message}</p>}
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalBox;
