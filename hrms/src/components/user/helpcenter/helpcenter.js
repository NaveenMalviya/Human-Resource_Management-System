import React, { useState, useEffect } from "react";
import "./helpcenter.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"; // For Axios
import ModalBox from "./EditHelpCenterModel";
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
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../../footer/footer.js";

import { BASE_API_URL } from "../../../lib/constants.jsx";
import { Link } from "react-router-dom";
import Navbar from "../../navbar/navbar.js";

const HelpcenterModule = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableData, settableData] = useState([]);
  const [togle, settogle] = useState([true]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedhelpcenterId, setSelectedhelpcenterId] = useState(null);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("ascending");
  const [ids, setId] = useState([]);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected); // Update the current page when pagination changes
  };

  const itemsPerPage = 6; // Number of items to display per page
  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(tableData.length / itemsPerPage);
  // const currentItems = tableData.slice(offset, offset + itemsPerPage);

  // const [data, setData] = useState(formData);
  const openModal = (helpcenterId) => {
    console.log("helpcenterId", helpcenterId);
    setModalIsOpen(true);
    setSelectedhelpcenterId(helpcenterId);
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
          `${BASE_API_URL}helpcenter/multiDelete`,
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
    if (!formData.helpcenter_ticket_id.trim()) {
      newErrors.helpcenter_ticket_id = "helpcenter_ticket_id is required";
      isValid = false;
    }
    if (!formData.helpcenter_employee_id.trim()) {
      newErrors.helpcenter_employee_id = "helpcenter_employee_id is required";
      isValid = false;
    }

    if (!formData.helpcenter_employee_code.trim()) {
      newErrors.helpcenter_employee_code =
        "helpcenter_employee_code is required";
      isValid = false;
    }
    if (!formData.helpcenter_ticket_description.trim()) {
      newErrors.helpcenter_ticket_description =
        "helpcenter_ticket_description is required";
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
    helpcenter_ticket_id: "",
    helpcenter_employee_id: "",
    helpcenter_employee_code: "",
    helpcenter_ticket_description: "",
  });
  const [formData, setFormData] = useState({
    helpcenter_ticket_id: "",
    helpcenter_employee_id: "",
    helpcenter_employee_code: "",
    helpcenter_ticket_description: "",
    helpcenter_ticket_priority: "",
    helpcenter_ticket_department: "",
    // helpcenter_ticket_created_date: '',
    helpcenter_ticket_status: "",
    // helpcenter_ticket_solved_date: '',
    helpcenter_ticket_solved_by: "",
    helpcenter_ticket_managed_by: "",
    helpcenter_solve_duration: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_API_URL}helpcenter/listTickets`
        );

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    if (validateForm()) {
      try {
        const response = await axios.post(
          `${BASE_API_URL}helpcenter/createTicket`,
          formData
        );
        settogle(!togle); // Toggle data to refresh the table
        console.log(response.data);

        setMessage(response.data.msg);

        // Clear form fields after successful submission
        setFormData({
          // Assuming your form fields, update the names as per your actual form structure
          ticketTitle: "",
          ticketDescription: "",
          priority: "",
          // Add other fields as necessary
        });

        // Clear the message after 2 seconds
        setTimeout(() => {
          setIsOpen(false); // Close the form popup after 2 seconds
          setMessage(""); // Clear the message
        }, 1500);
      } catch (error) {
        console.error("Error:", error);
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
          `${BASE_API_URL}helpcenter/deleteTicket?id=${id}`
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
            <Navbar />
          </div>
          <div class="allcontent">
            <div class="welcome">
              <h2 className="headerData">Welcome To Help Center Page</h2>
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
                          >
                            <div style={{ textAlign: "center" }}>
                              <h4
                                style={{ display: "inline" }}
                                className="mb-5 text-secondary"
                              >
                                Add New Help Ticket
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
                                  type="text"
                                  name="helpcenter_ticket_id"
                                  value={formData.helpcenter_ticket_id}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Ticket ID"
                                />
                                {errors.helpcenter_ticket_id && (
                                  <span
                                    className="error"
                                    style={{ color: "red" }}
                                  >
                                    {errors.helpcenter_ticket_id}
                                  </span>
                                )}
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="helpcenter_employee_id"
                                  value={formData.helpcenter_employee_id}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Employee ID"
                                />
                                {errors.helpcenter_employee_id && (
                                  <span
                                    className="error"
                                    style={{ color: "red" }}
                                  >
                                    {errors.helpcenter_employee_id}
                                  </span>
                                )}
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="helpcenter_employee_code"
                                  value={formData.helpcenter_employee_code}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Employee Code"
                                />
                                {errors.helpcenter_employee_code && (
                                  <span
                                    className="error"
                                    style={{ color: "red" }}
                                  >
                                    {errors.helpcenter_employee_code}
                                  </span>
                                )}
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="helpcenter_ticket_description"
                                  value={formData.helpcenter_ticket_description}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Ticket Description"
                                />
                                {errors.helpcenter_ticket_description && (
                                  <span
                                    className="error"
                                    style={{ color: "red" }}
                                  >
                                    {errors.helpcenter_ticket_description}
                                  </span>
                                )}
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="helpcenter_ticket_priority"
                                  value={formData.helpcenter_ticket_priority}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Ticket Priority"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="helpcenter_ticket_department"
                                  value={formData.helpcenter_ticket_department}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Ticket Department"
                                />
                              </div>
                              {/* <div class="mb-3 col-md-6" style={{ textAlign: 'left', display: 'flex', flexDirection: 'row', justifyContent: "space-between" , width: '50%'}}>
                                                                <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>ticket_created_date</label>
                                                                <input type="date" name="helpcenter_ticket_solved_date" value={formData.helpcenter_ticket_created_date} onChange={handleInputChange} class="form-control" style={{ width: 'auto' }}/>
                                                            </div> */}
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="helpcenter_ticket_status"
                                  value={formData.helpcenter_ticket_status}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Ticket Status Like:- Pendding, Solved, Work In Process..."
                                />
                              </div>
                              {/* <div class="mb-3 col-md-6" style={{ textAlign: 'left', display: 'flex', flexDirection: 'row', justifyContent: "space-between" , width: '50%'}}>
                                                                <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>ticket_solved_date</label>
                                                                <input type="date" name="helpcenter_ticket_solved_date" value={formData.helpcenter_ticket_solved_date} onChange={handleInputChange} class="form-control" style={{ width: 'auto' }}/>
                                                            </div> */}
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="helpcenter_ticket_solved_by"
                                  value={formData.helpcenter_ticket_solved_by}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Solved By"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="helpcenter_ticket_managed_by"
                                  value={formData.helpcenter_ticket_managed_by}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Manageded By"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <input
                                  type="text"
                                  name="helpcenter_solve_duration"
                                  value={formData.helpcenter_solve_duration}
                                  onChange={handleInputChange}
                                  class="form-control"
                                  placeholder="Solve Duration"
                                />
                              </div>
                              <span style={{ color: "green" }}>
                                {message && <p>{message}</p>}
                              </span>
                            </div>
                            <div class="AddButtonDiv">
                              <button type="submit" class="AddButton">
                                Add helpcenter
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
                    <th scope="col" onClick={() => handleSort("id")}>
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
                    </th>
                    <th
                      scope="col"
                      onClick={() => handleSort("helpcenter_ticket_id")}
                    >
                      {" "}
                      Ticket Id{" "}
                      {sortColumn === "helpcenter_ticket_id" && (
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
                      onClick={() =>
                        handleSort("helpcenter_ticket_description")
                      }
                    >
                      {" "}
                      Description{" "}
                      {sortColumn === "helpcenter_ticket_description" && (
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
                      onClick={() => handleSort("helpcenter_ticket_department")}
                    >
                      {" "}
                      Department{" "}
                      {sortColumn === "helpcenter_ticket_department" && (
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
                      onClick={() => handleSort("helpcenter_ticket_priority")}
                    >
                      {" "}
                      Priority{" "}
                      {sortColumn === "helpcenter_ticket_priority" && (
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
                      onClick={() => handleSort("helpcenter_ticket_status")}
                    >
                      {" "}
                      Status{" "}
                      {sortColumn === "helpcenter_ticket_status" && (
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
                      <label className="customcheckbox m-b-20">
                        <input type="checkbox" id="mainCheckbox" />
                      </label>
                    </th>
                  </tr>
                </thead>
                <tbody className="customtable">
                  {sortedData()
                    .slice(offset, offset + itemsPerPage)
                    .map((data, index) => (
                      <tr key={index}>
                        <td>{data._id}</td>
                        <td>{data.helpcenter_ticket_id}</td>
                        <td>{data.helpcenter_ticket_description}</td>
                        <td>{data.helpcenter_ticket_department}</td>
                        <td>{data.helpcenter_ticket_priority}</td>
                        <td>{data.helpcenter_ticket_status}</td>
                        <td>
                          <div class="editdelete">
                            <button
                              className="editButton bt1"
                              onClick={() =>
                                DeleteData(data._id) + window.location.reload()
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
                          helpcenterId={selectedhelpcenterId}
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

export default HelpcenterModule;
