import React from 'react';
import mentorPic from '../assets/pp.jpg'; // Replace with the path to your mentor's picture
import burj from '../assets/burj.jpg';
import learn from '../assets/learn.jpg';
export default function MentorInfo() {
  return (
    <>
    <div className="bg-gradient-to-b from-black to-gray-800 text-white w-full h-screen">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row">
        <div className="flex flex-col justify-center h-full">
          <h2 className="text-4xl sm:text-7xl font-bold">
            I am Arslan Bin Basharat
          </h2>
          <p className="text-gray-500 py-4 max-w-md">
          "Embark on a journey with me into the world of Forex trading. With over a decade of experience, I'll be your guide through the market's twists and turns. Together, we'll navigate with confidence and unlock the potential of Forex trading, step by step."          </p>
          <div>
           
          </div>
        </div>
        <div>
          <img src={mentorPic} alt="Mentor" className="rounded-2xl mb-2 mx-auto w-2/3 md:w-full" />
        </div>
      </div>
      
    </div>
    
    <div className="bg-gradient-to-b from-gray-800 to-black text-white w-full h-screen">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row">
        <div className="md:w-1/3">
          <img src={burj} alt="Mentor" className="rounded-2xl mx-auto mb-2 w-2/3 md:w-full" />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h2 className="text-4xl sm:text-7xl font-bold">
            Trading = $
          </h2>
          <p className="text-gray-500 py-4 max-w-md">
          "Trading has not only been my passion but also my pathway to financial independence. Through years of experience in the forex market, I've discovered its potential to empower individuals financially. Join me in exploring this avenue, and together, let's pave the way to your financial independence through trading."          </p>
          {/* Add any additional buttons or links here */}
        </div>
      </div>
    </div>
    
    <div className="bg-gradient-to-b from-black to-gray-800 text-white w-full h-screen">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row">
        <div className="flex flex-col justify-center  mr-5">
          <h2 className="text-4xl sm:text-7xl font-bold">
          Learn=Earn
          </h2>
          <p className="text-gray-500 py-4 max-w-md">
         I'm here to share my expertise with you, and the best part? It's all free. Let's dive into this course together, unlocking the secrets of forex trading without any cost. Join me on this journey to mastering the forex market, completely free of charge.
          </p>          <div>
           
          </div>
        </div>
        <div>
          <img src={learn} alt="Mentor" className="rounded-2xl mx-auto mb-2 w-2/3 md:w-full" />
        </div>
      </div>
      
    </div>
 
      
  
</>
  );
}
