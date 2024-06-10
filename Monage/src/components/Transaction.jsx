import React from "react";
import "../css/Transaction.css";
import logo from "../assets/Cover.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faSackDollar,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Transaction() {
  const navigate = useNavigate();

  const handleTambahTransaksi = () => {
    navigate("/addtransaction");
  };

  return (
    <div className="app-container">
      {/* SINI */}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="balance-section">
        <h2 className="balance-title">Sisa Uang Kamu</h2>
        <h1 className="balance-amount">Rp 1.000.000</h1>
      </div>
      <div className="summary-section">
        <div className="summary-item">
          <FontAwesomeIcon icon={faArrowDown} className="icon income" />
          <span>Pemasukan</span>
          <div className="summary-amount text-blue">Rp 3.500.000</div>
        </div>
        <div className="summary-item">
          <FontAwesomeIcon icon={faArrowUp} className="icon expense" />
          <span>Pengeluaran</span>
          <div className="summary-amount text-red">Rp 1.000.000</div>
        </div>
        <div className="summary-item">
          <FontAwesomeIcon icon={faSackDollar} className="icon savings" />
          <span>Tabungan</span>
          <div className="summary-amount text-green">Rp 500.000</div>
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
        <ul className="transaction-list-1">
          <TransactionItem
            type="income"
            title="Gaji bulan April"
            amount="Rp 3.500.000"
            date="25-04-2024"
            icon={faArrowDown}
          />
        </ul>
        <ul className="transaction-list-2">
          <TransactionItem
            type="expense"
            title="Uang makan siang"
            amount="Rp 200.000"
            date="25-04-2024"
            icon={faArrowUp}
          />
        </ul>
        <ul className="transaction-list-3">
          <TransactionItem
            type="savings"
            title="Tabungan"
            amount="Rp 3.500.000"
            date="25-03-2024"
            icon={faWallet}
          />
        </ul>
      </div>
    </div>
  );
}

function TransactionItem({ type, title, amount, date, icon, onEdit, data }) {
  const navigate = useNavigate();

  const handleEditTransaksi = () => {
    navigate("/edittransaction");
  };

  const handleHapus = () => {
    navigate("/delete");
  };

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
        <button className="btn btn-edit" onClick={handleEditTransaksi}>
          Edit
        </button>
        <button className="btn btn-delete" onClick={handleHapus}>
          Hapus
        </button>
      </div>
    </li>
  );
}

export default Transaction;
