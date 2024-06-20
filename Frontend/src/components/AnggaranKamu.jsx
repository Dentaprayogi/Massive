import React, { useState, useEffect } from "react";
import Makanan from "../assets/makanan.png";
import Belanja from "../assets/belanja.png";
import Bensin from "../assets/bensin.png";
import Transportasi from "../assets/transportasi.png";
import Tagihan from "../assets/tagihan.png";
import Peliharaan from "../assets/peliharaan.png";
import Kesehatan from "../assets/kesehatan.png";
import PengeluaranLainnya from "../assets/pengeluaran lainnya.png";
import "../css/AnggaranKamu.css";

function AnggaranKamu() {
  const [anggaranList, setAnggaranList] = useState([]);

  useEffect(() => {
    const fetchAnggaranTerbaru = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("Token tidak tersedia.");
          return;
        }

        const response = await fetch(
          "http://localhost:3000/api/tampilkan_anggaranterbaru",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Gagal memuat data anggaran terbaru.");
        }

        const data = await response.json();
        setAnggaranList(data.data || []);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAnggaranTerbaru();
  }, []); // Kosongkan dependency array untuk menjalankan sekali saat komponen dimuat

  return (
    <div id="anggaran-kamu">
      <div className="anggaran-kamu">
        <div className="anggaran-kamu-2">
          <div className="anggaran-kamu-3">
            <div className="anggaran-kamu-4" />
            <div className="anggaran-kamu-5">
              <div className="anggaran-kamu-6">Anggaran Kamu</div>
              {anggaranList.map((anggaran) => (
                <div key={anggaran.anggaran_id} className="anggaran-kamu-7">
                  {renderKategoriIcon(anggaran.kategori)}
                  <div className="anggaran-kamu-8">{anggaran.kategori}</div>
                  <div className="anggaran-kamu-date">
                    {anggaran.start_date} - {anggaran.end_date}
                  </div>
                  <div className="anggaran-kamu-17">
                    Rp {anggaran.jumlah} / Rp {anggaran.totalTerpakai}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderKategoriIcon(kategori) {
  switch (kategori) {
    case "Makan dan Minum":
      return <img src={Makanan} alt="makanan" />;
    case "Belanja":
      return <img src={Belanja} alt="belanja" />;
    case "Bensin":
      return <img src={Bensin} alt="bensin" />;
    case "Transportasi":
      return <img src={Transportasi} alt="transportasi" />;
    case "Tagihan":
      return <img src={Tagihan} alt="tagihan" />;
    case "Peliharaan":
      return <img src={Peliharaan} alt="peliharaan" />;
    case "Kesehatan":
      return <img src={Kesehatan} alt="kesehatan" />;
    case "Pengeluaran Lainnya":
      return <img src={PengeluaranLainnya} alt="lainnya" />;
    default:
      return null;
  }
}

export default AnggaranKamu;
