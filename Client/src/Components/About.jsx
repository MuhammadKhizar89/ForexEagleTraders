import React from "react";

const About = () => {
  
  return (
    <div
    id="about"
      name="about"
      className="w-full  bg-gradient-to-b from-gray-800 pt-5 to-black text-white"
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            About
          </p>
        </div>
        <p className="text-xl mt-20">
        “At Forex Eagles Academy, we soar above the complexities of the forex market to guide aspiring traders to new heights of success. Led by Arslan Bin Basharat, a seasoned trader and mentor, our academy is dedicated to providing comprehensive education and mentorship to individuals seeking to master the art of forex trading. With a personalized approach and a comprehensive curriculum, we’re your trusted partner on the journey to financial independence.”        </p>
        <br />
<div class="space-y-2">
  <p class="font-bold text-base mb-2">Expertise: Our team consists of knowledgeable professionals who are dedicated to staying ahead of market trends and developments.</p>
  <p class="font-bold text-base mb-2">Personalized Approach: We understand that every trader is unique. That’s why we offer tailored strategies and support to meet your specific needs and objectives.</p>
  <p class="font-bold text-base mb-2">Transparency: Trust is essential in the world of trading. That’s why we prioritize transparency in all our dealings, ensuring you have access to accurate information and real-time updates.</p>
  <p class="font-bold text-base mb-2">Community: Join our thriving community of traders to share insights, strategies, and experiences. Together, we can learn and grow as we navigate the forex market.</p>
 
</div>

        <br />
      </div>
    </div>
  );
};

export default About;
