import React from "react";
import { AiFillYoutube, AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact">
      <div className="contact__title">Contact</div>
      <div className="contact__message">
        Please contact me through email or social media:
      </div>
      <a className="contact__email" href="mailto: emailpapasanto@gmail.com">
        <span className="contact__email--black">Email:</span>{" "}
        EmailPapaSanto@gmail.com
      </a>
      <div className="contact__social">
        <a
          className="contact__social--youtube"
          href="https://www.youtube.com/channel/UC3b871DqOlA5tKbizv4J6mg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillYoutube />
        </a>
        <a
          className="contact__social--facebook"
          href="https://www.facebook.com/PapaSantoCodes"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
        <a
          className="contact__social--linkedin"
          href="https://www.facebook.com/PapaSantoCodes"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          className="contact__social--linkedin"
          href="https://www.linkedin.com/in/anthonyjsanto/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillTwitterCircle />
        </a>
      </div>
    </div>
  );
};

export default Contact;
