import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
export default function Admin() {
    const navigate = useNavigate();
    const [attendanceData, setAttendanceData] = useState([]);
    const [filterAttendanceData, setFilterAttendanceData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        const e = localStorage.getItem('admin_email');
        if (e !== "forexeaglestraders@gmail.com") {
            navigate('/');
        } else {
            fetchAttendanceData();
        }
    }, []);

    const fetchAttendanceData = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/Admin/allattendance`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                }
            });
            const data = await response.json();
            setAttendanceData(data);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    function handleDateChange(e) {
        const date = e.target.value;
        setSelectedDate(date);
        const filteredData = attendanceData.filter((item) => {
            const itemDate = new Date(item.Date).toISOString().split('T')[0];
            const selectedDate = new Date(date).toISOString().split('T')[0];
            if (itemDate === selectedDate) {
                return item;
            }
        });
        setFilterAttendanceData(filteredData);
    }

    const handleStatusUpdate = async (studentID, date, currentStatus) => {
      const newStatus = currentStatus === 'P' ? 'A' : 'P';
      const token = localStorage.getItem('auth-token');
      try {
          const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/Admin/markAttendance`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'auth-token': token
              },
              body: JSON.stringify({
                  attendanceData: [
                      {
                          id: studentID,
                          date: date,
                          status: newStatus
                      }
                  ]
              })
          });
          if (!response.ok) {
              throw new Error('Failed to update attendance');
          }
          const updatedAttendanceData = attendanceData.map(student => {
              if (student.StudentID === studentID && new Date(student.Date).toISOString().split('T')[0] === date) {
                  return { ...student, Status: newStatus };
              }
              return student;
          });
          setAttendanceData(updatedAttendanceData);
  
          // Update filterAttendanceData based on selectedDate and updatedAttendanceData
          const filteredData = updatedAttendanceData.filter(item => {
              const itemDate = new Date(item.Date).toISOString().split('T')[0];
              return itemDate === selectedDate;
          });
          setFilterAttendanceData(filteredData);
      } catch (error) {
          console.error('Error updating attendance:', error);
      }
  };
  const handleGenerateAttendance = async () => {
    try {
        const token = localStorage.getItem('auth-token');
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/Admin/attendanceGenerator`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        });
        if (!response.ok) {
            throw new Error('Failed to generate attendance');
        }
        const responseData = await response.json(); // Parse response JSON
        
        if (responseData === "No attendance to insert") {
            setErrorMessage('Attendance has already been generated for today.');
            setErrorModalVisible(true);  
        } else {
            // Attendance generated successfully
            // Update the attendance data state with the new data
            setAttendanceData(responseData);

            setFilterAttendanceData(responseData);
        }
    } catch (error) {
        console.error('Error generating attendance:', error);
        setErrorMessage('Attendance has already been generated for today.');
        setErrorModalVisible(true);
    }
};

  const handleCloseErrorModal = () => {
      setErrorModalVisible(false);
  };
    
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Students Attendance</h2>
                <div className={`hidden md:flex ${isMenuOpen ? 'hidden' : ''} `}>
                <button onClick={handleGenerateAttendance} className="group mr-2 text-white px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer hover:from-blue-500 hover:to-cyan-500">
                        Generate Todays' Attendance
                    </button>
                <input type="date" onChange={handleDateChange} className="group mr-2 text-white px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer hover:from-blue-500 hover:to-cyan-500" />
                </div>
                <div className="flex flex-col items-center md:hidden">
                    <button className="btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  <FaBars size={30} />
                    </button>
                    {isMenuOpen && (
                        <div className="ml-4  ">
                               <button onClick={handleGenerateAttendance} className="group mr-2 text-white px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer hover:from-blue-500 hover:to-cyan-500">
                                Generate Todays' Attendance
                            </button>
                <input type="date" onChange={handleDateChange} className="group mr-2 text-white px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer hover:from-blue-500 hover:to-cyan-500" />
                        </div>
                    )}
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="w-full h-16 border-gray-300 border-b py-8">
                            <th className="text-left pl-8 pr-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                RollNo
                            </th>
                            <th className="text-left pl-6 pr-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="text-left pl-6 pr-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {selectedDate}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-300">
                        {filterAttendanceData.map(student => (
                            <tr key={student.StudentID} className="h-12">
                                <td className="pl-8 pr-6 whitespace-nowrap">{student.StudentID}</td>
                                <td className="pl-6 pr-6 whitespace-nowrap">{student.StudentName}</td>
                                <td className="pl-6 pr-6 whitespace-nowrap" onClick={() => handleStatusUpdate(student.StudentID, selectedDate, student.Status)}>
                                    <div className="text-center">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${student.Status === 'P' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {student.Status}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {errorModalVisible && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Error</h3>
                        <p>{errorMessage}</p>
                        <button onClick={handleCloseErrorModal} className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
