import React, { useState, useEffect } from "react";
import "./Employee.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"; // For Axios
import ModalBox from "./EditEmployeeModel.js";
const BASE_API_URL = "https://human-resource-management-system-cy7o.onrender.com/";
import Nav from "../../sidebar/sidebar.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import {
  faEdit,
  faTrashAlt,
  faTrash,
  faSortUp,
  faSortDown,
  faPlusCircle,
  faArrowsRotate,


  // setTimeout(() => {
  //   setIsOpen(false); // Close the form popup after 2 seconds
  //   setMessage(""); // Clear the success message
  // }, 1500);



  faFilePdf,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Mail, Download } from "lucide-react";
// import { Eye } from 'lucide-react';
import { BASE_API_URL } from "../../../lib/constants.jsx";
import { Link } from "react-router-dom";
import Footer from "../../footer/footer.js";
import Navbar from "../../navbar/navbar.js";
import EmployeeDataModal from "./EmployeeDataModal";
let downloadCount = 0;
const EmployeeModule = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableData, settableData] = useState([]);
  const [togle, settogle] = useState([true]);
  const [message, setMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("ascending");
  const [ids, setId] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [idproof, setidproofFile] = useState("");
  const [marksheet, setmarksheet] = useState("");
  const [e_letter, seteletter] = useState("");
  const [pancard, setPancard] = useState("");
  const [image, setImage] = useState("");
  const [query, setQuery] = useState("");
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected); // Update the current page when pagination changes
  };

  const itemsPerPage = 10; // Number of items to display per page
  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(tableData.length / itemsPerPage);
  // const currentItems = tableData.slice(offset, offset + itemsPerPage);

  // const [data, setData] = useState(formData);
  const openModal = (employeeId) => {
    console.log("employeeId", employeeId);
    setModalIsOpen(true);
    setSelectedEmployeeId(employeeId);
  };
  const handleSort = (column) => {
    if (column === sortColumn) {
      // If the same column is clicked again, reverse the sorting direction
      setSortDirection(
        sortDirection === "ascending" ? "descending" : "ascending"
      );
    } else {
      // If a new column is clicked, set it as the sorting column and reset the direction
      setSortColumn(column);
      setSortDirection("ascending");
    }
  };
  const sortedData = () => {
    if (sortColumn) {
      const sorted = [...tableData].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
        if (typeof valueA === "string" && typeof valueB === "string") {
          // Case-insensitive string comparison
          return sortDirection === "ascending"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else {
          // Numerical or other comparison
          return sortDirection === "ascending"
            ? valueA - valueB
            : valueB - valueA;
        }
      });
      return sortDirection === "ascending" ? sorted : sorted.reverse();
    }
    return tableData; // Return original data if no sorting column is selected
  };

  const handleCheckboxChange = (e, id) => {
    // If the checkbox is checked, add the ID to the list of selected IDs
    if (e.target.checked) {
      setId((prevIds) => [...prevIds, id]);
    } else {
      // If the checkbox is unchecked, remove the ID from the list of selected IDs
      setId((prevIds) => prevIds.filter((prevId) => prevId !== id));
    }
  };
  const openModal1 = (candidateId) => {
    setModalIsOpen1((prevState) => ({
      ...prevState,
      [candidateId]: true, // Set modal open for this recruitment ID
    }));
    fetchEmployeeData(candidateId);
  };
  const closeModal1 = (candidateId) => {
    setModalIsOpen1((prevState) => ({
      ...prevState,
      [candidateId]: false, // Set modal closed for this recruitment ID
    }));
  };
  const fetchEmployeeData = async (id) => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}employee/getById?_id=${id}`
      );
      setModalData(response.data); // Ensure response.data contains the correct data structure
      setModalIsOpen1((prevState) => ({
        ...prevState,

        [id]: true, // Set modal open for this recruitment ID
      }));
      console.log("gd", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const Deletemulti = async () => {
    const data = {
      ids: ids,
    };
    console.log("ids", data);
    console.log("ids", data);
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this items?"
    );
    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `${BASE_API_URL}employee/multiDelete`,
          {
            data: data, // IDs ko data body mein bhejna
          }
        );
        console.log(response.data); // Response ke saath kuch karne ke liye
        settogle(!togle);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // User canceled the action
      console.log("Deletion canceled");
    }
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (!formData.employee_code.trim()) {
      newErrors.employee_code = "employee_code is required";
      isValid = false;
    }
    if (!formData.employee_first_name.trim()) {
      newErrors.employee_first_name = "employee_first_name is required";
      isValid = false;
    }

    if (!formData.employee_last_name.trim()) {
      newErrors.employee_last_name = "employee_last_name is required";
      isValid = false;
    }

    if (!formData.employee_mobile.trim()) {
      newErrors.employee_mobile = "employee_mobile is required";
      isValid = false;
    }

    if (!formData.employee_email.trim()) {
      newErrors.employee_email = "employee_email is required";
      isValid = false;
    }

    if (!formData.employee_password.trim()) {
      newErrors.employee_password = "employee_password is required";
      isValid = false;
    }

    if (!formData.employee_experience.trim()) {
      newErrors.employee_experience = "employee_experience is required";
      isValid = false;
    }

    if (!formData.employee_skills.trim()) {
      newErrors.employee_skills = "employee_skills is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const closeModal = () => {
    settogle(!togle);
    setModalIsOpen(false);
  };
  const [errors, setErrors] = useState({
    employee_code: "",
    employee_first_name: "",
    employee_last_name: "",
    employee_mobile: "",
    employee_email: "",
    employee_password: "",
    employee_skills: "",
    employee_experience: "",
  });
  const [formData, setFormData] = useState({
    employee_code: "",
    employee_first_name: "",
    employee_last_name: "",
    employee_mobile: "",
    employee_alternate_mobile: "",
    employee_email: "",
    employee_password: "",
    employee_address: "",
    employee_city: "",
    employee_state: "",
    employee_other_info: "",
    employee_dob: "",
    employee_doj: "",
    employee_skills: "",
    employee_experience: "",
    employee_resume: "",
    employee_id_proof: "",
    employee_permanant_address_proof: "",
    employee_local_address_proof: "",
    employee_reference_one_name: "",
    employee_reference_one_mobile: "",
    employee_reference_two_name: "",
    employee_reference_two_mobile: "",

    employee_pan_card: "",
    employee_marksheet: "",
    employee_experience_letter: "",
    image: "",
    resumePdfName: "pdf",
    proofPdfName: "pdf",
    panPdfName: "pdf",
    marksheetPdfName: "pdf",
    experiencePdfName: "pdf",
    imageName: "png",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}employee/list`);

        console.log(response.data.data); // Handle the response as needed
        settableData(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [togle]);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const convertToCSV = (data) => {
    if (data.length === 0) {
      return "";
    }
    // Get headers
    const header = Object.keys(data[0]).join(",");

    // Convert rows
    const rows = data
      .map((row) => {
        return Object.values(row)
          .map((value) => {
            if (Array.isArray(value)) {
              return `"${value.join(", ")}"`; // Join array elements into a single string with commas
            }
            return value;
          })
          .join(",");
      })
      .join("\n");

    return `${header}\n${rows}`;
  };

  const downloadCSV = (csv, filename) => {
    fetch(`${BASE_API_URL}employee/export-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ csvData: csv, filename: filename }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.path) {
          if (
            window.confirm(
              "Data exported successfully. Do you want to download the file now?"
            )
          ) {
            // Construct the full URL for the download
            const blob = new Blob([csv], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url); // Clean up the URL.createObjectURL resource
          }
        } else {
          console.error("Failed to download CSV");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const openView = () => {
    const csv = convertToCSV(tableData);
    downloadCount += 1; // Increment the download count
    const filename = `Employee-Data-0${downloadCount}.csv`; // Dynamic filename
    downloadCSV(csv, filename);
  };

  const handleFileChange = (e) => {
    console.log("e", e); // Check if file is valid

    const file = e.target.files[0];
    if (file instanceof Blob) {
      const reader = new FileReader();
      console.log("e----->", e.target.name);
      reader.onloadend = () => {
        if (e.target && e.target.name === "id") {
          console.log("hii");
          setidproofFile(reader.result);
        } else if (e.target && e.target.name === "resume_file") {
          setSelectedFile(reader.result);
          console.log(selectedFile);
        } else if (e.target && e.target.name === "mark") {
          setmarksheet(reader.result);
        } else if (e.target && e.target.name === "pancard") {
          setPancard(reader.result);
        } else if (e.target && e.target.name === "image") {
          setImage(reader.result);
          console.log("image", image);
        } else {
          seteletter(reader.result);
          console.log("", e_letter);
        }
      };
      reader.readAsDataURL(file);
    } else {
      console.error("The selected file is not a Blob.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("check resume", selectedFile);

    formData.employee_resume = selectedFile;
    formData.employee_id_proof = idproof;
    formData.employee_marksheet = marksheet;
    formData.employee_pan_card = pancard;
    formData.employee_experience_letter = e_letter;
    formData.employee_marksheet = marksheet;

    // Check if an image is added; if not, use a default image URL
    if (image) {
      formData.image = image.split(",")[1];
    } else {
      // Fetch the default image and convert it to Base64
      try {
        // const defaultImageUrl = "https://www.shutterstock.com/image-vector/image-not-found-grayscale-photo-260nw-1737334631.jpg";
        const defaultImageUrl =
          "../../../../../hrms/public/assets/HRMS Logo.png";

        const response = await fetch(defaultImageUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          formData.image = reader.result.split(",")[1];
          submitForm(); // Call submitForm after setting the default image
        };
      } catch (error) {
        console.error("Error fetching default image:", error);
      }
      return; // Return to wait for the image processing before submitting
    }

    submitForm(); // Call submitForm when image is already available
  };

  const submitForm = async () => {
    console.log("Form Data:", formData);
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${BASE_API_URL}employee/signup`,
          formData
        );
        settogle(!togle); // Toggle data to refresh the table
        console.log(response.data); // Handle the response as needed
        setMessage(response.data.msg); // Set the response message

        // Reset the form data to empty after successful submission
        setFormData({
          profile: "",
          profile_id: "",
        });

        // Set timeout to close the form and clear the message after 2 seconds
        setTimeout(() => {
          setIsOpen(false); // Close the form popup after 2 seconds
          setMessage(""); // Clear the success message after 2 seconds
        }, 2000);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleChange = async (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);
    console.log(searchQuery);

    if (searchQuery !== "") {
      try {
        const response = await axios.get(
          `${BASE_API_URL}employee/search?search=${searchQuery}`
        );
        settableData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // Reset table data to default if search is cleared
      try {
        const response = await axios.get(`${BASE_API_URL}employee/list`);
        settableData(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // Function to clear the search input and reset the table
  const clearSearch = () => {
    setQuery(""); // Clear input
    handleChange({ target: { value: "" } }); // Trigger table reset
  };

  const DeleteData = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    // Check if the user confirmed
    if (isConfirmed) {
      // Delete logic here
      try {
        console.log("id", id);
        const response = axios.delete(
          `${BASE_API_URL}employee/delete?_id=${id}`
        );

        console.log(response.data); // Handle the response as needed
        settogle(!togle);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // User canceled the action
      console.log("Deletion canceled");
    }
    console.log("", id);
  };
  // send mail
  const sendEmails = async () => {
    if (selectedEmails.length === 0) {
      setMessage("Please select at least one Email to send mail.");
      return;
    }
    setMessage("Sending to mail to selected Email's...");
    try {
      const response = await axios.post(`${BASE_API_URL}employee/send-mail`, {
        emails: selectedEmails,
      });
      console.log("Response:", response.data);
      setMessage(response.data.msg);
      setTimeout(() => setMessage(""), 2000);
      // Reset selected emails and checkboxes after sending emails
      setSelectedEmails([]);
      setSelectAll(false);
    } catch (error) {
      console.error("Error sending emails:", error);
      setMessage("Error sending emails.");
      setTimeout(() => setMessage(""), 2000);
    }
  };
  const handleCheckboxChangeEmail = (email) => {
    setSelectedEmails((prevSelectedEmails) =>
      prevSelectedEmails.includes(email)
        ? prevSelectedEmails.filter((e) => e !== email)
        : [...prevSelectedEmails, email]
    );
  };

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
          {" "}
          <Nav />{" "}
        </div>
        <div class="main2">
          <div class="searchNav">
            <header className="navbar-container">
              <div className="search-input-wrapper">
                <svg
                  className="search-icon"
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="search-input"
                  type="text"
                  value={query}
                  onChange={handleChange}
                  placeholder="Search"
                  aria-label="Search"
                />
                {query && (
                  <button
                    className="clear-button"
                    onClick={clearSearch} // Clear the input when clicked
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </header>

            {/* <Navbar /> */}
          </div>
          <div class="allcontent">
            <div class="welcome">
              <h2 className="headerData">Welcome To Employee Page</h2>
            </div>
            <div class="adddelButton">
              <button
                className="refreshButton"
                title="Refresh"
                onClick={() => {
                  window.location.reload();
                }}
              >
                <FontAwesomeIcon icon={faArrowsRotate} />
              </button>
              <button
                onClick={sendEmails}
                title="Gmail Employee"
                className="refreshButton"
              >
                <Mail />
              </button>
              <button
                onClick={openView}
                title="Download / Export"
                className="refreshButton"
              >
                <Download />
              </button>
              <button
                className="backButton"
                title="Add Employee"
                onClick={openPopup}
              >
                <FontAwesomeIcon icon={faPlusCircle} />
              </button>
              <button
                className="multiDeleteButton"
                title="Select and Multi-Delete"
                onClick={() => {
                  Deletemulti();
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
            {message && <div className="mailAlert">{message}</div>}
            {isOpen && (
              <div className="modal-overlay">
                <div style={{ width: "60%" }}>
                  <div style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <div style={{ width: "100%" }}>
                        <div class="signup-form" style={{ width: "100%" }}>
                          <form
                            onSubmit={handleSubmit}
                            class=" border p-4 bg-light shadow"
                            style={{ height: "90vh", overflow: "scroll" }}
                          >
                            <div style={{ textAlign: "center" }}>
                              <h4
                                style={{ display: "inline" }}
                                className="mb-5 text-secondary"
                              >
                                Add New Employee
                              </h4>
                              <button
                                style={{
                                  float: "right",
                                  fontSize: "20px",
                                  border: "none",
                                }}
                                className="close"
                                onClick={closePopup}
                              >
                                &times;
                              </button>
                            </div>
                            <div class="row">
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="employee_code"
                                  value={formData.employee_code}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Employee ID"
                                />
                                {errors.employee_code && (
                                  <span
                                    className="error"
                                    style={{ color: "red" }}
                                  >
                                    {errors.employee_code}
                                  </span>
                                )}
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
                                  value={formData.employee_first_name}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="First Name"
                                />
                                {errors.employee_first_name && (
                                  <span
                                    className="error"
                                    style={{ color: "red" }}
                                  >
                                    {errors.employee_first_name}
                                  </span>
                                )}
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="employee_last_name"
                                  value={formData.employee_last_name}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Last Name"
                                />
                                {errors.employee_last_name && (
                                  <span
                                    className="error"
                                    style={{ color: "red" }}
                                  >
                                    {errors.employee_last_name}
                                  </span>
                                )}
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="employee_mobile"
                                  value={formData.employee_mobile}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Mobile Number"
                                />
                                {errors.employee_mobile && (
                                  <span
                                    className="error"
                                    style={{ color: "red" }}
                                  >
                                    {errors.employee_mobile}
                                  </span>
                                )}
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="employee_alternate_mobile"
                                  value={formData.employee_alternate_mobile}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Alternate Mobile Number"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="email"
                                  name="employee_email"
                                  value={formData.employee_email}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Email"
                                />
                                {errors.employee_email && (
                                  <span
                                    className="error"
                                    style={{ color: "red" }}
                                  >
                                    {errors.employee_email}
                                  </span>
                                )}
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="employee_password"
                                  value={formData.employee_password}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Password"
                                />
                                {errors.employee_password && (
                                  <span
                                    className="error"
                                    style={{ color: "red" }}
                                  >
                                    {errors.employee_password}
                                  </span>
                                )}
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
                                  value={formData.employee_dob}
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
                                  value={formData.employee_doj}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  style={{ width: "60%" }}
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="employee_skills"
                                  value={formData.employee_skills}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Skills"
                                />
                                {errors.employee_skills && (
                                  <span
                                    className="error"
                                    style={{ color: "red" }}
                                  >
                                    {errors.employee_skills}
                                  </span>
                                )}
                              </div>
                              <div class="mb-3 col-md-6">
                                <select
                                  name="employee_experience"
                                  value={formData.employee_experience}
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

                                {errors.employee_experience && (
                                  <span
                                    className="error"
                                    style={{ color: "red" }}
                                  >
                                    {errors.employee_experience}
                                  </span>
                                )}
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
                                  value={formData.employee_city}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="City"
                                />
                              </div>
                              <div class="">
                                <input
                                  type="text"
                                  name="employee_address"
                                  value={formData.employee_address}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Address"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="employee_state"
                                  value={formData.employee_state}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="State"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="employee_permanant_address_proof"
                                  value={
                                    formData.employee_permanant_address_proof
                                  }
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Permanant address proof"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="employee_local_address_proof"
                                  value={formData.employee_local_address_proof}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Local address proof"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="employee_other_info"
                                  value={formData.employee_other_info}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Additional Employee Info"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="employee_reference_one_name"
                                  value={formData.employee_reference_one_name}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Reference One Name"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="employee_reference_one_mobile"
                                  value={formData.employee_reference_one_mobile}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Reference One Mobile"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="employee_reference_two_name"
                                  value={formData.employee_reference_two_name}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Reference Two Name"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="employee_reference_two_mobile"
                                  value={formData.employee_reference_two_mobile}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Reference Two Mobile"
                                />
                              </div>

                              <span style={{ color: "green" }}>
                                {message && <p>{message}</p>}
                              </span>
                            </div>
                            <div class="AddButtonDiv">
                              <button type="submit" class="AddButton">
                                Add Employee
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </div>
            )}
            {loading ? (
              <div className="loading-overlay">
                <div className="spinner"></div>
              </div>
            ) : (
              <div className="table-responsive" class="tablediv">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      {/* <th scope="col" onClick={() => handleSort("id")}>
                        {" "}
                        ID{" "}
                        {sortColumn === "id" && (
                          <FontAwesomeIcon
                            icon={
                              sortDirection === "ascending"
                                ? faSortUp
                                : faSortDown
                            }
                          />
                        )}
                      </th> */}
                      <th scope="col" onClick={() => handleSort("image")}>
                        {" "}
                        Profile{" "}
                        {sortColumn === "image" && (
                          <FontAwesomeIcon
                            icon={
                              sortDirection === "ascending"
                                ? faSortUp
                                : faSortDown
                            }
                          />
                        )}
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("employee_code")}
                      >
                        {" "}
                        Employee ID{" "}
                        {sortColumn === "employee_code" && (
                          <FontAwesomeIcon
                            icon={
                              sortDirection === "ascending"
                                ? faSortUp
                                : faSortDown
                            }
                          />
                        )}
                      </th>
                      <th scope="col" onClick={() => handleSort("name")}>
                        {" "}
                        Name{" "}
                        {sortColumn === "name" && (
                          <FontAwesomeIcon
                            icon={
                              sortDirection === "ascending"
                                ? faSortUp
                                : faSortDown
                            }
                          />
                        )}
                      </th>
                      <th scope="col" onClick={() => handleSort("email")}>
                        {" "}
                        Email{" "}
                        {sortColumn === "email" && (
                          <FontAwesomeIcon
                            icon={
                              sortDirection === "ascending"
                                ? faSortUp
                                : faSortDown
                            }
                          />
                        )}
                      </th>
                      <th>
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "none",
                            cursor: "default",
                          }}
                          title="Send Mail Selection"
                        >
                          <Mail />
                        </button>
                      </th>
                      <th scope="col" onClick={() => handleSort("mobile")}>
                        {" "}
                        Mobile{" "}
                        {sortColumn === "mobile" && (
                          <FontAwesomeIcon
                            icon={
                              sortDirection === "ascending"
                                ? faSortUp
                                : faSortDown
                            }
                          />
                        )}
                      </th>
                      <th scope="col" onClick={() => handleSort("city")}>
                        {" "}
                        City{" "}
                        {sortColumn === "city" && (
                          <FontAwesomeIcon
                            icon={
                              sortDirection === "ascending"
                                ? faSortUp
                                : faSortDown
                            }
                          />
                        )}
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("emplyee_resume")}
                      >
                        {" "}
                        Resume{" "}
                        {sortColumn === "resume" && (
                          <FontAwesomeIcon
                            icon={
                              sortDirection === "ascending"
                                ? faSortUp
                                : faSortDown
                            }
                          />
                        )}
                      </th>
                      <th scope="col">Actions</th>
                      <th>
                        <button
                          className="customcheckbox m-b-20"
                          style={{
                            cursor: "default",
                          }}
                          title="Multi-Delete Selection"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="customtable">
                    {sortedData()
                      .slice(offset, offset + itemsPerPage)
                      .map((data, index) => (
                        <tr key={index}>
                          {/* <td>{data._id}</td> */}
                          <td
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                           <img
  src={`${BASE_API_URL}${data.image}`} // Image URL
  alt="Employee"
  style={{
    border: "2px solid #7d00aa",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
  }} // Adjust size as needed
/>
                          </td>
                          <td>{data.employee_code}</td>
                          <td>
                            {data.employee_first_name}&nbsp;
                            {data.employee_last_name}
                          </td>
                          <td>{data.employee_email}</td>
                          <td>
                            <label className="customcheckbox">
                              <input
                                className="listCheckbox"
                                type="checkbox"
                                checked={selectedEmails.includes(
                                  data.employee_email
                                )}
                                onChange={() =>
                                  handleCheckboxChangeEmail(data.employee_email)
                                }
                              />
                              <span className="checkmark"></span>
                            </label>
                          </td>
                          <td>{data.employee_mobile}</td>
                          <td>{data.employee_city}</td>
                          <td>
                           <button
  className="pdfButton"
  onClick={() =>
    window.open(`${BASE_API_URL}${data.employee_resume}`, "_blank")
  }
>
  View Resume
</button>
                          </td>
                          <td>
                            <div class="editdelete">
                              <button
                                className="editButton bt1"
                                onClick={() =>
                                  DeleteData(data._id) +
                                  window.location.reload()
                                }
                              >
                                {" "}
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                              <button
                                className="editButton bt2"
                                onClick={() => openModal(data._id)}
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </button>
                              <button
                                className="editButton bt3"
                                onClick={() => openModal1(data._id)}
                              >
                                <FontAwesomeIcon icon={faEye} />
                                {/* <Eye />                         */}
                              </button>
                            </div>
                          </td>

                          <td>
                            <label className="customcheckbox">
                              <input
                                type="checkbox"
                                className="listCheckbox"
                                onChange={(e) =>
                                  handleCheckboxChange(e, data._id)
                                }
                              />
                              <span className="checkmark"></span>
                            </label>
                          </td>
                          <ModalBox
                            isOpen={modalIsOpen}
                            employeeId={selectedEmployeeId}
                            onRequestClose={closeModal}
                          >
                            <h2>Modal Title</h2>
                            <p>Modal Content</p>
                          </ModalBox>
                          {modalIsOpen1[data._id] && (
                            <EmployeeDataModal
                              isOpen1={modalIsOpen1[data._id]}
                              onRequestClose={() => closeModal1(data._id)}
                              data={modalData}
                            />
                          )}
                        </tr>
                      ))}
                  </tbody>
                </table>
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageChange}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              </div>
            )}
          </div>
          <div class="footdiv">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeModule;
