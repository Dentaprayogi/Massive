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
        <div className="summary-item-icon-total-saldo">
          <img src={TotalSaldo} alt="total saldo" />
        </div>
        <div className="summary-items">
          <p>Total Saldo:</p>
          <h2 className="total-saldo">Rp 632.000</h2>
        </div>
      </div>
      <div>
        <div className="summary-item-icon-tabungan">
          <img src={Tabungan} alt="total saldo" />
        </div>
        <div className="summary-items">
          <p>Tabungan:</p>
          <h2 className="tabungan">Rp 354.000</h2>
        </div>
      </div>
      <div>
        <div className="summary-item-icon-pemasukan">
          <img src={Pemasukan} alt="total saldo" />
        </div>
        <div className="summary-items">
          <p>Pemasukan:</p>
          <h2 className="pemasukan">Rp 592.000</h2>
        </div>
      </div>
      <div>
        <div className="summary-item-icon-pengeluaran">
          <img src={Pengeluaran} alt="total saldo" />
        </div>
        <div className="summary-items">
          <p>Pengeluaran:</p>
          <h2 className="pengeluaran">Rp 238.000</h2>
        </div>
      </div>
    </div>
  );
}

export default Summary;
