import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUtensils,
  FaShoppingCart,
  FaPlusCircle,
  FaTrash,
  FaGasPump,
  FaCar,
  FaFileInvoice,
  FaPaw,
  FaFirstAid,
  FaMoneyBillAlt,
} from "react-icons/fa";
import "../css/LaporanAnggaran.css";
import TambahAnggaran from "./TambahAnggaran";
import AnggaranKosong from "../pages/AnggranKosong";

function LaporanAnggaran() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [anggaranList, setAnggaranList] = useState([]);
  const [totalSaldoPemakaian, setTotalSaldoPemakaian] = useState(0);
  const [totalSaldoAnggaran, setTotalSaldoAnggaran] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnggaran = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "http://localhost:3000/api/tampilkan_anggaran",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        const { data, totalSaldoPemakaian, totalSaldoAnggaran } = response.data;

        setAnggaranList(data);
        setTotalSaldoPemakaian(totalSaldoPemakaian);
        setTotalSaldoAnggaran(totalSaldoAnggaran);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchAnggaran();
  }, []);

  const handleTambahAnggaran = () => {
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  const handleDeleteAnggaran = async (anggaranId) => {
    console.log(`Menghapus anggaran dengan ID ${anggaranId}`);
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `http://localhost:3000/api/hapus_anggaran/${anggaranId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      // Setelah berhasil menghapus anggaran, ambil data anggaran yang terbaru
      const updatedAnggaranList = anggaranList.filter(
        (anggaran) => anggaran.anggaran_id !== anggaranId
      );
      setAnggaranList(updatedAnggaranList);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // Fungsi untuk mendapatkan bulan dan tahun saat ini
  const getCurrentMonthYear = () => {
    const now = new Date();
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    return `${month} ${year}`;
  };

  const currentMonthYear = getCurrentMonthYear();

  // Fungsi untuk memetakan kategori ke ikon yang sesuai
  const mapCategoryToIcon = (kategori) => {
    switch (kategori.toLowerCase()) {
      case "makan dan minum":
        return <FaUtensils />;
      case "belanja":
        return <FaShoppingCart />;
      case "bensin":
        return <FaGasPump />;
      case "transportasi":
        return <FaCar />;
      case "tagihan":
        return <FaFileInvoice />;
      case "peliharaan":
        return <FaPaw />;
      case "kesehatan":
        return <FaFirstAid />;
      case "pengeluaran lainnya":
        return <FaMoneyBillAlt />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Jika tidak ada anggaran, tampilkan komponen AturAnggaran
  if (anggaranList.length === 0) {
    return <AnggaranKosong />;
  }

  // Jika ada anggaran, tampilkan daftar anggaran
  return (
    <div className="container">
      <main>
        <h2>Atur Anggaran</h2>
        <section className="summary">
          <div className="summary-item">
            <h3>Total Saldo Pemakaian</h3>
            <p className="amount">Rp. {totalSaldoPemakaian}</p>
            <span>{currentMonthYear}</span>
          </div>
          <div className="summary-item">
            <h3>Total Saldo Anggaran</h3>
            <p className="amount">Rp. {totalSaldoAnggaran}</p>
            <span>{currentMonthYear}</span>
          </div>
        </section>
        <section className="budget">
          {anggaranList.map((anggaran) => (
            <BudgetItem
              key={anggaran.anggaran_id}
              icon={mapCategoryToIcon(anggaran.kategori)}
              title={anggaran.kategori}
              used={`Rp. ${anggaran.totalTerpakai}`}
              budget={`Rp. ${anggaran.jumlah}`}
              remaining={`Rp. ${anggaran.sisaAnggaran}`}
              percentage={Math.round(
                (anggaran.totalTerpakai / anggaran.jumlah) * 100
              )}
              onDelete={() => handleDeleteAnggaran(anggaran.anggaran_id)}
              startDate={anggaran.start_date}
              endDate={anggaran.end_date}
              currentMonthYear={currentMonthYear}
            />
          ))}
        </section>

        <button className="add-button" onClick={handleTambahAnggaran}>
          <FaPlusCircle size={32} />
        </button>
      </main>
      {showOverlay && <TambahAnggaran onClose={handleCloseOverlay} />}
    </div>
  );
}

function BudgetItem({
  icon,
  title,
  used,
  budget,
  remaining,
  percentage,
  onDelete,
  startDate,
  endDate,
  currentMonthYear,
}) {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC", // Set timezone to UTC
    };
    const date = new Date(dateString).toLocaleDateString("en-US", options);
    return date;
  };

  const dateRange =
    startDate && endDate
      ? `${formatDate(startDate)} - ${formatDate(endDate)}`
      : `Bulanan . ${currentMonthYear}`;

  return (
    <div className="budget-item">
      <div className="budget-header">
        <div className="icon-title">
          {icon}
          <div>
            <h3>{title}</h3>
            <span>{dateRange}</span>
          </div>
        </div>
        <div className="budget-info">
          <div>
            <p>Anggaran</p>
            <span>{budget}</span>
          </div>
          <div>
            <p>Sisa</p>
            <span>{remaining}</span>
          </div>
        </div>
        <button className="delete-button" onClick={onDelete}>
          <FaTrash size={16} />
        </button>
      </div>
      <div className="budget-content">
        <div className="used">
          <p>Terpakai</p>
          <span>{used}</span>
        </div>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
    </div>
  );
}

export default LaporanAnggaran;
