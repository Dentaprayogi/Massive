import React, { useState } from "react";
import "../css/TambahPengeluaran.css";
import { useNavigate } from "react-router-dom";

function TambahPengeluaran() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/transaction");
  };

  const handlePemasukan = () => {
    navigate("/addincome");
  };

  const handleTabungan = () => {
    navigate("/addsaving");
  };

  const categories = [
    { name: "Makan dan Minum", type: "Kategori Umum" },
    { name: "Belanja", type: "Kategori Umum" },
    { name: "Bensin", type: "Kategori Umum" },
    { name: "Transportasi", type: "Kategori Umum" },
    { name: "Tagihan", type: "Kategori Pribadi" },
    { name: "Peliharaan", type: "Kategori Pribadi" },
    { name: "Kesehatan", type: "Kategori Pribadi" },
    { name: "Pengeluaran lainnya", type: "Kategori Pribadi" },
  ];

  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [sumberkeuangan, setSumberKeuangan] = useState("");
  const [showCategoryOverlay, setShowCategoryOverlay] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(null);

  // Function to convert date format from yyyy-mm-dd to MM-dd-yyyy
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${month}-${day}-${year}`;
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/transaksi_pengeluaran",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            jumlah: amount,
            kategori: selectedCategory,
            transaksi_date: formatDate(tanggal), // Format tanggal diubah di sini
            keterangan: deskripsi,
            sumber_keuangan: sumberkeuangan,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add transaction");
      }

      console.log("Transaction added successfully");
      navigate("/transaction");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowCategoryOverlay(false);
  };

  return (
    <div className="edit-transaction">
      <div className="navbar">
        <button className="back-button" onClick={handleBack}>
          &lt;
        </button>
        <h2>Tambah Transaksi</h2>
      </div>
      <div className="tabs">
        <button className="tab active">Pengeluaran</button>
        <button className="tab" onClick={handlePemasukan}>
          Pemasukan
        </button>
        <button className="tab" onClick={handleTabungan}>
          Tabungan
        </button>
      </div>
      <div className="form">
        <div className="form-group">
          <label>Nominal</label>
          <div className="input-group">
            <span>Rp. </span>
            <input
              type="text"
              value={amount.toLocaleString("id-ID")}
              onChange={(e) =>
                setAmount(Number(e.target.value.replace(/\./g, "")))
              }
              inputMode="text"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Kategori</label>
          <input
            type="text"
            value={selectedCategory}
            readOnly
            onClick={() => setShowCategoryOverlay(true)}
          />
        </div>
        <div className="form-group">
          <label>Sumber Keuangan</label>
          <input
            type="text"
            value={sumberkeuangan}
            onChange={(e) => setSumberKeuangan(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Tanggal</label>
          <input
            type="date"
            id="tanggal"
            name="tanggal"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Keterangan</label>
          <input
            type="text"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
        </div>
      </div>
      {error && <div>Error: {error}</div>}
      <div className="button-container">
        <button className="save-button" onClick={handleSave}>
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
              <input type="text" placeholder="Search" />
            </div>
            <div className="category-list">
              {categories.map((category) => (
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
}

export default TambahPengeluaran;
