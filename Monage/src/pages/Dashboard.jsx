import React from "react";
import Navbar from "../components/Navbar";
import HeaderDashboard from "../components/HeaderDashboard";
import Summary from "../components/Summary";
import Footer2 from "../components/Footer2";
import Pengingat from "../components/Pengingat";
import TransaksiTerbaru from "../components/TransaksiTerbaru";
import AnggaranKamu from "../components/AnggaranKamu";

function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <HeaderDashboard />
      <Summary />
      <Pengingat />
      <TransaksiTerbaru />
      <AnggaranKamu />
      <Footer2 />
    </div>
  );
}

export default Dashboard;
