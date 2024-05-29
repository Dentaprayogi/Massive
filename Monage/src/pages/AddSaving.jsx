import React from "react";
import TambahTabungan from "../components/TambahTabungan";
import Footer2 from "../components/Footer2";
import "../css/AddSaving.css";

function AddSaving() {
  return (
    <div>   
      <TambahTabungan />
      <div className="footer-saving">
      <Footer2 />
      </div>
    </div>
  );
}

export default AddSaving;