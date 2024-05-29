import React, { useState } from 'react';
import "../css/TambahPemasukan.css";
import { useNavigate } from "react-router-dom";

function TambahPemasukan() {
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
      { name: 'Gaji', type: 'Kategori Umum' },
      { name: 'Bonus', type: 'Kategori Umum' },
      { name: 'Hasil Investasi', type: 'Kategori Umum' },
      { name: 'Pemasukan Lainnya', type: 'Kategori Lainnya' },
  ];



const [amount, setAmount] = useState(2000000);
const [category, setCategory] = useState('');
const [date, setDate] = useState('');
const [description, setDescription] = useState('');
const [sumberkeuangan, setSumberKeuangan] = useState('');
const [showCategoryOverlay, setShowCategoryOverlay] = useState(false);
const [selectedCategory, setSelectedCategory] = useState('');



const handleSave = () => {
  // Function to handle save button click
  console.log('Transaction saved', { amount, category, category1, date, description });
};

const handleCategoryClick = (category) => {
  setSelectedCategory(category);
  setShowCategoryOverlay(false);
};



return (
  <div className="edit-transaction">
    <div className="navbar">
      <button className="back-button" onClick={handleBack}>&lt;</button>
      <h2>Tambah Transaksi</h2>
    </div>
    <div className="tabs">
      <button className="tab active">Pengeluaran</button>
      <button className="tab" onClick={handlePemasukan}>Pemasukan</button>
      <button className="tab" onClick={handleTabungan}>Tabungan</button>
    </div>
    <div className="form">
      <div className="form-group">
        <label>Nominal</label>
        <div className="input-group">
          <span>Rp. </span>
          <input 
            type="text" 
            value={amount.toLocaleString('id-ID')} 
            onChange={(e) => setAmount(Number(e.target.value.replace(/\./g, '')))} 
            inputMode='text'
          />
        </div>
      </div>
      <div className="form-group">
        <label>Kategori</label>
        <input 
          type="text" 
          value={selectedCategory} readOnly
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
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Keterangan</label>
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
      </div>
    </div>
    <div className="button-container">
    <button className="save-button" onClick={handleSave}>Simpan</button>
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

export default TambahPemasukan;
