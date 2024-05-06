import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
export default function Contact() {
  const authToken = localStorage.getItem('auth-token');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    // Name validation
    if (!formData.name) {
      formIsValid = false;
      errors['name'] = 'Name is required';
    }

    // Email validation
    if (!formData.email) {
      formIsValid = false;
      errors['email'] = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      errors['email'] = 'Email is not valid';
    }

    // Phone number validation
    if (!formData.phoneNumber) {
      formIsValid = false;
      errors['phoneNumber'] = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      formIsValid = false;
      errors['phoneNumber'] = 'Phone number is not valid';
    }

    // Password validation
    if (!formData.password) {
      formIsValid = false;
      errors['password'] = 'Password is required';
    } else if (formData.password.length < 6) {
      formIsValid = false;
      errors['password'] = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      formIsValid = false;
      errors['confirmPassword'] = 'Passwords do not match';
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent the default form submit action

  if (validateForm()) { // Assuming you have a validation function
    try {
      // Send a POST request to your API endpoint with the form data
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/Student/register`, {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password
      });

      // Handle the response from the API
      console.log('Data stored successfully:', response.data);
      localStorage.setItem('auth-token', response.data.token);
      navigate('/banner'); // Use navigate to redirect
      // You can clear the form or redirect the user after successful registration
    } catch (error) {
    
      console.error('Error storing data:', error);
    }
  }
};

  
  return (
    <>
      <div id="contact" className="bg-gradient-to-b from-gray-800 to-black w-full  py-16">  
        <div className="max-w-md mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-6">Register Now</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name && 'border-red-500'}`}
                placeholder="Your Name"
              />
              {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email && 'border-red-500'}`}
                placeholder="Your Email"
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password && 'border-red-500'}`}
                placeholder="Your Password"
              />
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.confirmPassword && 'border-red-500'}`}
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">Phone Number</label>
              <input
                id="phoneNumber"
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phoneNumber && 'border-red-500'}`}
                placeholder="Your Phone Number"
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>}
            </div>
          
            <div className="flex justify-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>

<div className='md:hidden'>
  <hr />
<footer className="bg-black text-white py-4">
  <div className="container mx-auto flex justify-center items-center">
    <a href="https://www.linkedin.com/in/arslan-basharat-785a62307/" target="_blank" rel="noopener noreferrer" className="mr-4">
      LinkedIn <FaLinkedin className="ml-1" size={30} />
    </a>
    {authToken &&  <a href="/banner" className="mr-4">
      Whatsapp <FaWhatsapp className="ml-1" size={30} />
  </a>}
    <a href="mailto:forexeaglestraders@gmail.com" className="mr-4">
      Mail <HiOutlineMail className="ml-1" size={30} />
    </a>
  </div>
</footer>
</div>




    </>
  );
  
}