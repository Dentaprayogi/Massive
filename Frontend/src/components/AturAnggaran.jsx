import React, { useState } from "react";
import "../css/AturAnggaran.css";
import Icon from "../assets/atur anggaran.png";
import TambahAnggaran from "./TambahAnggaran";

function AturAnggaran() {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const handleButtonClick = () => {
    setIsOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayVisible(false);
  };

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
        <button onClick={handleButtonClick}>Tambah Anggaran</button>
      </div>

      {isOverlayVisible && (
        <div className="overlay">
          <div className="overlay-content">
            <button className="close-button" onClick={handleCloseOverlay}>
              ✕
            </button>
            <TambahAnggaran onClose={handleCloseOverlay} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AturAnggaran;
