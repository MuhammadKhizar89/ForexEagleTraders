import React, { useEffect } from 'react';
import whatsappQR from "../assets/whatsappQR.jpg";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Banner() {
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Check if the auth-token is present
    const authToken = localStorage.getItem('auth-token');
    if (!authToken) {
      navigate('/'); // Redirect to the home page if auth-token is empty
    }
  }, [navigate]); // Add navigate to the dependency array

  return (
    <div className="bg-gradient-to-b from-black to-gray-800 flex justify-center items-center py-16 h-screen">
      <div className="container max-w-md mx-auto px-4 py-8 bg-[#00A884] shadow-lg rounded-lg">
        <img src={whatsappQR} alt="WhatsApp QR Code" className="mx-auto mb-6" />
        <div className="flex justify-center">
          <a href="https://chat.whatsapp.com/IE0NxOxpQwnIJKYLIyGYrF" target="_blank" rel="noopener noreferrer">
            <button className="bg-white rounded-2xl hover:bg-green-300 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Join Group
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
