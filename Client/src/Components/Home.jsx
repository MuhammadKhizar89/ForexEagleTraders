import React from "react";
import ppp from "../assets/ppp.jpg";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
// import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-scroll'; // Import Link from react-scroll
import SocialLinks from "./SocialLinks";
import About from "./About";
import Portfolio from "./Portfolio";
import Experience from "./Experience";
import Contact from "./Contact";

import '../Styles/Banner.css';

const Home = () => {
  return (
    <>
    <div className="home  w-full bg-gradient-to-b from-black to-gray-800 sm:pt-2 ">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row">
        <div className="flex flex-col justify-center h-full">
          <h2 className="text-4xl sm:text-7xl font-bold text-white">
           Your's Forex Mentor  
           </h2>
          <p className="text-gray-500 py-4 max-w-md">
          “Join me, your Forex Mentor, as I guide you through the complexities of the market. With my expertise, I’ll empower you to navigate Forex trading confidently.”

This approach positions you as an expert while also emphasizing the supportive role you’ll play in their learning journey. It’s inviting and professional, perfect for attracting students to your course. Good luck with your course! 📈🍀          </p>
          <div>
            <div className="flex">
          <button className="group mr-2 text-white px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer hover:from-blue-500 hover:to-cyan-500">
  <Link to="contact" smooth={true} duration={1000}>
    Register Now
  </Link>
</button>
<button className="group text-white px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer hover:from-blue-500 hover:to-cyan-500">
  <a href="mentor-info" >
    Mentor Info
  </a>
</button>
</div>

          
          </div>
        </div>
        <div>
          <img src={ppp} alt="my profile" className=" mt-2 mb-3 shake rounded-2xl mx-auto w-2/3  md:w-full" />
        </div>
      </div>
    </div>
    <SocialLinks/>
    <div id="about">
        <About />
      </div>
      <div id="courses">
        <Portfolio />
      </div>
      {/* <Experience/> */}
      <Contact/>
    
    </>
  );
};

export default Home;
