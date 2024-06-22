import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userIcon from "../assets/user.png";
import "../css/ProfileHeader.css";

function ProfileHeader() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error(
            "Token tidak ditemukan. Harap login terlebih dahulu."
          );
        }

        const config = {
          headers: {
            Authorization: `${token}`,
          },
        };

        const response = await axios.get(
          "http://localhost:3000/api/userprofil",
          config
        );

        if (response.status !== 200) {
          throw new Error(
            `Gagal mengambil data pengguna: ${response.statusText}`
          );
        }

        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
        // Handle error (redirect to login, show error message, etc.)
        navigate("/"); // Redirect to login page if token is missing or invalid
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="profile-header">
      <img src={userIcon} alt="User" className="profile-image" />
      <div className="profile-info">
        <h2>
          {userData
            ? `${userData.nama_depan} ${userData.nama_belakang}`
            : "Nama User"}
        </h2>
        <p>email: {userData ? userData.email : "Email"}</p>
      </div>
      <button className="log-out-button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

export default ProfileHeader;
