import React, { useState, useEffect } from "react";
import Pemasukan from "../assets/pemasukan.png";
import Pengeluaran from "../assets/pengeluaran.png";
import Tabungan from "../assets/tabungan.png"; // Gambar untuk tabungan
import "../css/TransaksiTerbaru.css";

function TransaksiTerbaru() {
  const [transaksiTerbaru, setTransaksiTerbaru] = useState([]);

  useEffect(() => {
    const fetchTransaksiTerbaru = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("Token tidak tersedia.");
          return;
        }

        const response = await fetch(
          "http://localhost:3000/api/transaksi_terbaru",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Gagal memuat data transaksi terbaru.");
        }

        const data = await response.json();
        setTransaksiTerbaru(data); // Simpan data transaksi terbaru ke state
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTransaksiTerbaru();
  }, []); // Kosongkan dependency array untuk menjalankan sekali saat komponen dimuat

  return (
    <div id="transaksi-terbaru">
      <div className="transaksi-terbaru">
        <div className="transaksi-terbaru-2" />
        <div className="transaksi-terbaru-3">
          <div className="transaksi-terbaru-4">Transaksi Terbaru</div>
          <div className="transaksi-terbaru-5">
            {transaksiTerbaru.map((transaksi, index) => (
              <div className="transaksi-terbaru-6" key={index}>
                <div className="transaksi-terbaru-column">
                  <div className="transaksi-terbaru-8">
                    <img
                      src={
                        transaksi.jenis === "pemasukan"
                          ? Pemasukan
                          : transaksi.jenis === "pengeluaran"
                          ? Pengeluaran
                          : Tabungan // Gunakan gambar Tabungan untuk jenis "tabungan"
                      }
                      alt=""
                    />
                    <div
                      className={
                        transaksi.jenis === "pemasukan"
                          ? "transaksi-terbaru-9 color-text-pemasukan"
                          : transaksi.jenis === "pengeluaran"
                          ? "transaksi-terbaru-9 color-text-pengeluaran"
                          : "transaksi-terbaru-9 color-text-tabungan" // Gunakan kelas CSS untuk warna teks tabungan
                      }
                    >
                      {transaksi.keterangan}
                    </div>
                  </div>
                  <div className="column00">
                    <div
                      className={
                        transaksi.jenis === "pemasukan"
                          ? "color-text-pemasukan"
                          : transaksi.jenis === "pengeluaran"
                          ? "color-text-pengeluaran"
                          : "color-text-tabungan" // Gunakan kelas CSS untuk warna teks tabungan
                      }
                    >
                      {`Rp ${transaksi.jumlah}`}
                    </div>
                    <div className="transaksi-terbaru-12">
                      {transaksi.transaksi_date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransaksiTerbaru;
