import React, { useEffect, useState } from "react";
import "../css/Transaction.css";
import logo from "../assets/Cover.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import DeleteTransactionPopup from "../pages/DeleteTransactionPopup";

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [totalSaldo, setTotalSaldo] = useState(0);
  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);
  const [totalTabungan, setTotalTabungan] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const navigate = useNavigate();

  const fetchTransactions = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/laporan", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();
      setTransactions(data.transaksi);
      setTotalSaldo(data.totalSaldo);
      setTotalPemasukan(data.totalPemasukan);
      setTotalPengeluaran(data.totalPengeluaran);
      setTotalTabungan(data.totalTabungan);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleTambahTransaksi = () => {
    navigate("/addtransaction");
  };

  const handleDeleteSuccess = () => {
    setSelectedTransactionId(null);
    // Refresh the transactions list after successful deletion
    fetchTransactions();
  };

  const handleHapus = (transaksi_id) => {
    setSelectedTransactionId(transaksi_id);
  };

  const handleEdit = (transaksi_id) => {
    navigate(`/edittransaction/${transaksi_id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="app-container">
      {selectedTransactionId && (
        <DeleteTransactionPopup
          transactionId={selectedTransactionId}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="balance-section">
        <h2 className="balance-title">Sisa Uang Kamu</h2>
        <h1 className="balance-amount">Rp {totalSaldo}</h1>
      </div>
      <div className="summary-section">
        <div className="summary-item">
          <FontAwesomeIcon icon={faArrowDown} className="icon income" />
          <span>Pemasukan</span>
          <div className="summary-amount text-blue">Rp {totalPemasukan}</div>
        </div>
        <div className="summary-item">
          <FontAwesomeIcon icon={faArrowUp} className="icon expense" />
          <span>Pengeluaran</span>
          <div className="summary-amount text-red">Rp {totalPengeluaran}</div>
        </div>
        <div className="summary-item">
          <FontAwesomeIcon icon={faSackDollar} className="icon savings" />
          <span>Tabungan</span>
          <div className="summary-amount text-green">Rp {totalTabungan}</div>
        </div>
      </div>
      <div className="transaction-section">
        <div className="transaction-header">
          <button className="btn btn-primary" onClick={handleTambahTransaksi}>
            + Tambah Transaksi
          </button>
          <div className="search-filter">
            <input type="text" placeholder="Cari Transaksi" />
          </div>
        </div>
        <h2 className="transaction-h2">Riwayat Transaksi</h2>
        <ul className="transaction-list">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.transaksi_id}
              type={transaction.jenis.toLowerCase()}
              title={transaction.kategori}
              amount={`Rp ${transaction.jumlah}`}
              date={transaction.transaksi_date}
              icon={
                transaction.jenis === "Pemasukan"
                  ? faArrowDown
                  : transaction.jenis === "Pengeluaran"
                  ? faArrowUp
                  : faSackDollar
              }
              onHapus={() => handleHapus(transaction.transaksi_id)}
              onEdit={() => handleEdit(transaction.transaksi_id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function TransactionItem({ type, title, amount, date, icon, onHapus, onEdit }) {
  const navigate = useNavigate();

  return (
    <li className={`transaction-item ${type}`}>
      <div className="transaction-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="transaction-details">
        <span className="transaction-title">{title}</span>
      </div>
      <div className="transaction-details">
        <span className="transaction-amount">{amount}</span>
      </div>
      <div className="transaction-details">
        <span className="transaction-date">{date}</span>
      </div>
      <div className="transaction-actions">
        <button className="btn btn-edit" onClick={onEdit}>
          Edit
        </button>
        <button className="btn btn-delete" onClick={onHapus}>
          Hapus
        </button>
      </div>
    </li>
  );
}

export default Transaction;
