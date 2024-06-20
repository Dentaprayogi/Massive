import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../assets/pengingat.png";
import TambahPengingatOverlay from "./TambahPengingatOverlay";
import "../css/Pengingat.css";

function Pengingat() {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [pengingatList, setPengingatList] = useState([]);

  useEffect(() => {
    fetchPengingat();
  }, []);

  const fetchPengingat = async () => {
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

      const response = await axios.get(
        "http://localhost:3000/api/tampilkan_pengingat",
        config
      );

      if (response.status !== 200) {
        throw new Error(
          `Gagal mengambil data pengingat: ${response.statusText}`
        );
      }

      setPengingatList(response.data); // Perbarui state pengingatList dengan data dari server
    } catch (error) {
      console.error("Error fetching pengingat data:", error.message);
    }
  };

  const handleOpenOverlay = () => {
    setIsOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayVisible(false);
  };

  const handleTambahPengingat = async (newPengingat) => {
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

      const response = await axios.post(
        "http://localhost:3000/api/tambah_pengingat",
        newPengingat,
        config
      );

      if (response.status === 201) {
        console.log("Pengingat berhasil ditambahkan:", response.data.msg);
        // Ambil data pengingat yang baru ditambahkan dari respons
        const addedPengingat = response.data.data;

        // Perbarui state pengingatList dengan menambahkan pengingat baru
        setPengingatList([...pengingatList, addedPengingat]);

        // Tutup overlay setelah berhasil tambah pengingat
        handleCloseOverlay();
      } else {
        throw new Error(`Gagal menambah pengingat: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error adding pengingat:", error.message);
    }
  };

  const handleHapusPengingat = async (pengingat_id) => {
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

      const response = await axios.delete(
        `http://localhost:3000/api/hapus_pengingat/${pengingat_id}`,
        config
      );

      if (response.status !== 200) {
        throw new Error(`Gagal menghapus pengingat: ${response.statusText}`);
      }

      // Setelah berhasil menghapus, perbarui daftar pengingat lokal
      const updatedPengingatList = pengingatList.filter(
        (pengingat) => pengingat.pengingat_id !== pengingat_id
      );
      setPengingatList(updatedPengingatList);
    } catch (error) {
      console.error("Error deleting pengingat:", error.message);
    }
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
            {pengingatList.map((pengingat) => (
              <div key={pengingat.pengingat_id} className="pengingat-9">
                <div className="pengingat-10">
                  <div className="pengingat-11" />
                  <div className="pengingat-12">
                    <span className="span-bold">{pengingat.tanggal}</span> -{" "}
                    {pengingat.deskripsi}
                  </div>
                </div>
                <div className="pengingat-13">
                  <button
                    onClick={() => handleHapusPengingat(pengingat.pengingat_id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <TambahPengingatOverlay
        isVisible={isOverlayVisible}
        onClose={handleCloseOverlay}
        onTambahPengingat={handleTambahPengingat}
      />
    </div>
  );
}

export default Pengingat;
