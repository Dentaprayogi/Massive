import React from "react";
import Navbar from "../components/Navbar";
import FilterDataLaporan from "../components/FilterDataLaporan";
import LaporanTable from "../components/LaporanTable";
import Footer2 from "../components/Footer2";
import "../css/Laporan.css";

function Laporan() {
  return (
    <div>
      <Navbar />
      <div id="laporan">
        <h2>Bagaimana alokasi keuanganmu?</h2>
        <div className="laporan">
          <div className="filter-data-laporan">
            <h4>Filter Data Laporan</h4>
          </div>
          <div className="filter-table">
            <FilterDataLaporan />
            <LaporanTable />
          </div>
        </div>
      </div>
      <Footer2 />
    </div>
  );
}

export default Laporan;
