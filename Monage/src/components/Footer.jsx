import React from "react";
import linkedin from "../assets/Linkedin.png";
import facebook from "../assets/Facebook.png";
import twitter from "../assets/Twitter.png";
import logo from "../assets/logo monage.png";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer">
        <div className="main">
          <ul>
            <li>
              <h4>Main</h4>
            </li>
            <li>
              <p>Home</p>
            </li>
            <li>
              <p>Features</p>
            </li>
            <li>
              <p>Contact</p>
            </li>
          </ul>
          <ul>
            <li>
              <h4>Others</h4>
            </li>
            <li>
              <p>FAQ</p>
            </li>
            <li>
              <p>Blog</p>
            </li>
            <li>
              <p>Documents</p>
            </li>
          </ul>
          <ul>
            <li>
              <h4>About</h4>
            </li>
            <li>
              <p>Platform yang dilengkapi dengan</p>
              <p>fitur menarik yang dapat</p>
              <p>mempermudah user untuk</p>
              <p>mengelola keuangannya</p>
            </li>
          </ul>
        </div>
        <div className="logo">
          <div className="logo-sosial">
            <ul>
              <li>
                <img src={linkedin} alt="linkedin" />
              </li>
              <li>
                <img src={facebook} alt="facebok" />
              </li>
              <li>
                <img src={twitter} alt="twitter" />
              </li>
            </ul>
          </div>
          <div className="logo-monage">
            <img src={logo} alt="logo" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
