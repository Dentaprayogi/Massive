import React from 'react';
import { FaUtensils, FaShoppingCart, FaPlusCircle } from 'react-icons/fa';
import '../css/LaporanAnggaran.css';
import { useNavigate } from "react-router-dom";

function LaporanAnggaran() {
  const navigate = useNavigate();

  const handleTambahAnggaran = () => {
    navigate("/tambahanggaran");
  };

  return (
    <div className="container">
      <main>
        <h2>Atur Anggaran</h2>
        <section className="summary">
          <div className="summary-item">
            <h3>Total Saldo Pemakaian</h3>
            <p className="amount">Rp. 1.220.000</p>
            <span>Mei 2024</span>
          </div>
          <div className="summary-item">
            <h3>Total Saldo Anggaran</h3>
            <p className="amount">Rp. 1.250.000</p>
            <span>Mei 2024</span>
          </div>
        </section>
        <section className="budget">
          <BudgetItem
            icon={<FaUtensils />}
            title="Makan dan Minum"
            used="Rp. 55.000"
            budget="Rp. 750.000"
            remaining="Rp. 695.000"
            percentage={7}
          />
          <BudgetItem
            icon={<FaShoppingCart />}
            title="Belanja"
            used="Rp. 150.000"
            budget="Rp. 750.000"
            remaining="Rp. 600.000"
            percentage={20}
          />
        </section>
        <button className="add-button">
          <FaPlusCircle size={32} onClick={handleTambahAnggaran} />
        </button>
      </main>
    </div>
  );
}

function BudgetItem({ icon, title, used, budget, remaining, percentage }) {
  return (
    <div className="budget-item">
      <div className="budget-header">
        <div className="icon-title">
          {icon}
          <div>
            <h3>{title}</h3>
            <span>Bulanan . Mei 2024</span>
          </div>
        </div>
        <div className="budget-info">
          <div>
            <p>Anggaran</p>
            <span>{budget}</span>
          </div>
          <div>
            <p>Sisa</p>
            <span>{remaining}</span>
          </div>
        </div>
      </div>
      <div className="budget-content">
        <div className="used">
          <p>Terpakai</p>
          <span>{used}</span>
        </div>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
    </div>
  );
}

export default LaporanAnggaran;
