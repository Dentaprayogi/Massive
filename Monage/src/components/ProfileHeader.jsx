import React from "react";
import { useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png";
import "../css/ProfileHeader.css";

function ProfileHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="profile-header">
      <img src={userIcon} alt="User" className="profile-image" />
      <div className="profile-info">
        <h2>Nama user</h2>
        <p>email</p>
      </div>
      <button className="log-out-button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

export default ProfileHeader;
