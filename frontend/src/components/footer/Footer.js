import React from "react";
import logo from "../../imgs/logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__page-break" />
      <div className="footer__top">
        <Link className="footer__top--link" to="/">
          Home
        </Link>
        <Link className="footer__top--link" to="/allcourses">
          Courses
        </Link>
        <Link className="footer__top--link" to="/contact">
          Contact
        </Link>
        <Link className="footer__top--link" to="about">
          About
        </Link>
      </div>
      <div className="footer__lowest">
        <img
          className="footer__lowest--logo"
          src={logo}
          alt="lower=footer-logo"
        />
        <div className="footer__lowest--copyright">
          &#169; Anthony 'Papa' Santo
        </div>
      </div>
    </div>
  );
};

export default Footer;
