import React from "react";
import "../css/FilterDataLaporan.css";

function FilterDataLaporan() {
  return (
    <div className="filter-container">
      <div className="filter-options">
        <label>
          Bulan
          <select>
            <option value="Semua">Semua</option>
            <option value="Januari">Januari</option>
            <option value="Februari">Februari</option>
            <option value="Maret">Maret</option>
            <option value="April">April</option>
            <option value="Mei">Mei</option>
            <option value="Juni">Juni</option>
            <option value="Juli">Juli</option>
            <option value="Agustus">Aguatus</option>
            <option value="September">September</option>
            <option value="Oktober">Oktober</option>
            <option value="November">November</option>
            <option value="Desember">Desember</option>
          </select>
        </label>
        <label>
          Tahun
          <select>
            <option value="Semua">Semua</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </label>
        <label>
          Jenis
          <select>
            <option value="Semua">Semua</option>
            <option value="Pemasukan">Pemasukan</option>
            <option value="Pengeluaran">Pengeluaran</option>
            <option value="Tabungan">Tabungan</option>
          </select>
        </label>
        <button>Tampilkan</button>
        <button>Ekspor</button>
      </div>
    </div>
  );
}

export default FilterDataLaporan;
