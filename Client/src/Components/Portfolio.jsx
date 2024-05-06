import React from 'react';
import trading from "../assets/trading.jpeg";
import course from "../assets/course.jpg";

const Portfolio = () => {
    const portfolios = [
        {
            id: 1,
            src: course
        },
        {
            id: 2,
            src: trading
        },
        {
            id: 3,
            src: trading
        }
    ];

    return (
        <div id="courses" name="courses" className="bg-gradient-to-b from-black to-gray-800 w-full text-white md:h-screen">
            <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
                <div className="pb-8">
                    <p className="text-4xl font-bold inline border-b-4 border-gray-500">Courses</p>
                    <p className="py-6">"Unlock the secrets of Forex trading without spending a dime! Gain access to our comprehensive course for FREE and start your journey to financial freedom today. Limited time offer, don't miss out!"</p>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0">
                    {portfolios.map(({ id, src }) => (
                        <div key={id} className="max-w-xs rounded overflow-hidden shadow-lg relative">
                            <img className={`w-full ${id >= 2 ? 'filter blur-sm' : ''}`} src={src} alt="Course" />
                            {id >= 2 && (
                                <div className="absolute inset-0 flex justify-center items-center">
                                    <span className="text-white text-2xl font-bold">Coming Soon</span>
                                </div>
                            )}
                            <div className={`${id >= 2 ? 'filter blur-sm' : ''} px-6 py-4`}>
                                <div className="font-bold text-xl mb-2">“Forex Mastery: Unlocking Market Potential”</div>
                                <p className="text-gray-700 text-base">
                                    "Forex Mastery" unlocks the secrets of the forex market, providing expert strategies for success.
                                </p>
                            </div>
                            <div className={`${id >= 2 ? 'filter blur-sm' : ''} px-6 pt-4 pb-2 flex justify-between items-center`}>
                                {id >= 2 ? (
                                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed" disabled>
                                        Details
                                    </button>
                                ) : (
                                    <a href="/coursedetails" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Details
                                    </a>
                                )}
                                <span className="text-gray-500 text-sm">Free</span>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Portfolio;
