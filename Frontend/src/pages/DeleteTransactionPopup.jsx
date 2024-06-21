import React, { useState } from "react";
import "../css/DeleteTransactionPopup.css";
import { useNavigate } from "react-router-dom";

const DeleteTransactionPopup = ({ transactionId, onDeleteSuccess }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/hapus_transaksi/${transactionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      setIsDeleted(true);
      setTimeout(() => {
        setShowPopup(false);
        onDeleteSuccess();
        navigate("/transaction");
      }, 1500); // Hide popup after 1.5 seconds
    } catch (error) {
      setError(error.message);
    }
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
            <p>Apakah kamu yakin akan menghapus transaksi ini?</p>
            <div className="popup-buttons">
              <button className="delete-button" onClick={handleDelete}>
                Hapus
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Tidak
              </button>
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
      {error && (
        <div className="overlay">
          <div className="error-popup">
            <h2>Error</h2>
            <p>{error}</p>
            <button className="cancel-button" onClick={handleCancel}>
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteTransactionPopup;
