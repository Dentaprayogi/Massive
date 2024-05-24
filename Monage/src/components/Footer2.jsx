import React from "react";
import "../css/Footer2.css";
import linkedin from "../assets/Linkedin.png";
import facebook from "../assets/Facebook.png";
import twitter from "../assets/Twitter.png";
import logo from "../assets/logo monage.png";

function Footer2() {
  return (
    <footer className="footer2">
      <div className="copyright">
        <p>Copyright © 2024 All Rights Reserved</p>
      </div>
      <div className="footer2-sosial">
        <div className="footer2-logo-sosial">
          <ul>
            <li>
              <img src={linkedin} alt="linkedin" />
            </li>
            <li>
              <img src={facebook} alt="facebook" />
            </li>
            <li>
              <img src={twitter} alt="twitter" />
            </li>
          </ul>
        </div>
        <div className="footer2-logo">
          <img src={logo} alt="logo" />
        </div>
      </div>
    </footer>
  );
}

export default Footer2;
