import React, { useState, useEffect } from "react";
import "../css/EditTransaksi.css";
import { useNavigate, useParams } from "react-router-dom";

function EditTransaksi() {
  const navigate = useNavigate();
  const { transaksi_id } = useParams();
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [sumberKeuangan, setSumberKeuangan] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/transaksi/${transaksi_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch transaction details");
        }

        const data = await response.json();
        setAmount(data.jumlah);
        setDate(data.transaksi_date);
        setSumberKeuangan(data.sumber_keuangan);
        setDescription(data.keterangan);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTransactionDetails();
  }, [transaksi_id]);

  const handleBack = () => {
    navigate("/transaction");
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/edit_transaksi/${transaksi_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            jumlah: amount,
            transaksi_date: date,
            sumber_keuangan: sumberKeuangan,
            keterangan: description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update transaction");
      }

      console.log("Transaction updated successfully");
      navigate("/transaction");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="edit-transaction">
      <div className="navbar">
        <button className="back-button" onClick={handleBack}>
          &lt;
        </button>
        <h2>Edit Transaksi</h2>
      </div>

      <div className="form">
        <div className="form-group">
          <label>Nominal</label>
          <div className="input-group">
            <span>Rp. </span>
            <input
              type="text"
              value={
                typeof amount === "number"
                  ? amount.toLocaleString("id-ID")
                  : amount
              } // Memastikan amount berupa angka sebelum memanggil toLocaleString
              onChange={(e) =>
                setAmount(Number(e.target.value.replace(/\./g, "")))
              }
              inputMode="text"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Sumber Keuangan</label>
          <input
            type="text"
            value={sumberKeuangan}
            onChange={(e) => setSumberKeuangan(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Tanggal</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="mm-dd-yyyy"
            pattern="\d{2}-\d{2}-\d{4}" // Menyediakan pola validasi untuk format mm-dd-yyyy
            title="Format tanggal harus mm-dd-yyyy"
          />
        </div>

        <div className="form-group">
          <label>Keterangan</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      {error && <div>Error: {error}</div>}
      <div className="button-container">
        <button className="save-button" onClick={handleSave}>
          Simpan
        </button>
      </div>
    </div>
  );
}

export default EditTransaksi;
