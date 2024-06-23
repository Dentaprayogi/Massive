import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/HeaderDashboard.css";

function HeaderDashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token);

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

        console.log("Response from /api/userprofil:", response.data);

        if (response.status !== 200) {
          throw new Error(
            `Gagal mengambil data pengguna: ${response.statusText}`
          );
        }

        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    fetchUserProfile();
  }, []);

  // Fungsi untuk mendapatkan tanggal UTC saat ini dalam format yang diinginkan
  const getCurrentDateUTC = () => {
    const now = new Date();
    const options = {
      timeZone: "UTC",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return now.toLocaleDateString("en-US", options); // 'en-US' untuk format bahasa Inggris
  };

  return (
    <header className="header-dashboard">
      <h1>
        Selamat datang{" "}
        {userData
          ? `${userData.nama_depan || "Pengguna"} ${
              userData.nama_belakang || ""
            }`
          : "Pengguna"}
      </h1>
      <p>Ringkasan keuangan</p>
      <div className="header-dashboard-date">
        <p>{getCurrentDateUTC()}</p>
      </div>
    </header>
  );
}

export default HeaderDashboard;
