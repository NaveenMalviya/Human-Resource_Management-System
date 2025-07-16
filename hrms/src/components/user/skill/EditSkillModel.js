import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // For Axios
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import Modal from 'react-modal';
import { BASE_API_URL } from '../../../lib/constants';


const ModalBox = ({ isOpen, onRequestClose, skillId }) => {
    const [message, setMessage] = useState('');
    const [data, setData] = useState([])
    useEffect(() => {

        if (isOpen) {
            console.log('model open', skillId)
            // Fetch data for the given skillId
            if (skillId) {
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`${BASE_API_URL}skills/getSkillById?id=${skillId}`);
                        setData(response.data.data)
                        console.log('data', data)

                    } catch (error) {
                        console.log('model open error')
                        console.error('Error fetching skills data:', error);
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
            const response = await axios.put(`${BASE_API_URL}skills/update`, data); 
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
                                <h4 style={{ display: 'inline', marginRight: '10px' }} className="mb-5 text-secondary">Edit Skills</h4>

                            </div>
                            <div class="row">

                            <div class="mb-3 col-md-6">
                                                                    <input type="text" name="skills" value={data.skills} onChange={handleInputChange} class="form-control" placeholder="Skills" />
                                                                    {/* {errors.skills && <span className="error" style={{ color: 'red' }}>{errors.skills}</span>} */}
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="profile" value={data.profile} onChange={handleInputChange} class="form-control" placeholder="Profile" />
                                                                    {/* {errors.profile && <span className="error" style={{ color: 'red' }}>{errors.profile}</span>} */}
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="profile_id" value={data.profile_id} onChange={handleInputChange} class="form-control" placeholder="Profile ID" />
                                                                    {/* {errors.profile_id && <span className="error" style={{ color: 'red' }}>{errors.profile_id}</span>} */}
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="description" value={data.description} onChange={handleInputChange} class="form-control" placeholder="Description" />
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






