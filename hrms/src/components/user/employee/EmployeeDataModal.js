import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Employee.css"
const BASE_API_URL = "https://human-resource-management-system-cy7o.onrender.com/";

const EmployeeDataModal = ({ isOpen1, onRequestClose, data }) => {
    console.log('ModalComponent data:', data); // Debugging log

    if (!isOpen1 || !data) {
        return null;
    }

    // Destructure data object
    const { employee_code, employee_first_name, employee_last_name, employee_mobile,
        employee_alternate_mobile, employee_email, employee_password, employee_address,
        employee_city, employee_state, employee_other_info, employee_dob, employee_doj,
        employee_skills, employee_experience, employee_resume, employee_id_proof,
        employee_permanant_address_proof, employee_local_address_proof,
        employee_reference_one_name, employee_reference_one_mobile,
        employee_reference_two_name, employee_reference_two_mobile,
        employee_pan_card, employee_marksheet, employee_experience_letter,
        image, resumePdfName, proofPdfName, panPdfName, marksheetPdfName,
        experiencePdfName, imageName } = data.data;

    return (
        <Modal show={isOpen1} onHide={onRequestClose} className="custom-modal">
            <Modal.Header closeButton style={{marginLeft:'2.5%',width:'95%'}}>
                <Modal.Title style={{color:'#7d00aa'}}>"{employee_first_name} {employee_last_name}" <span style={{color:'#000'}}>Details -</span></Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-custom" >
            <div className="employee-details">

<div className="info-row">
    <div className="info-box"><strong>Employee ID:</strong>{employee_code}</div>
    <div className="info-box"><strong>Profile Picture:</strong><img src={`${BASE_API_URL}${image}`} onClick={() => window.open(`${BASE_API_URL}${image}`, '_blank')} alt="Employee" className="profile-picture"/></div>

</div> 
<div className="info-row">
    <div className="info-box"><strong>First Name:</strong>{employee_first_name}</div>
    <div className="info-box"><strong>Last Name:</strong>{employee_last_name}</div>
</div>
<div className="info-row">
    <div className="info-box"><strong>Mobile:</strong>{employee_mobile}</div>
    <div className="info-box"><strong>Alternate Mobile:</strong>{employee_alternate_mobile}</div>
</div>
<div className="info-row">
    <div className="info-box"><strong>Email:</strong>{employee_email}</div>
    <div className="info-box"><strong>Password:</strong>{employee_password}</div>
</div>
<div className="info-row">
    <div className="info-box"><strong>Address:</strong>{employee_address}</div>
    <div className="info-box"><strong>City:</strong>{employee_city}</div>
</div>
<div className="info-row">
    <div className="info-box"><strong>State:</strong>{employee_state}</div>
    <div className="info-box"><strong>Other Info:</strong>{employee_other_info}</div>
</div>
<div className="info-row">
    <div className="info-box"><strong>Date of Birth:</strong>{employee_dob}</div>
    <div className="info-box"><strong>Date of Joining:</strong>{employee_doj}</div>
</div>
<div className="info-row">
    <div className="info-box"><strong>Skills:</strong>{(employee_skills || []).join(', ')}</div>
    <div className="info-box"><strong>Experience:</strong>{employee_experience}</div>
</div>
<div className="info-row">
    <div className="info-box"><strong>Resume:</strong>{employee_resume} <button  onClick={() => window.open(`${BASE_API_URL}${employee_resume}`, '_blank')}>View</button></div>
    <div className="info-box"><strong>ID Proof:</strong>{employee_id_proof}<button  onClick={() => window.open(`${BASE_API_URL}${employee_id_proof}`, '_blank')}>View</button></div>
</div>
<div className="info-row">
    <div className="info-box"><strong>Permanent Address Proof:</strong>{employee_permanant_address_proof}</div>
    <div className="info-box"><strong>Local Address Proof:</strong>{employee_local_address_proof}</div>
</div>
<div className="info-row">
    <div className="info-box"><strong>Reference One Name:</strong>{employee_reference_one_name}</div>
    <div className="info-box"><strong>Reference One Mobile:</strong>{employee_reference_one_mobile}</div>
</div>
<div className="info-row">
    <div className="info-box"><strong>Reference Two Name:</strong>{employee_reference_two_name}</div>
    <div className="info-box"><strong>Reference Two Mobile:</strong>{employee_reference_two_mobile}</div>
</div>
<div className="info-row">
    <div className="info-box"><strong>PAN Card:</strong>{employee_pan_card}<button  onClick={() => window.open(`${BASE_API_URL}${employee_pan_card}`, '_blank')}>View</button></div>
    <div className="info-box"><strong>Marksheet:</strong>{employee_marksheet}<button  onClick={() => window.open(`${BASE_API_URL}${employee_marksheet}`, '_blank')}>View</button></div>
</div>
<div className="info-row">
    <div className="info-box"><strong>Experience Letter:</strong>{employee_experience_letter}<button  onClick={() => window.open(`${BASE_API_URL}${employee_experience_letter}`, '_blank')}>View</button></div>
</div>


</div>

            </Modal.Body>
        </Modal>
    );
};

export default EmployeeDataModal;

