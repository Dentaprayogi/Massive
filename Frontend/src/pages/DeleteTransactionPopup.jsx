import React, { useState } from 'react';
import "../css/DeleteTransactionPopup.css";
import { useNavigate } from "react-router-dom";

const DeleteTransactionPopup = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();

  const handleDelete = () => {
    setIsDeleted(true);
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
    navigate("/transaction");
  };

  return (
    <div>
      {showPopup && (
        <div className="overlay">
          <div className="popup">
            <h2>Hapus Transaksi</h2>
            <p>Apakah kamu yakin akan menghapus transaksi ini</p>
            <div className="popup-buttons">
              <button className="delete-button" onClick={handleDelete}>Hapus</button>
              <button className="cancel-button" onClick={handleCancel}>Tidak</button>
            </div>
          </div>
        </div>
      )}
      {isDeleted && (
        <div className="overlay">
          <div className="confirmation">
            <div className="checkmark-circle">
              <div className="checkmark"></div>
            </div>
            <p>Data Berhasil di Hapus</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteTransactionPopup;
