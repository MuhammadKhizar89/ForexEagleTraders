import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll';

const NavItem = ({ link, onClick }) => (
  <li className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200">
    <Link to="/" onClick={onClick}>{link}</Link>
  </li>
);

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('auth-token');
    setIsLoggedIn(!!authToken);
  }, []);

  const handleScrollToSection = (section) => {
    if (window.location.pathname === '/') {
      scroller.scrollTo(section, {
        duration: 1000,
        delay: 0,
        smooth: 'easeInOutQuart',
      });
    } else {
      navigate('/').then(() => {
        setTimeout(() => {
          scroller.scrollTo(section, {
            duration: 1000,
            delay: 100,
            smooth: 'easeInOutQuart',
          });
        }, 100);
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    navigate('/');
    window.location.reload();
    setIsLoggedIn(false);
  };

  return (
    <div className="flex justify-between relative items-center w-full h-20 px-4 text-white bg-black fixed">
      <div>
        <h1 className="text-xl md:text-3xl font-bold ml-2" ><a href="/">Forex Eagle Academy</a></h1>
      </div>
      <ul className={`hidden md:flex items-center ${nav ? 'hidden' : ''}`}>
        <NavItem link="Home" onClick={() => handleScrollToSection('home')} />
        <NavItem link="About" onClick={() => handleScrollToSection('about')} />
        <NavItem link="Courses" onClick={() => handleScrollToSection('courses')} />
        {isLoggedIn && (
          <li>
            <button className="group mr-2 text-white px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer hover:from-blue-500 hover:to-cyan-500">
              <a href="/myinfo">MyInfo</a>
            </button>
          </li>
        )}
        {!isLoggedIn ? (
          <li className="group mr-2 text-white px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer hover:from-blue-500 hover:to-cyan-500">
            <a href="/login">Login</a>
          </li>
        ) : (
          <li >
            <button className="group text-white px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-orange-300 to-red-600 cursor-pointer hover:from-red-600 hover:to-orange-300" onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
      <div onClick={() => setNav(!nav)} className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden">
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>
      {nav && (
        <div className="fixed z-50 top-0 left-0 w-full h-full overflow-hidden">
          <ul className="flex z-50 flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
            <li className="px-4 cursor-pointer capitalize py-6 text-4xl"><NavItem link="Home" onClick={() => {setNav(false); handleScrollToSection('home')}} /></li>
            <li className="px-4 cursor-pointer capitalize py-6 text-4xl"><NavItem  link="About" onClick={() => {setNav(false); handleScrollToSection('about')}} /></li>
            <li className="px-4 cursor-pointer capitalize py-6 text-4xl"><NavItem  link="Courses" onClick={() => {setNav(false); handleScrollToSection('courses')}} /></li>
            {/* <li className="px-4 cursor-pointer capitalize py-6 text-4xl"><NavItem link="Login" onClick={() => {setNav(false); navigate('/login')}} /></li> */}
            {isLoggedIn && (
          <li>
            <button className="group mr-2 text-white px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer hover:from-blue-500 hover:to-cyan-500">
              <a href="/myinfo">MyInfo</a>
            </button>
          </li>
        )}
        {!isLoggedIn ? (
          <li className="group mr-2 text-white px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer hover:from-blue-500 hover:to-cyan-500">
            <a href="/login">Login</a>
          </li>
        ) : (
          <li >
            <button className="group text-white px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-orange-300 to-red-600 cursor-pointer hover:from-red-600 hover:to-orange-300" onClick={handleLogout}>Logout</button>
          </li>
        )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
