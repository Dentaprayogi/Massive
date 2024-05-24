import React from "react";
import "../css/HeaderDashboard.css";

function HeaderDashboard() {
  return (
    <header className="header-dashboard">
      <h1>Selamat datang User</h1>
      <p>Ringkasan keuangan</p>
      <div className="header-dashboard-date">
        <p>Rabu, 08 Mei 2024</p>
      </div>
    </header>
  );
}

export default HeaderDashboard;
