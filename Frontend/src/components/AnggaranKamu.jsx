import React from "react";
import Makanan from "../assets/makanan.png";
import Belanja from "../assets/belanja.png";
import "../css/AnggaranKamu.css";

function AnggaranKamu() {
  return (
    <div id="anggaran-kamu">
      <div className="anggaran-kamu">
        <div className="anggaran-kamu-2">
          <div className="anggaran-kamu-3">
            <div className="anggaran-kamu-4" />
            <div className="anggaran-kamu-5">
              <div className="anggaran-kamu-6">Anggaran Kamu</div>
              <div className="anggaran-kamu-7">
                <img src={Makanan} alt="makanan" />
                <div className="anggaran-kamu-8">Makan dan Minum</div>
              </div>
              <div className="anggaran-kamu-7">
                <img src={Belanja} alt="belanja" />
                <div className="anggaran-kamu-10">Belanja</div>
              </div>
            </div>
          </div>
          <div className="anggaran-kamu-11">
            <div className="anggaran-kamu-12">
              <div className="anggaran-kamu-13">Kelola Anggaran</div>
              <div className="anggaran-kamu-17">Rp 55.000 / Rp 750.000</div>
            </div>
            <div className="anggaran-kamu-15">
              <div className="anggaran-kamu-16" />
            </div>
            <div className="anggaran-kamu-17">Rp 150.000 / Rp 750.000</div>
            <div className="anggaran-kamu-18">
              <div className="anggaran-kamu-19" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnggaranKamu;
