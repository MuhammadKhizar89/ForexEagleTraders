import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


export default function Work() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Fetch the attendance data from the API
    
    const token = localStorage.getItem('auth-token'); // Retrieve the token from local storage
    if (!token) {

      navigate('/'); // Redirect to the home page if auth-token is empty
    }
    const e = localStorage.getItem('admin_email');
    if (e === "forexeaglestraders@gmail.com") {
        navigate('/admin');
    }
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(`${import.meta.VITE_SERVER_URL}/Student/getUserAttendance`, {
          headers: {
            'auth-token': token // Include the token in the request headers
          }
        });
        setAttendanceData(response.data.attendance);
      } catch (error) {
        console.error('Error fetching attendance data:', error.response || error);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${import.meta.VITE_SERVER_URL}/Student/getUserInfo`, {
          headers: {
            'auth-token': token // Include the token in the request headers
          }
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching user info:', error.response || error);
      }
    };
    fetchAttendanceData();
    fetchUserInfo();
  }, [navigate]);





  return (
    <div className='w-full h-screen bg-gradient-to-b from-black to-gray-800'>
      <div className="container mx-auto p-4 bg-gradient-to-b from-black to-gray-800 h-screen">
        <div className="mb-8 ">
          <h2 className="text-2xl font-bold mb-2  text-white  ">User Info</h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            <p><strong>Name:</strong> {userData.Name}</p>
            <p><strong>Email:</strong> {userData.Email}</p>
            <p><strong>Phone Number:</strong> {userData.PhoneNumber}</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2 text-white">Attendance</h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-4 py-2">SR</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((entry, index) => (
                  <tr key={entry.ID} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{new Date(entry.Date).toISOString().split('T')[0]}</td>
                    <td
                      className="border px-4 py-2"
                      style={{ color: entry.Status === 'A' ? 'red' : 'green' }}
                    >
                      {entry.Status === 'A' ? 'Absent' : 'Present'}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
