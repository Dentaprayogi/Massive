import React from "react";
import "../css/AturAnggaran.css";
import Icon from "../assets/atur anggaran.png";

function AturAnggaran() {
  return (
    <div className="atur-anggaran">
      <div className="atur-anggaran-2">Atur Anggaran</div>
      <img className="atur-anggaran-img" src={Icon} alt="Atur Anggaran" />
      <div className="atur-anggaran-3">
        Kamu belum memiliki anggaran keuangan nih,
      </div>
      <div className="atur-anggaran-4">
        Yuk, buat anggaranmu dengan tombol
        <span className="text-bold"> Tambah Anggaran! </span>
      </div>
      <div className="atur-anggaran-5">
        <button>Tambah Anggaran</button>
      </div>
    </div>
  );
}

export default AturAnggaran;
