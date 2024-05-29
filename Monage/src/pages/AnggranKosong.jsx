import React from "react";
import Navbar from "../components/Navbar";
import AturAnggaran from "../components/AturAnggaran";
import Footer2 from "../components/Footer2";
import "../css/AnggaranKosong.css";

function AnggaranKosong() {
  return (
    <div>
      <Navbar />
      <div className="posisi-center">
        <AturAnggaran />
      </div>
      <Footer2 />
    </div>
  );
}

export default AnggaranKosong;
