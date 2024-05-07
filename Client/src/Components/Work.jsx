import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Modal component for displaying loading indicator
const LoadingModal = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg">
        <div className="flex items-center mb-4">
          <div className="rounded-full h-4 w-4 bg-gray-400 mr-4"></div>
          <div className="text-gray-800">Loading...</div>
        </div>
        <div className="bg-gray-300 h-2 rounded-full">
          <div className="bg-blue-500 h-full rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default function Work() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true); // State variable to track loading state
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const token = localStorage.getItem('auth-token'); // Retrieve the token from local storage
    if (!token) {
      navigate('/'); // Redirect to the home page if auth-token is empty
    }

    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/Student/getUserAttendance`, {
          headers: {
            'auth-token': token // Include the token in the request headers
          }
        });
        setAttendanceData(response.data.attendance);
      } catch (error) {
        console.error('Error fetching attendance data:', error.response || error);
      } finally {
        setIsLoading(false); // Set loading state to false when API call completes
      }
    };

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/Student/getUserInfo`, {
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
      {isLoading && <LoadingModal />} {/* Render LoadingModal if isLoading is true */}
      <div className="container mx-auto p-4 bg-gradient-to-b from-black to-gray-800 h-screen">
        <div className="mb-8 ">
          <h2 className="text-2xl font-bold mb-2 text-white">User Info</h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            <p><strong>Name:</strong> {userData.Name}</p>
            <p><strong>Email:</strong> {userData.Email}</p>
            <p><strong>Phone Number:</strong> {userData.PhoneNumber}</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2 text-white">Attendance</h2>
          {!isLoading && (
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
          )}
        </div>
      </div>
    </div>
  );
}
