import React, { useState } from 'react';
import "../css/EditTransaksi.css";
import { useNavigate } from "react-router-dom";

function EditTransaksi() {
  const navigate = useNavigate();
  
    const handleBack = () => {
      navigate("/transaction");
    };
  
    const categories = [
      { name: 'Makan dan Minum', type: 'Kategori Umum' },
      { name: 'Belanja', type: 'Kategori Umum' },
      { name: 'Bensin', type: 'Kategori Umum' },
      { name: 'Transportasi', type: 'Kategori Umum' },
      { name: 'Tagihan', type: 'Kategori Pribadi' },
      { name: 'Peliharaan', type: 'Kategori Pribadi' },
      { name: 'Kesehatan', type: 'Kategori Pribadi' },
      { name: 'Pengeluaran lainnya', type: 'Kategori Pribadi' },
    ];
  
  const [amount, setAmount] = useState(2000000);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [showCategoryOverlay, setShowCategoryOverlay] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSave = () => {
    // Function to handle save button click
    console.log('Transaction saved', { amount, category, date, description });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowCategoryOverlay(false);
  };

  return (
    <div className="edit-transaction">
      <div className="navbar">
        <button className="back-button" onClick={handleBack}>&lt;</button>
        <h2>Edit Transaksi</h2>
      </div>
      <div className="tabs">
        <button className="tab">Pengeluaran</button>
        <button className="tab active">Pemasukan</button>
        <button className="tab">Tabungan</button>
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

export default EditTransaksi;
