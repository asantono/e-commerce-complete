import React from "react";

const About = () => {
  return (
    <div className="about">
      <div className="about__title">About</div>
      <div className="about__message">
        Thank you for viewing my e-commerce application I have developed this
        app as part of my personal resume, and as a teaching tool for my YouTube
        programming channel. A link to the Repository and the youTube course can
        be found below:
        <div className="about__message--tech">
          Tech Stack: React, Node, Express, MongoDB, SCSS, CSS
        </div>
        <div className="about__message--link">
          <a
            href="https://github.com/asantono/e-commerce"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="about__message--link--black">Repository:</span>{" "}
            Application Repository
          </a>
        </div>
        <div className="about__message--link">
          <a
            href="https://youtube.com/playlist?list=PL_kocBMOO_TxyQvK_u2AaCEwo4A59TTtN"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact__email--black">YouTube Course:</span>{" "}
            Course Playlist
          </a>
        </div>
      </div>
      <div className="about__features">
        <div className="about__features--title">Features</div>
        <ul className="about__features--list">
          <li>Stripe Payment Integration</li>
          <li>Redux & Redux Thunk</li>
          <li>React Custom Hooks</li>
          <li>Front-End & Back-End Form Validation</li>
          <li>JWT Stateless Authentication</li>
          <li>Password Reset Ability</li>
          <li>Type-To-Search Search Bar</li>
          <li>Admin Orders Search with Refund Ability</li>
          <li>Nodemailer Integration with SendGrid</li>
          <li>Amazon S3 For Image C.R.U.D.</li>
          <li>Shopping Cart Logic</li>
          <li>React Custom Hooks</li>
          <li>Image Uploads with DropZone</li>
          <li>Alert System with UUID/v4</li>
          <li>Date Displays with Moment</li>
          <li>Responsive Design</li>
          <li>Custom Slider Component</li>
          <li>Custom Sticky Call To Action Component</li>
          <li>Custom Image Overlay Components</li>
          <li>Custom Card Components</li>
          <li>Custom Shopping Cart Component</li>
          <li>Async Behaivor & Loading Screen</li>
          <li>Implemented React Spinners & React Icons</li>
          <li>Styled with SCSS</li>
        </ul>
      </div>

      <div className="about__instructions">
        <div className="about__features--title">Using the Site</div>
        <div className="about__instructions--message">
          You can search courses and interact with the shopping cart without
          creating an account. In order to, create courses, make purchases and
          more, you must create an account.
          <div className="about__instructions--message--break">
            All transactions are in test mode. I suggest using a test credit
            card to make any purchases. They will be supplied to you in the
            welcome email.
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
