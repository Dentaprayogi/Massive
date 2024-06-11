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
  const [date, setDate] = useState('');
  const [sumberkeuangan, setSumberKeuangan] = useState('');
  const [description, setDescription] = useState('');
  
  const handleSave = () => {
    // Function to handle save button click
    console.log('Transaction saved', { amount, category, date, description });
  };


  return (
    <div className="edit-transaction">
      <div className="navbar">
        <button className="back-button" onClick={handleBack}>&lt;</button>
        <h2>Edit Transaksi</h2>
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

   
    </div>
  );
}

export default EditTransaksi;
