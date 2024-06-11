import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/ProfileButtons.css";

function ProfileButtons() {
  const navigate = useNavigate();

  const handlePasswordEdit = () => {
    navigate("/ubahpassword");
  };

  const handleProfileEdit = () => {
    navigate("/ubahprofil");
  };

  return (
    <div className="profile-buttons">
      <button className="profile-button" onClick={handleProfileEdit}>
        Ubah Profile
      </button>
      <button className="profile-button" onClick={handlePasswordEdit}>
        Ubah Password
      </button>
    </div>
  );
}

export default ProfileButtons;
