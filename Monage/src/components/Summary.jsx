import React from "react";
import "../css/Summary.css";
import TotalSaldo from "../assets/total saldo.png";
import Tabungan from "../assets/tabungan.png";
import Pemasukan from "../assets/pemasukan.png";
import Pengeluaran from "../assets/pengeluaran.png";

function Summary() {
  return (
    <div className="summary">
      <div>
        <div className="summary-item">
          <img src={TotalSaldo} alt="total saldo" />
        </div>
        <div className="summary-item-total-saldo">
          <p>Total Saldo:</p>
          <h2>Rp 632.000</h2>
        </div>
      </div>
      <div>
        <div className="summary-item">
          <img src={Tabungan} alt="total saldo" />
        </div>
        <div className="summary-item-tabungan">
          <p>Tabungan:</p>
          <h2>Rp 354.000</h2>
        </div>
      </div>
      <div>
        <div className="summary-item">
          <img src={Pemasukan} alt="total saldo" />
        </div>
        <div className="summary-item-pemasukan">
          <p>Pemasukan:</p>
          <h2>Rp 592.000</h2>
        </div>
      </div>
      <div>
        <div className="summary-item">
          <img src={Pengeluaran} alt="total saldo" />
        </div>
        <div className="summary-item-pengeluaran">
          <p>Pengeluaran:</p>
          <h2>Rp 238.000</h2>
        </div>
      </div>
    </div>
  );
}

export default Summary;
