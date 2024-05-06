import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 
export default function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });


  const [loginErrors, setLoginErrors] = useState({});
  const navigate = useNavigate();

  const validateLogin = () => {
    let isValid = true;
    let errors = {};

    // Email validation
    if (!loginData.email) {
      isValid = false;
      errors['email'] = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      isValid = false;
      errors['email'] = 'Email is not valid';
    }

    // Password validation
    if (!loginData.password) {
      isValid = false;
      errors['password'] = 'Password is required';
    }

    setLoginErrors(errors);
    return isValid;
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (validateLogin()) {
      try {
        // Replace with your login API endpoint
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/Student/login`, loginData);
        console.log('Login successful:', response.data);
        localStorage.setItem('auth-token', response.data.token);
        localStorage.setItem('admin_email', response.data.user.Email);
        if (response.data.user.Email === "forexeaglestraders@gmail.com") {
         console.log("admin");
          navigate('/admin'); // Use navigate to redirect
        window.location.reload();
        }
        else {
          console.log("user");
          navigate('/myinfo'); // Use navigate to redirect
        window.location.reload();

        } 
        // Redirect to home page or dashboard after successful login
      } catch (error) {
        console.error('Login error:', error);
        // Handle login errors (e.g., wrong credentials)
      }
    }
  };

  return (
    <>
      <div id="login" className="bg-gradient-to-b from-black to-gray-800  flex justify-center items-center py-16 h-screen">
        <div className="container max-w-md mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
          <h2 className=" text-3xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${loginErrors.email && 'border-red-500'}`}
                placeholder="Your Email"
              />
              {loginErrors.email && <p className="text-red-500 text-xs italic">{loginErrors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${loginErrors.password && 'border-red-500'}`}
                placeholder="Your Password"
              />
              {loginErrors.password && <p className="text-red-500 text-xs italic">{loginErrors.password}</p>}
            </div>
            <div className="flex justify-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
