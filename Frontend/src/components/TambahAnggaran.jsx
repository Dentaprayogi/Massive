import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/TambahAnggaran.css";

const TambahAnggaran = ({ onClose }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const predefinedCategories = [
    { name: "Makan dan Minum", type: "Kategori Umum" },
    { name: "Belanja", type: "Kategori Umum" },
    { name: "Bensin", type: "Kategori Umum" },
    { name: "Transportasi", type: "Kategori Umum" },
    { name: "Tagihan", type: "Kategori Pribadi" },
    { name: "Peliharaan", type: "Kategori Pribadi" },
    { name: "Kesehatan", type: "Kategori Pribadi" },
    { name: "Pengeluaran lainnya", type: "Kategori Pribadi" },
  ];

  const [showCategoryOverlay, setShowCategoryOverlay] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleBack = () => {
    navigate("/laporananggaran");
  };

  const handleSave = () => {
    // Logika penyimpanan anggaran
    console.log({
      amount,
      category: selectedCategory, // Use selectedCategory instead of category
      startDate,
      endDate,
    });
    navigate("/laporananggaran");
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowCategoryOverlay(false);
  };

  return (
    <div id="tambah-anggaran">
      <div className="tambah-anggaran-form-container">
        <h2>Tambah Anggaran</h2>
        <button className="tambah-anggaran-close-button" onClick={handleBack}>
          ✕
        </button>
        <div className="tambah-anggaran-form-group">
          <label>Jumlah anggaran</label>
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
            value={selectedCategory}
            readOnly
            onClick={() => setShowCategoryOverlay(true)}
            className="tambah-anggaran-form-input"
          />
        </div>
        <div className="tambah-anggaran-form-group">
          <label>Tanggal Mulai</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="tambah-anggaran-form-input"
          />
        </div>
        <div className="tambah-anggaran-form-group">
          <label>Tanggal Berakhir</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="tambah-anggaran-form-input"
          />
        </div>
        <button onClick={handleSave} className="tambah-anggaran-form-button">
          Simpan
        </button>
      </div>

      {/* Overlay */}
      {showCategoryOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <div className="overlay-header">
              <h3>Pilih Kategori</h3>
              <button onClick={() => setShowCategoryOverlay(false)}>X</button>
            </div>
            <div className="search-bar">
              <input type="text" placeholder="Search" />{" "}
              {/* Search bar not implemented yet */}
            </div>
            <div className="category-list">
              {predefinedCategories.map((category) => (
                <div
                  key={category.name}
                  className="category-item"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TambahAnggaran;
