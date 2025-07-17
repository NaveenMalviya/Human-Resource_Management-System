import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../sidebar/sidebar';
import { Link } from 'react-router-dom';

import { BASE_API_URL } from '../../lib/constants';

const UserHome = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [candidateCount, setCandidateCount] = useState(0);
  const [expensesCount, setExpensesCount] = useState(0);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);

  useEffect(() => {
    // Fetch the total number of employees from the backend API
    axios.get(`${BASE_API_URL}employee/count`)  // Adjust the URL based on your API setup
      .then(response => {
        setEmployeeCount(response.data.count);  // Assuming the count is returned as { count: X }
      })
      .catch(error => {
        console.error('Error fetching employee count:', error);
      });

    // Fetch the total number of candidates from the backend API
    axios.get(`${BASE_API_URL}candidate/count`)  // Adjust the URL based on your API setup
      .then(response => {
        setCandidateCount(response.data.count);  // Assuming the count is returned as { count: X }
      })
      .catch(error => {
        console.error('Error fetching candidate count:', error);
      });
    // Fetch the total number of candidates from the backend API
    axios.get(`${BASE_API_URL}expenses/count`)  // Adjust the URL based on your API setup
      .then(response => {
        setExpensesCount(response.data.count);  // Assuming the count is returned as { count: X }
      })
      .catch(error => {
        console.error('Error fetching candidate count:', error);
      });

    // Fetch upcoming employee birthdays from the backend API
    axios.get(`${BASE_API_URL}employee/upcomingEmployeeBirthday`) // Adjust the URL based on your API setup
      .then(response => {
        if (response.data.success) {
          setUpcomingBirthdays(response.data.data); // Assuming the data returned is in the format { data: [{ employee_first_name, employee_last_name, employee_dob }, ...] }
        } else {
          console.error(response.data.msg); // Handle the case when no upcoming birthdays are found
        }
      })
      .catch(error => {
        console.error('Error fetching upcoming birthdays:', error);
      });
  }, []);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show loading animation for 1 second on every navigation
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []); 

  return (
    
    <div className='main'>
      <div className='main1' style={{ position: 'fixed' }}>
        <div>
          <Nav />
        </div>
      </div>
      {loading ? (
              <div className="loading-overlay">
                <div className="spinner"></div>
              </div>
            ) : (
      <div className='main2' style={{ marginLeft: 'auto', padding:'20px'}}>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'20px'}}>
          <div style={{
            backgroundColor: '#fff',
            color:'#7d00aa', 
            borderRadius: '8px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            textAlign: 'center', 
            width: '20%',
            paddingTop:'10px', 

          }}>
            <h3 style={{ fontSize: '18px',color:'#000', marginBottom: '10px' }}>Total Employees</h3> 
            <Link to="/employee" style={{ fontSize: '24px', fontWeight: 'bold', textDecoration:'none', color:'#7d00aa' }}>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{employeeCount}</p></Link>
          </div>
          <div style={{
            backgroundColor: '#fff',
            color:'#7d00aa', 
            borderRadius: '8px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            textAlign: 'center', 
            width: '20%',
            paddingTop:'10px', 

          }}>
            <h3 style={{ fontSize: '18px',color:'#000', marginBottom: '10px' }}>Total Candidates</h3> 
            <Link to="/candidate" style={{ fontSize: '24px', fontWeight: 'bold', textDecoration:'none', color:'#7d00aa' }}>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{candidateCount}</p></Link>
          </div>
          <div style={{
              backgroundColor: '#fff',
              color:'#7d00aa', 
              borderRadius: '8px', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 

              textAlign: 'center', 
              width: '20%',
              paddingTop:'10px', 
  
            }}>
              <h3 style={{ fontSize: '18px',color:'#000', marginBottom: '10px' }}>Upcoming Employee Birthday</h3> 
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {upcomingBirthdays.length > 0 ? (
                  upcomingBirthdays.map((employee, index) => (
                    <li key={index} style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold'}}>🎂
                      {employee.employee_first_name} {employee.employee_last_name} - {new Date(employee.employee_dob).toLocaleDateString()}
                      🎁</li>
                  ))
                ) : (
                  <li style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold'}}>No upcoming birthdays</li>
                )}
              </ul>
            </div>
          <div style={{
            backgroundColor: '#fff',
            color:'#7d00aa', 
            borderRadius: '8px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            textAlign: 'center', 
            width: '20%',
            paddingTop:'10px', 
          }}>
          
            <h3 style={{ fontSize: '18px',color:'#000', marginBottom: '10px' }}>Total Expenses</h3>  
            <Link to="/expenses" style={{ fontSize: '24px', fontWeight: 'bold', textDecoration:'none', color:'#7d00aa' }}>
            <p>{expensesCount}</p>
            </Link>
          </div>
          </div>
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img  
              style={{width:'100%', borderRadius:'5px'}}
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Your Image" 
            />
          </div>
      </div>
      )}
    </div>
  );
};

export default UserHome;
