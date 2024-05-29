import React, { useState } from "react";
import Logo from "../assets/pengingat.png";
import TambahPengingatOverlay from "./TambahPengingatOverlay";
import "../css/Pengingat.css";

function Pengingat() {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const handleOpenOverlay = () => {
    setIsOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayVisible(false);
  };

  return (
    <div id="pengingat">
      <div className="pengingat">
        <div className="pengingat-2">
          <div className="pengingat-3" />
          <div className="pengingat-4">
            <div className="pengingat-5">
              <div className="pengingat-6">
                <img src={Logo} alt="pengingat" />
                <div className="pengingat-7">Pengingat Pembayaran</div>
              </div>
              <div className="pengingat-8">
                <button onClick={handleOpenOverlay}>Tambah Pengingat</button>
              </div>
            </div>
            <div className="pengingat-9">
              <div className="pengingat-10">
                <div className="pengingat-11" />
                <div className="pengingat-12">
                  <span className="span-bold">24 Mei 2024</span> - Bayar Tagihan
                  Listrik
                </div>
              </div>
              <div className="pengingat-13">
                <button>Hapus</button>
              </div>
            </div>
            <div className="pengingat-14">
              <div className="pengingat-15">
                <div className="pengingat-16" />
                <div className="pengingat-17">
                  <span className="span-bold">30 Mei 2024</span> - Bayar Air
                  PDAM
                </div>
              </div>
              <div className="pengingat-13">
                <button>Hapus</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TambahPengingatOverlay
        isVisible={isOverlayVisible}
        onClose={handleCloseOverlay}
      />
    </div>
  );
}

export default Pengingat;
