import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/TambahAnggaran.css";

const TambahAnggaran = ({ onClose }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [budgetType, setBudgetType] = useState("");
  const [month, setMonth] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/laporananggaran");
  };

  const handleSave = () => {
    // Logika penyimpanan anggaran
    console.log({
      amount,
      category,
      budgetType,
      month,
    });
    navigate("/laporananggaran");
  };

  return (
    <div id="tambah-anggaran">
      <div className="tambah-anggaran-form-container">
        <h2>Tambah Anggaran</h2>
        <button className="tambah-anggaran-close-button" onClick={handleBack}>
          ✕
        </button>
        <div className="tambah-anggaran-form-group">
          <label>Berapa anggaran kamu</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="tambah-anggaran-form-input"
          />
        </div>
        <div className="tambah-anggaran-form-group">
          <label>Kategori</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="tambah-anggaran-form-input"
          />
        </div>
        <div className="tambah-anggaran-form-group">
          <label>Jenis Anggaran</label>
          <select
            value={budgetType}
            onChange={(e) => setBudgetType(e.target.value)}
            className="tambah-anggaran-form-input"
          >
            <option value="Harian">Harian</option>
            <option value="Mingguan">Mingguan</option>
            <option value="Bulanan">Bulanan</option>
            <option value="Tahunan">Tahunan</option>
          </select>
        </div>
        <div className="tambah-anggaran-form-group">
          <label>Pilih Bulan</label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="tambah-anggaran-form-input"
          />
        </div>
        <button onClick={handleSave} className="tambah-anggaran-form-button">
          Simpan
        </button>
      </div>
    </div>
  );
};

export default TambahAnggaran;
