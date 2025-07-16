import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"; // For Axios
import Modal from "react-modal";
import { BASE_API_URL } from "../../../lib/constants";

const ModalBox = ({ isOpen, onRequestClose, candidateId }) => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    if (isOpen) {
      console.log("model open", candidateId);
      // Fetch data for the given candidateId
      if (candidateId) {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `${BASE_API_URL}candidate/getById?_id=${candidateId}`
            );
            setData(response.data.data);
            console.log("data", data);
          } catch (error) {
            console.log("model open error");
            console.error("Error fetching candidate data:", error);
          }
        };

        fetchData();
      }
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data", data);

    try {
      const response = await axios.put(`${BASE_API_URL}candidate/update`, data);

      if (response && response.data && response.data.msg) {
        setMessage(response.data.msg);

        // Close the modal after 2 seconds
        setTimeout(() => {
          setMessage('');
          onRequestClose(); // Use the onRequestClose prop to close the modal
        }, 1000);
      } else {
        setMessage("No message returned from the server");
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while updating the Candidate");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={{
        overlay: {

          backgroundColor: 'rgba(0, 0, 0, 0.3)'
      },
      content: {
          width: '60%',
          height: '100vh',
          backgroundColor:'rgba(0, 0, 0, 0)',
          margin: 'auto',
          border:'none',
      }
      }}
    >
      <div class="row">
        <div style={{ width: "100%" }}>
          <div class="signup-form" style={{ width: "100%" }}>
            <form
              style={{height:'90vh', overflowY:'scroll'}}
              onSubmit={handleSubmit}
              class="border p-4 bg-light shadow"
            >
          <button onClick={onRequestClose} style={{float:'right'}}>
            Close
          </button>
              <div style={{ textAlign: "center" }}>
                <h4
                  style={{ display: "inline"}}
                  className="mb-5 text-secondary"
                >
                  Edit Candidate
                </h4>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <input
                    className="inputbox"
                    type="text"
                    name="candidate_id"
                    value={data.candidate_id}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Candidate ID"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="candidate_first_name"
                    value={data.candidate_first_name}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="First Name"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="candidate_last_name"
                    value={data.candidate_last_name}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Last Name"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="candidate_mobile"
                    value={data.candidate_mobile}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Mobile Number"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="candidate_alternate_mobile"
                    value={data.candidate_alternate_mobile}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Alternate Mobile Number"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="email"
                    name="candidate_email"
                    value={data.candidate_email}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Email"
                  />
                </div>

                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="candidate_skype"
                    value={data.candidate_skype}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Skype Profile"
                  />
                </div>

                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="candidate_linkedIn_profile"
                    value={data.candidate_linkedIn_profile}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="LinkedIn Profile"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="candidate_skills"
                    value={data.candidate_skills}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Skills"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="candidate_experience"
                    value={data.candidate_experience}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Experience"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="candidate_expected_salary"
                    value={data.candidate_expected_salary}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Expected Salary"
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
                    name="candidate_doj"
                    value={data.candidate_doj}
                    onChange={handleInputChange}
                    class="form-control"
                    style={{ width: "65%" }}
                  />
                </div>

                <div class="mb-3 col-md-6">
                  <select
                    name="candidate_marrital_status"
                    value={data.candidate_marrital_status}
                    onChange={handleInputChange}
                    class="form-control"
                  >
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
                    value={data.interview_rounds}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Interview Rounds"
                  />
                </div>

                <div class="mb-3 col-md-6">
                  <select
                    name="candidate_selection_status"
                    value={data.candidate_selection_status}
                    onChange={handleInputChange}
                    class="form-control"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Selected">Selected</option>
                  </select>
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="candidate_feedback"
                    value={data.candidate_feedback}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Feedback"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="source_of_candidate"
                    value={data.source_of_candidate}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Source"
                  />
                </div>

                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="candidate_address"
                    value={data.candidate_address}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Address"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="candidate_document_proof"
                    value={data.candidate_document_proof}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Document Proof"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="tenth_percentages"
                    value={data.tenth_percentages}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="10th %"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="twelfth_percentages"
                    value={data.twelfth_percentages}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="12th %"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="graduationPercentages"
                    value={data.graduationPercentages}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Graduation %"
                  />
                </div>

                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="postGraduationPercentage"
                    value={data.postGraduationPercentage}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Post Graduation %"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <input
                    type="text"
                    name="profile"
                    value={data.profile}
                    onChange={handleInputChange}
                    class="form-control"
                    placeholder="Profile"
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
                  <button type="submit">Update Candidate</button>
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
