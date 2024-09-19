import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { AiOutlineInstagram } from "react-icons/ai";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
} from "react-icons/ti";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <h2>Get started with Trello today</h2>
        <form>
          <div>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
            />
            <Link to="/signup">
              <button className="btn btn-primary">Sign up - it's free!</button>
            </Link>
          </div>
        </form>
      </div>
      <div className="footer-row">
        <div className="footer-img">
          <img
            src="https://nimaworks.com/sites/default/files/products/titles/trello-logo-gradient-blue-attribution_rgb%402x%20%281%29.png"
            alt="trello-logo"
            width="100"
          />
        </div>
        <div className="footer-content">
          <p>About Trello</p>
          <small>What's behind the boards</small>
        </div>
        <div className="footer-content">
          <p>Jobs</p>
          <small>Learn about open roles on the Trello team.</small>
        </div>
        <div className="footer-content">
          <p>Apps</p>
          <small>
            Download the Trello App for your Desktop or Mobile devices.
          </small>
        </div>
        <div className="footer-content">
          <p>Contact us</p>
          <small>Need anything? Get in touch and we can help.</small>
        </div>
      </div>

      <hr />

      <div className="social-icons">
        <AiOutlineInstagram className="instagram" />
        <TiSocialFacebook className="facebook" />
        <TiSocialLinkedin className="linkedin" />
        <TiSocialTwitter className="twitter" />
        <TiSocialYoutube className="youtube" />
      </div>
    </>
  );
};

export default Footer;
