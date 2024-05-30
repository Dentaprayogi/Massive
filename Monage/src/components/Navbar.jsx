import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css";
import Profile from "../assets/user.png";
import logo from "../assets/logo monage.png";

function Navbar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <nav className="nav">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
      </div>
      <ul className="nav-links">
        <li>
          <Link
            to="/dashboard"
            className={activeLink === "/dashboard" ? "active" : ""}
            onClick={() => handleLinkClick("/dashboard")}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/transaction"
            className={activeLink === "/transaction" ? "active" : ""}
            onClick={() => handleLinkClick("/transaction")}
          >
            Transaksi
          </Link>
        </li>
        <li>
          <Link
            to="/anggarankosong"
            className={activeLink === "/anggarankosong" ? "active" : ""}
            onClick={() => handleLinkClick("/anggarankosong")}
            // className={activeLink === "/laporananggaran" ? "active" : ""}
            // onClick={() => handleLinkClick("/laporananggaran")}
          >
            Anggaran
          </Link>
        </li>
        <li>
          <Link
            to="/laporan"
            className={activeLink === "/laporan" ? "active" : ""}
            onClick={() => handleLinkClick("/laporan")}
          >
            Laporan
          </Link>
        </li>
      </ul>
      <div className="nav-profile">
        <Link to="/ubahprofil">
          <img src={Profile} alt="profile" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
