import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // For Axios
import Modal from 'react-modal';
import { BASE_API_URL } from '../../../lib/constants';


const ModalBox = ({ isOpen, onRequestClose, helpcenterId }) => {
    const [message, setMessage] = useState('');
    const [data, setData] = useState([])
    useEffect(() => {

        if (isOpen) {
            console.log('model open', helpcenterId)
            // Fetch data for the given helpcenterId
            if (helpcenterId) {
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`${BASE_API_URL}helpcenter/getTicketById?id=${helpcenterId}`);
                        setData(response.data.data)
                        console.log('data', data)

                    } catch (error) {
                        console.log('model open error')
                        console.error('Error fetching helpcenter data:', error);
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
            [name]: value
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("data", data);
    
        try {
            const response = await axios.put(`${BASE_API_URL}helpcenter/update`, data);    
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
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    backgroundColor:'rgba(0, 0, 0, 0)',
                    margin: 'auto',
                    border:'none',
                }
            }}
        >
            <div class="row">
                <div style={{width:'100%'}}>
                    <div class="signup-form" style={{width:'100%'}}>
                        <form style={{height:'auto',overflowY:'scroll'}} onSubmit={handleSubmit} class="border p-4 bg-light shadow">
            <button onClick={onRequestClose} style={{float:'right'}}>Close</button>
                            <div style={{ textAlign: 'center' }}>
                                <h4 style={{ display: 'inline', marginRight: '10px' }} className="mb-5 text-secondary">Edit HelpCenter</h4>

                            </div>
                            <div class="row">

                            <div class="mb-3 col-md-6">
                                                                    <input type="text" name="helpcenter_ticket_id" value={data.helpcenter_ticket_id} onChange={handleInputChange} class="form-control" placeholder="Ticket ID" />
                                                                    {/* {errors.helpcenter_ticket_id && <span className="error" style={{ color: 'red' }}>{errors.helpcenter_ticket_id}</span>} */}
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="helpcenter_employee_id" value={data.helpcenter_employee_id} onChange={handleInputChange} class="form-control" placeholder="Employee ID" />
                                                                    {/* {errors.helpcenter_employee_id && <span className="error" style={{ color: 'red' }}>{errors.helpcenter_employee_id}</span>} */}
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="helpcenter_employee_code" value={data.helpcenter_employee_code} onChange={handleInputChange} class="form-control" placeholder="Employee Code" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="helpcenter_ticket_description" value={data.helpcenter_ticket_description} onChange={handleInputChange} class="form-control" placeholder="Description" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="helpcenter_ticket_priority" value={data.helpcenter_ticket_priority} onChange={handleInputChange} class="form-control" placeholder="Ticket Priority" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="helpcenter_ticket_department" value={data.helpcenter_ticket_department} onChange={handleInputChange} class="form-control" placeholder="Ticket Department" />
                                                                </div>
                                                                {/* <div class="mb-3 col-md-6" style={{ textAlign: 'left', display: 'flex', flexDirection: 'row', justifyContent: "space-between" , width: '50%'}}>
                                                                    <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>ticket_created_date</label>
                                                                    <input type="date" name="helpcenter_ticket_solved_date" value={data.helpcenter_ticket_created_date} onChange={handleInputChange} class="form-control" style={{ width: 'auto' }}/>
                                                                </div> */}
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="helpcenter_ticket_status" value={data.helpcenter_ticket_status} onChange={handleInputChange} class="form-control" placeholder="Ticket Status" />
                                                                </div>
                                                                {/* <div class="mb-3 col-md-6" style={{ textAlign: 'left', display: 'flex', flexDirection: 'row', justifyContent: "space-between" , width: '50%'}}>
                                                                    <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>ticket_solved_date</label>
                                                                    <input type="date" name="helpcenter_ticket_solved_date" value={data.helpcenter_ticket_solved_date} onChange={handleInputChange} class="form-control" style={{ width: 'auto' }}/>
                                                                </div> */}
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="helpcenter_ticket_solved_by" value={data.helpcenter_ticket_solved_by} onChange={handleInputChange} class="form-control" placeholder="Solved By" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="helpcenter_ticket_solved_by" value={data.helpcenter_ticket_managed_by} onChange={handleInputChange} class="form-control" placeholder="Manageded By" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="helpcenter_ticket_solved_by" value={data.helpcenter_solve_duration} onChange={handleInputChange} class="form-control" placeholder="Solve Duration" />
                                                                </div>

                                                                <div class="col-md-12" style={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                                    <button type="submit" >Update Help Center</button> 
                                    <span style={{ color: 'green',}}>{message && <p>{message}</p>}</span>
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






