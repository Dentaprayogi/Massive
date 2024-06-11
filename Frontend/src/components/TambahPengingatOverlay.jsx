import React, { useState } from "react";
import "../css/TambahPengingatOverlay.css";

function TambahPengingatOverlay({ isVisible, onClose }) {
  if (!isVisible) return null;

  return (
    <div className="tambah-pengingat-overlay">
      <div className="tambah-pengingat-overlay-content">
        <button className="tambah-pengingat-close-button" onClick={onClose}>
          ✕
        </button>
        <h3>Tambah Pengingat</h3>
        <form>
          <div className="tambah-pengingat-form-group">
            <label htmlFor="tanggal">Tanggal</label>
            <input type="date" id="tanggal" name="tanggal" />
          </div>
          <div className="tambah-pengingat-form-group">
            <label htmlFor="deskripsi">Deskripsi</label>
            <input type="text" id="deskripsi" name="deskripsi" />
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
