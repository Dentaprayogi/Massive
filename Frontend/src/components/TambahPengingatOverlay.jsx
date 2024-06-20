import React, { useState } from "react";
import axios from "axios";
import "../css/TambahPengingatOverlay.css";

function TambahPengingatOverlay({ isVisible, onClose }) {
  const [tanggal, setTanggal] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Harap login terlebih dahulu.");
      }

      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      // Ubah format tanggal dari input type="date" (yyyy-mm-dd) menjadi dd-mm-yyyy
      const formattedTanggal = tanggal.split("-").reverse().join("-");

      const data = {
        tanggal: formattedTanggal,
        deskripsi: deskripsi,
      };

      const response = await axios.post(
        "http://localhost:3000/api/tambah_pengingat",
        data,
        config
      );

      if (response.status === 201) {
        console.log("Pengingat berhasil ditambahkan:", response.data.msg);
        onClose(); // Tutup overlay setelah berhasil tambah pengingat
      } else {
        throw new Error(`Gagal menambah pengingat: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error adding pengingat:", error.message);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="tambah-pengingat-overlay">
      <div className="tambah-pengingat-overlay-content">
        <button className="tambah-pengingat-close-button" onClick={onClose}>
          ✕
        </button>
        <h3>Tambah Pengingat</h3>
        <form onSubmit={handleSubmit}>
          <div className="tambah-pengingat-form-group">
            <label htmlFor="tanggal">Tanggal</label>
            <input
              type="date"
              id="tanggal"
              name="tanggal"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
            />
          </div>
          <div className="tambah-pengingat-form-group">
            <label htmlFor="deskripsi">Deskripsi</label>
            <input
              type="text"
              id="deskripsi"
              name="deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            />
          </div>
          <button type="submit" className="tambah-pengingat-submit-button">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}

export default TambahPengingatOverlay;
