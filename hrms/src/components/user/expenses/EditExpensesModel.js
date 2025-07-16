import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 
import Modal from 'react-modal';
import { BASE_API_URL } from '../../../lib/constants';


const ModalBox = ({ isOpen, onRequestClose, ExpenseId }) => {
    const [message, setMessage] = useState('');
    const [data, setData] = useState([])
    useEffect(() => {

        if (isOpen) {
            console.log('model open', ExpenseId)
            // Fetch data for the given ExpenseId
            if (ExpenseId) {
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`${BASE_API_URL}expenses/getById?id=${ExpenseId}`);
                        setData(response.data.data)
                        console.log('data', data)

                    } catch (error) {
                        console.log('model open error')
                        console.error('Error fetching expenses data:', error);
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
            const response = await axios.put(`${BASE_API_URL}expenses/update`, data);    
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
                                <h4 style={{ display: 'inline', marginRight: '10px' }} className="mb-5 text-secondary">Edit expenses</h4>

                            </div>
                            <div class="row">


                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="expenses_purpose" value={data.expenses_purpose} onChange={handleInputChange} class="form-control" placeholder="Expenses Purpose" />
                                                                    
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="expenses_bill" value={data.expenses_bill} onChange={handleInputChange} class="form-control" placeholder="Expenses Bill" />
                                                                    {/* {errors.expenses_bill && <span className="error" style={{ color: 'red' }}>{errors.expenses_bill}</span>} */}
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="expenses_amount" value={data.expenses_amount} onChange={handleInputChange} class="form-control" placeholder="Expenses Amount" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="expenses_voucher" value={data.expenses_voucher} onChange={handleInputChange} class="form-control" placeholder="Expenses Voucher" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="expenses_remark" value={data.expenses_remark} onChange={handleInputChange} class="form-control" placeholder="Expenses Remark" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="expenses_by_cash" value={data.expenses_by_cash} onChange={handleInputChange} class="form-control" placeholder="Expenses By Cash" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="expenses_by_cheque" value={data.expenses_by_cheque} onChange={handleInputChange} class="form-control" placeholder="expenses_by_cheque" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="expenses_cash_recieved_by" value={data.expenses_cash_recieved_by} onChange={handleInputChange} class="form-control" placeholder="expenses_cash_recieved_by" />
                                                                </div>
                                                                <div class="mb-3 col-md-6" style={{ textAlign: 'left', display: 'flex', flexDirection: 'row', justifyContent: "space-between" , width: '50%'}}>
                                                                    <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Date Of Expenses</label>
                                                                    <input type="date" name="date_of_expenses" value={data.date_of_expenses} onChange={handleInputChange} class="form-control" style={{ width: 'auto' }}/>
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="transaction_id" value={data.transaction_id} onChange={handleInputChange} class="form-control" placeholder="transaction_id" />
                                                                    {/* {errors.transaction_id && <span className="error" style={{ color: 'red' }}>{errors.transaction_id}</span>} */}
                                                                </div>


                                                                <div class="col-md-12" style={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                                    <button type="submit" >Update Expense</button> 
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






