import React from 'react';
// If using React Router, import Link
// import { Link } from 'react-router-dom';

export default function CourseDetails() {
  return (
    <div className="bg-gradient-to-b from-black to-gray-800 text-white mx-auto h-auto shadow-lg  overflow-hidden">
      <div className=" m-10 flex flex-col px-6 py-4 container mt-[80px]">
        <h2 className="text-4xl font-bold mb-2 border-b-4 border-gray-500">Forex Mastery: Unlocking Market Potential</h2>
        <p className="text-xl mt-20">This course is designed to provide you with a comprehensive understanding of the forex market and equip you with the skills necessary to navigate it effectively.</p>
      </div>
      <div className="m-10  px-6 pt-4 pb-2 space-y-2">
        <h3 className="text-2xl font-bold mb-2">Course Overview:</h3>
        <ul className="list-disc list-inside text-base">
          <li><strong>Understanding Forex Markets:</strong> Grasp the basics of currency trading and market dynamics.</li>
          <li><strong>Technical Analysis:</strong> Learn to read charts, identify trends, and make predictions based on historical data.</li>
          <li><strong>Fundamental Analysis:</strong> Dive into economic indicators and news events that can impact currency values.</li>
          <li><strong>Risk Management:</strong> Develop strategies to manage and mitigate risks associated with Forex trading.</li>
          <li><strong>Trading Psychology:</strong> Understand the psychological aspects of trading and how to maintain discipline.</li>
          <li><strong>Practical Trading:</strong> Apply your knowledge in simulated trading scenarios before going live.</li>
        </ul>
        <p className="text-base">Your mentor, Arslan Bin Basharat, is a seasoned trader with years of experience in the forex market. He is committed to providing you with the insights and tools necessary to become a proficient Forex trader.</p>
        <p className="font-semibold">Format: Live course with interactive sessions</p>
        <p className="font-semibold">Support: Dedicated support sessions available</p>
        <div className="pt-6">
          <h3 className="text-2xl font-bold mb-2">Your Mentor:</h3>
          <p className="text-lg">Arslan Bin Basharat brings a wealth of knowledge and experience to the course, having navigated the forex market successfully for over a decade. His teaching style is engaging and focused on practical application, ensuring that you gain not only the theoretical knowledge but also the confidence to apply it in real-world trading.</p>
          {/* If not using React Router, replace 'Link' with 'a' and 'to' with 'href' */}
          <div className="mt-4">
            <a href="/mentor-info" className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
              View Mentor Info
            </a>
            {/* If using React Router */}
            {/* <Link to="/mentor-info" className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
              View Mentor Info
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
