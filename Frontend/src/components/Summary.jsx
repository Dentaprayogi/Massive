import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Summary.css";
import TotalSaldo from "../assets/total saldo.png";
import Tabungan from "../assets/tabungan.png";
import Pemasukan from "../assets/pemasukan.png";
import Pengeluaran from "../assets/pengeluaran.png";

function Summary() {
  const [summaryData, setSummaryData] = useState({
    totalSaldo: 0,
    totalTabungan: 0,
    totalPemasukan: 0,
    totalPengeluaran: 0,
  });

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error(
            "Token tidak ditemukan. Harap login terlebih dahulu."
          );
        }

        const config = {
          headers: {
            Authorization: `${token}`,
          },
        };

        const response = await axios.get(
          "http://localhost:3000/api/laporan",
          config
        );

        if (response.status !== 200) {
          throw new Error(
            `Gagal mengambil data laporan: ${response.statusText}`
          );
        }

        const { totalSaldo, totalTabungan, totalPemasukan, totalPengeluaran } =
          response.data;

        setSummaryData({
          totalSaldo,
          totalTabungan,
          totalPemasukan,
          totalPengeluaran,
        });
      } catch (error) {
        console.error("Error fetching summary data:", error.message);
      }
    };

    fetchSummaryData();
  }, []);

  return (
    <div className="summary">
      <div>
        <div className="summary-item-icon-total-saldo">
          <img src={TotalSaldo} alt="total saldo" />
        </div>
        <div className="summary-items">
          <p>Total Saldo:</p>
          <h2 className="total-saldo">
            Rp {summaryData.totalSaldo.toLocaleString()}
          </h2>
        </div>
      </div>
      <div>
        <div className="summary-item-icon-tabungan">
          <img src={Tabungan} alt="tabungan" />
        </div>
        <div className="summary-items">
          <p>Tabungan:</p>
          <h2 className="tabungan">
            Rp {summaryData.totalTabungan.toLocaleString()}
          </h2>
        </div>
      </div>
      <div>
        <div className="summary-item-icon-pemasukan">
          <img src={Pemasukan} alt="pemasukan" />
        </div>
        <div className="summary-items">
          <p>Pemasukan:</p>
          <h2 className="pemasukan">
            Rp {summaryData.totalPemasukan.toLocaleString()}
          </h2>
        </div>
      </div>
      <div>
        <div className="summary-item-icon-pengeluaran">
          <img src={Pengeluaran} alt="pengeluaran" />
        </div>
        <div className="summary-items">
          <p>Pengeluaran:</p>
          <h2 className="pengeluaran">
            Rp {summaryData.totalPengeluaran.toLocaleString()}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Summary;
