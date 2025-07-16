import React, { useState, useEffect } from "react";
import "./candidate";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"; // For Axios
import ModalBox from "./EditCandidateModel.js";
import Nav from "../../sidebar/sidebar.js";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faTrash,
  faSortUp,
  faSortDown,
  faPlusCircle,
  faArrowsRotate,
  faFilePdf,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Mail, Download } from "lucide-react";
import Footer from "../../footer/footer.js";
import { BASE_API_URL } from "../../../lib/constants.jsx";
let downloadCount = 0;

const CandidateModule = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableData, settableData] = useState([]);
  const [togle, settogle] = useState([true]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("ascending");
  const [resume, setResume] = useState("");
  const [ids, setId] = useState([]);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]); // Initialize data with an empty array
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected); // Update the current page when pagination changes
  };

  const itemsPerPage = 10; // Number of items to display per page
  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(tableData.length / itemsPerPage);
  // const currentItems = tableData.slice(offset, offset + itemsPerPage);

  // const [data, setData] = useState(formData);
  const openModal = (candidateId) => {
    console.log("candidateId", candidateId);
    setModalIsOpen(true);
    setSelectedCandidateId(candidateId);
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
  const Deletemulti = async () => {
    const data = {
      ids: ids,
    };
    console.log("ids", data);
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this items?"
    );
    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `${BASE_API_URL}candidate/multi-delete`,
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

  const closeModal = () => {
    settogle(!togle);
    setModalIsOpen(false);
  };
  const [errors, setErrors] = useState({
    candidate_id: "",
    candidate_first_name: "",
    candidate_last_name: "",
    candidate_mobile: "",
    candidate_email: "",
    candidate_skills: "",
    candidate_experience: "",
    candidate_expected_salary: "",
    profile: "",
  });
  const [formData, setFormData] = useState({
    candidate_id: "",
    candidate_first_name: "",
    candidate_last_name: "",
    candidate_mobile: "",
    candidate_alternate_mobile: "",
    candidate_email: "",
    candidate_skype: "",
    candidate_linkedIn_profile: "",
    candidate_skills: "",
    candidate_experience: "",
    candidate_expected_salary: "",
    candidate_document_proof: "pdf",
    candidate_marrital_status: "",
    candidate_doj: "",
    interview_rounds: "",
    candidate_selection_status: "",
    candidate_feedback: "",
    source_of_candidate: "",
    candidate_address: "",
    tenth_percentages: "",
    twelfth_percentages: "",
    graduationPercentages: "",
    postGraduationPercentage: "",
    profile: "",
  });
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file instanceof Blob) {
      const reader = new FileReader();
      console.log("e----->", e.target.name);
      reader.onloadend = () => {
        if (e.target && e.target.name === "candidate_document_proof") {
          console.log("Base64 Document Proof:", reader.result);
          setSelectedFile(reader.result);
          // setResume(reader.result);
        }

        console.log("idproof", resume);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("The selected file is not a Blob.");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}candidate/list`);

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

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (!formData.candidate_id.trim()) {
      newErrors.candidate_id = "Candidate Id is required";
      isValid = false;
    }
    if (!formData.candidate_first_name.trim()) {
      newErrors.candidate_first_name = "Candidate First Name is required";
      isValid = false;
    }

    if (!formData.candidate_last_name.trim()) {
      newErrors.candidate_last_name = "Candidate Last Name is required";
      isValid = false;
    }

    if (!formData.candidate_mobile.trim()) {
      newErrors.candidate_mobile = "Mobile No. is required";
      isValid = false;
    }

    if (!formData.candidate_email.trim()) {
      newErrors.candidate_email = "Email is required";
      isValid = false;
    }
    if (!formData.candidate_skills.trim()) {
      newErrors.candidate_skills = "Skills is required";
      isValid = false;
    }

    if (!formData.candidate_expected_salary.trim()) {
      newErrors.candidate_expected_salary = "Expected Salary is required";
      isValid = false;
    }

    if (!formData.candidate_experience.trim()) {
      newErrors.candidate_experience = "Experience is required";
      isValid = false;
    }

    if (!formData.profile.trim()) {
      newErrors.profile = "Profile is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // Handle form submission here, for example, send data to backend or perform validation
  //   console.log("Form Data:", formData);

  //   if (validateForm()) {
  //     try {
  //       const response = await axios.post(
  //         `${BASE_API_URL}candidate/create`,
  //         formData
  //       );
  //       settogle(!togle); // Toggle data to refresh the table
  //       console.log(response.data); // Handle the response as needed
  //       setMessage(response.data.msg); // Display the success message

  //       // Clear form fields after successful submission
  //       setFormData({
  //         profile: "",
  //         profile_id: "",
  //       });

  //       // Clear the success message after 2 seconds

  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }
  // };


      // Function to handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        console.log('Check Doc. Proof', selectedFile);
        // Attach Base64 resume to formData
        formData.candidate_document_proof = selectedFile;
      
      
        if (validateForm()) {
          try {
            const response = await axios.post(`${BASE_API_URL}candidate/create`, formData, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            console.log('Server response:', response.data);
            setMessage(response.data.msg);
            settogle(!togle); // Update table data toggle
          } catch (error) {
            console.error('Error submitting form:', error);
          }
        }
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
          `${BASE_API_URL}candidate/delete?_id=${id}`
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
  const handleChange = async (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);
  };
  useEffect(() => {
    const updateUrlAndFetchData = async () => {
      if (query !== "") {
        try {
          // Update the URL with the search parameter
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("profile", query);
          window.history.replaceState({ path: newUrl.href }, "", newUrl.href); // Use replaceState to avoid adding new history entry

          // Send the request to the backend with the search parameter
          const response = await axios.get(`${BASE_API_URL}candidate/search`, {
            params: { profile: query },
          });
          settableData(response.data);
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        try {
          // Remove the search parameter from the URL
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete("profile");
          window.history.replaceState({ path: newUrl.href }, "", newUrl.href);

          // Send the request to get the full list
          const response = await axios.get(`${BASE_API_URL}candidate/list`);
          settableData(response.data.data);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    updateUrlAndFetchData();
  }, [query]);
  const clearSearch = () => {
    setQuery(""); // Clear input
    handleChange({ target: { value: "" } }); // Trigger table reset
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
            // Check if the value is an array (like candidate_skills)
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
    fetch(`${BASE_API_URL}candidate/export-data`, {
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
    const filename = `Candidate-Data-0${downloadCount}.csv`; // Dynamic filename
    downloadCSV(csv, filename);
  };

  const sendEmails = async () => {
    if (selectedEmails.length === 0) {
      setMessage("Please select at least one email to send.");
      return;
    }
    setMessage("Sending to mail to selected Email's...");
    try {
      const response = await axios.post(`${BASE_API_URL}candidate/send-mail`, {
        emails: selectedEmails,
      });
      console.log("Response:", response.data);
      setMessage(response.data.msg);
      if (response.data.success) {
        closePopup();
      }
      setTimeout(() => setMessage(""), 2000);
      // Reset selected emails and checkboxes after sending emails
      setSelectedEmails([]);
      setSelectAll(false);
    } catch (error) {
      console.error("Error sending emails:", error);
      setMessage("Error sending emails.");
    }
  };

  const handleCheckboxChangeEmail = (email) => {
    setSelectedEmails((prevSelectedEmails) =>
      prevSelectedEmails.includes(email)
        ? prevSelectedEmails.filter((e) => e !== email)
        : [...prevSelectedEmails, email]
    );
  };




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
              <h2 className="headerData">Welcome To Candidate Page</h2>
            </div>
            <div class="adddelButton">
              <button
                className="refreshButton"
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
              <button className="backButton" onClick={openPopup}>
                <FontAwesomeIcon icon={faPlusCircle} />
              </button>

              <button
                className="multiDeleteButton"
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
                                Add New Candidate
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
                            <div class="row" style={{ margin: "30px" }}>
                              <div class="mb-3 col-md-6">
                                <input
                                  className="inputbox"
                                  type="text"
                                  name="candidate_id"
                                  value={formData.candidate_id}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Candidate ID"
                                />
                                {errors.candidate_id && (
                                  <span
                                    className="error"
                                    style={{ color: "red" }}
                                  >
                                    {errors.candidate_id}
                                  </span>
                                )}
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="candidate_first_name"
                                  value={formData.candidate_first_name}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="First Name"
                                />
                                {errors.candidate_first_name && (
                                  <span
                                    className="error"
                                    style={{ color: "red" }}
                                  >
                                    {errors.candidate_first_name}
                                  </span>
                                )}
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="candidate_last_name"
                                  value={formData.candidate_last_name}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Last Name"
                                />
                                {errors.candidate_last_name && (
                                  <span
                                    className="error"
                                    style={{ color: "red" }}
                                  >
                                    {errors.candidate_last_name}
                                  </span>
                                )}
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="candidate_mobile"
                                  value={formData.candidate_mobile}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Mobile Number"
                                />
                                {errors.candidate_mobile && (
                                  <span
                                    className="error"
                                    style={{ color: "red" }}
                                  >
                                    {errors.candidate_mobile}
                                  </span>
                                )}
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="candidate_alternate_mobile"
                                  value={formData.candidate_alternate_mobile}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Alternate Mobile Number"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="email"
                                  name="candidate_email"
                                  value={formData.candidate_email}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Email"
                                />
                                {errors.candidate_email && (
                                  <span
                                    className="error"
                                    style={{ color: "red" }}
                                  >
                                    {errors.candidate_email}
                                  </span>
                                )}
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="candidate_skype"
                                  value={formData.candidate_skype}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Skype Profile"
                                />
                                {errors.candidate_skype && (
                                  <span
                                    className="error"
                                    style={{ color: "red" }}
                                  >
                                    {errors.candidate_skype}
                                  </span>
                                )}
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="candidate_linkedIn_profile"
                                  value={formData.candidate_linkedIn_profile}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="LinkedIn Profile"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="candidate_skills"
                                  value={formData.candidate_skills}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Skills"
                                />
                                {errors.candidate_skills && (
                                  <span
                                    className="error"
                                    style={{ color: "red" }}
                                  >
                                    {errors.candidate_skills}
                                  </span>
                                )}
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="candidate_experience"
                                  value={formData.candidate_experience}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Experience"
                                />
                                {errors.candidate_experience && (
                                  <span
                                    className="error"
                                    style={{ color: "red" }}
                                  >
                                    {errors.candidate_experience}
                                  </span>
                                )}
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="candidate_expected_salary"
                                  value={formData.candidate_expected_salary}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Expected Salary"
                                />
                                {errors.candidate_expected_salary && (
                                  <span
                                    className="error"
                                    style={{ color: "red" }}
                                  >
                                    {errors.candidate_expected_salary}
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
                                  Date Of Joining :{" "}
                                </label>
                                <input
                                  type="date"
                                  name="candidate_doj"
                                  value={formData.candidate_doj}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  style={{ width: "65%" }}
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <select
                                  name="candidate_marrital_status"
                                  value={formData.candidate_marrital_status}
                                  onChange={handleInputChange}
                                  class="form-control"
                                >
                                  <option value="" disabled selected>
                                    Select Marrital Status
                                  </option>
                                  <option value="Single">Single</option>
                                  <option value="Married">Married</option>
                                  <option value="Divorced">Divorced</option>
                                  <option value="Widowed">Widowed</option>
                                </select>
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="interview_rounds"
                                  value={formData.interview_rounds}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Interview Rounds"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <select
                                  name="candidate_selection_status"
                                  value={formData.candidate_selection_status}
                                  onChange={handleInputChange}
                                  class="form-control"
                                >
                                  <option value="" disabled selected>
                                    Selection Status
                                  </option>
                                  <option value="Applied">Applied</option>
                                  <option value="Shortlisted">
                                    Shortlisted
                                  </option>
                                  <option value="Rejected">Rejected</option>
                                  <option value="Selected">Selected</option>
                                </select>
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="candidate_feedback"
                                  value={formData.candidate_feedback}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Feedback"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="source_of_candidate"
                                  value={formData.source_of_candidate}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Source"
                                />
                              </div>

                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="candidate_address"
                                  value={formData.candidate_address}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Address"
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
                                  <b>Document Proof</b>{" "}
                                </label>
                                <input
                                  type="file"
                                  onChange={handleFileChange}
                                  className="form-control"
                                  placeholder="candidate document proof"
                                  name="candidate_document_proof"
                                  style={{ width: "65%" }}
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="tenth_percentages"
                                  value={formData.tenth_percentages}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="10th %"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="twelfth_percentages"
                                  value={formData.twelfth_percentages}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="12th %"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="graduationPercentages"
                                  value={formData.graduationPercentages}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Graduation %"
                                />
                              </div>

                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="postGraduationPercentage"
                                  value={formData.postGraduationPercentage}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Post Graduation %"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="profile"
                                  value={formData.profile}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Profile"
                                />
                                {errors.profile && (
                                  <span
                                    className="error"
                                    style={{ color: "red" }}
                                  >
                                    {errors.profile}
                                  </span>
                                )}
                              </div>
                              <span style={{ color: "green" }}>
                                {message && <p>{message}</p>}
                              </span>
                            </div>
                            <div class="AddButtonDiv">
                              <button type="submit" class="AddButton">
                                Add Candidate
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
                      <th
                        scope="col"
                        onClick={() => handleSort("candidate_id")}
                      >
                        {" "}
                        Candidate ID{" "}
                        {sortColumn === "candidate_id" && (
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
                        Moblile{" "}
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
                      <th
                        scope="col"
                        onClick={() => handleSort("candidate_selection_status")}
                      >
                        {" "}
                        Selection Status{" "}
                        {sortColumn === "candidate_selection_status" && (
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
                        onClick={() => handleSort("candidate_document_proof")}
                      >
                        <b>Document Proof </b>
                        {sortColumn === "candidate_document_proof" && (
                          <FontAwesomeIcon
                            icon={
                              sortDirection === "asc" ? faSortUp : faSortDown
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
                          <td>{data.candidate_id}</td>
                          <td>
                            {data.candidate_first_name}&nbsp;
                            {data.candidate_last_name}
                          </td>
                          <td>{data.candidate_email}</td>
                          <td>
                            <label className="customcheckbox">
                              <input
                                className="listCheckbox"
                                type="checkbox"
                                checked={selectedEmails.includes(
                                  data.candidate_email
                                )}
                                onChange={() =>
                                  handleCheckboxChangeEmail(
                                    data.candidate_email
                                  )
                                }
                              />
                              <span className="checkmark"></span>
                            </label>
                          </td>
                          <td>{data.candidate_mobile}</td>
                          <td>{data.candidate_selection_status}</td>
                          <td>
                            <button
                              className="pdfButton2"
                              onClick={() => window.open(`http://localhost:5080/${data.candidate_document_proof}`, '_blank')}
                              title="Show Pdf"
                            >
                              <FontAwesomeIcon icon={faFilePdf} />
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
                            candidateId={selectedCandidateId}
                            onRequestClose={closeModal}
                          >
                            <h2>Modal Title</h2>
                            <p>Modal Content</p>
                          </ModalBox>
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

export default CandidateModule;
