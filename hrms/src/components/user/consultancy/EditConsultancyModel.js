import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // For Axios
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import Modal from 'react-modal';
import { BASE_API_URL } from '../../../lib/constants';


const ModalBox = ({ isOpen, onRequestClose, counsultancyId }) => {
    const [message, setMessage] = useState('');
    const [data, setData] = useState([])
    useEffect(() => {

        if (isOpen) {
            console.log('model open', counsultancyId)
            // Fetch data for the given counsultancyId
            if (counsultancyId) {
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`${BASE_API_URL}consultancy/getById?id=${counsultancyId}`);
                        setData(response.data.data)
                        console.log('data', data)

                    } catch (error) {
                        console.log('model open error')
                        console.error('Error fetching consultancy data:', error);
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
            const response = await axios.put(`${BASE_API_URL}consultancy/update`, data);    
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
            console.error('Error:', error);
            setMessage('An error occurred while updating the Employee');
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
                                <h4 style={{ display: 'inline', marginRight: '10px' }} className="mb-5 text-secondary">Edit consultancy</h4>

                            </div>
                            <div class="row">

                            <div class="mb-3 col-md-6">
                                                                    <input type="text" name="consultancy_name" value={data.consultancy_name} onChange={handleInputChange} class="form-control" placeholder="Consultancy Name" />
                                                                    {/* {errors.consultancy_name && <span className="error" style={{ color: 'red' }}>{errors.consultancy_name}</span>} */}
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="consultancy_email" value={data.consultancy_email} onChange={handleInputChange} class="form-control" placeholder="Consultancy Email" />
                                                                    {/* {errors.consultancy_email && <span className="error" style={{ color: 'red' }}>{errors.consultancy_email}</span>} */}
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="consultancy_website_url" value={data.consultancy_website_url} onChange={handleInputChange} class="form-control" placeholder="Consultancy Website URL" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="consultancy_mobile" value={data.consultancy_mobile} onChange={handleInputChange} class="form-control" placeholder="Consultancy Mobile" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="consultancy_alternate_mobile" value={data.consultancy_alternate_mobile} onChange={handleInputChange} class="form-control" placeholder="Consultancy Alternate Mobile" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="consultancy_city" value={data.consultancy_city} onChange={handleInputChange} class="form-control" placeholder="Consultancy City" />
                                                                </div>
                                                                {/* <div class="mb-3 col-md-6" style={{ textAlign: 'left', display: 'flex', flexDirection: 'row', justifyContent: "space-between" , width: '50%'}}>
                                                                    <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>ticket_created_date</label>
                                                                    <input type="date" name="consultancy_address" value={data.consultancy_ticket_created_date} onChange={handleInputChange} class="form-control" style={{ width: 'auto' }}/>
                                                                </div> */}
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="consultancy_state" value={data.consultancy_state} onChange={handleInputChange} class="form-control" placeholder="Consultancy State" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="consultancy_address" value={data.consultancy_address} onChange={handleInputChange} class="form-control" placeholder="Consultancy Address" />
                                                                    {/* {errors.consultancy_address && <span className="error" style={{ color: 'red' }}>{errors.consultancy_address}</span>} */}
                                                                </div>
                                                                {/* <div class="mb-3 col-md-6" style={{ textAlign: 'left', display: 'flex', flexDirection: 'row', justifyContent: "space-between" , width: '50%'}}>
                                                                    <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>ticket_solved_date</label>
                                                                    <input type="date" name="consultancy_address" value={data.consultancy_address} onChange={handleInputChange} class="form-control" style={{ width: 'auto' }}/>
                                                                </div> */}
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="contract_agreement" value={data.contract_agreement} onChange={handleInputChange} class="form-control" placeholder="Contract Agreement" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="contract_person_name" value={data.contract_person_name} onChange={handleInputChange} class="form-control" placeholder="Contractor Name" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="contract_linkedIn_Profile" value={data.contract_linkedIn_Profile} onChange={handleInputChange} class="form-control" placeholder="Contract LinkedIn Profile" />
                                                                </div>

                                                                <div class="col-md-12" style={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                                    <button type="submit" >Update Consultancy</button> 
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






