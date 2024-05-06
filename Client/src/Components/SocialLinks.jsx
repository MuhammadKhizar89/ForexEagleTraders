import React from 'react';
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const SocialLinks = () => {
  const authToken = localStorage.getItem('auth-token');

  const links = [
    {
      id: 1,
      child: (
        <>
          LinkedIn <FaLinkedin size={30} />
        </>
      ),
      href: 'https://www.linkedin.com/in/arslan-basharat-785a62307/',
      style: 'rounded-tr-md'
    },
    // Conditional inclusion of WhatsApp link based on the presence of auth-token
    authToken && {
      id: 2,
      child: (
        <>
          Whatsapp <FaWhatsapp size={30} />
        </>
      ),
      href: '/banner', 
      style: 'rounded-tr-md'
    },
    {
      id: 3,
      child: (
        <>
          Mail <HiOutlineMail size={30} />
        </>
      ),
      href: "mailto:forexeaglestraders@gmail.com",
      style: 'rounded-tr-md'
    }
  ].filter(Boolean); // Filter out falsy values (e.g., if authToken is false, it won't include the WhatsApp link)

  return (
    <div className="hidden lg:flex flex-col top-[35%] left-0 fixed">
      <ul>
        {links.map(({ id, child, href, style }) => (
          <li
            key={id}
            className={
              "flex justify-between mb-1 items-center w-40 h-14 px-4 ml-[-100px] hover:ml-[-10px] hover:rounded-md duration-300 bg-gray-500 " +
              style
            }
          >
            <a
              href={href}
              className="flex justify-between items-center w-full text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              {child}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinks;
