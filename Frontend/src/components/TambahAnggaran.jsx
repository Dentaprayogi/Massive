import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/TambahAnggaran.css";

const TambahAnggaran = ({ onClose }) => {
  const [amount, setAmount] = useState("");
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
    onClose();
  };

  const handleSave = async () => {
    try {
      // Ambil token dari localStorage
      const token = localStorage.getItem("token");

      // Validasi input
      if (!amount || !selectedCategory || !startDate || !endDate) {
        alert("Semua kolom wajib diisi");
        return;
      }

      // Ubah format tanggal sebelum dikirim ke backend
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      // Kirim data anggaran ke backend
      const response = await fetch(
        "http://localhost:3000/api/tambah_anggaran",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            kategori: selectedCategory,
            jumlah: amount,
            start_date: formattedStartDate,
            end_date: formattedEndDate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menambahkan anggaran");
      }

      const data = await response.json();
      console.log("Anggaran berhasil ditambahkan:", data);

      navigate("/laporananggaran");
      onClose();
    } catch (error) {
      console.error("Terjadi kesalahan:", error.message);
      alert("Terjadi kesalahan saat menyimpan anggaran");
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowCategoryOverlay(false);
  };

  // Fungsi untuk mengubah format tanggal dari yyyy-mm-dd ke MM-dd-yyyy
  const formatDate = (inputDate) => {
    const [year, month, day] = inputDate.split("-");
    return `${month}-${day}-${year}`;
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
            type="text"
            value={amount.toLocaleString("id-ID")}
            onChange={(e) =>
              setAmount(Number(e.target.value.replace(/\./g, "")))
            }
            inputMode="numeric"
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
