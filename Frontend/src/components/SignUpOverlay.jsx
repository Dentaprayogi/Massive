import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import "../css/SignUpOverlay.css";

const SignUpOverlay = ({ show, onClose, onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama_depan: "",
    nama_belakang: "",
    jenis_kelamin: "",
    password: "",
    confirmPassword: "",
    email: "",
    tlp: "",
    tgl_lahir: "",
  });

  const [errors, setErrors] = useState({
    allFields: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      allFields: "", // Reset error when input changes
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      nama_depan,
      nama_belakang,
      jenis_kelamin,
      password,
      confirmPassword,
      email,
      tlp,
      tgl_lahir,
    } = formData;

    // Validasi untuk memastikan semua field terisi
    if (
      !nama_depan ||
      !nama_belakang ||
      !jenis_kelamin ||
      !password ||
      !confirmPassword ||
      !email ||
      !tlp ||
      !tgl_lahir
    ) {
      setErrors({
        ...errors,
        allFields: "Semua field harus diisi.",
      });
      return;
    }

    // Validasi untuk memastikan konfirmasi kata sandi cocok
    if (password !== confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "Konfirmasi kata sandi tidak cocok.",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/register",
        formData
      );
      console.log("User registered:", response.data);

      // Tampilkan SweetAlert untuk memberitahu pengguna bahwa sign up berhasil
      Swal.fire({
        icon: "success",
        title: "Sign Up Berhasil",
        text: "Anda berhasil mendaftar!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          // Jika pengguna menekan OK, buka overlay login
          onLogin();
        }
      });
    } catch (error) {
      if (error.response) {
        console.error("Error registering user:", error.response.data);
      } else {
        console.error("Error registering user:", error.message);
      }
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="sign-overlay">
      <div className="sign-overlay-content">
        <button onClick={onClose} className="sign-close-button">
          ✕
        </button>
        <h2>Sign Up</h2>
        {errors.allFields && (
          <div className="error-message">{errors.allFields}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="sign-input-group">
            <label>Nama Depan</label>
            <input
              type="text"
              name="nama_depan"
              placeholder="Ketik di sini"
              value={formData.nama_depan}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sign-input-group">
            <label>No Telepon</label>
            <input
              type="text"
              name="tlp"
              placeholder="Ketik di sini"
              value={formData.tlp}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sign-input-group">
            <label>Nama Belakang</label>
            <input
              type="text"
              name="nama_belakang"
              placeholder="Ketik di sini"
              value={formData.nama_belakang}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sign-input-group">
            <label>Jenis Kelamin</label>
            <input
              type="text"
              name="jenis_kelamin"
              placeholder="Ketik di sini"
              value={formData.jenis_kelamin}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sign-input-group">
            <label>Tanggal Lahir</label>
            <input
              type="date"
              name="tgl_lahir"
              placeholder="Ketik di sini"
              value={formData.tgl_lahir}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sign-input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Ketik di sini"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sign-input-group">
            <label>Kata Sandi</label>
            <input
              type="password"
              name="password"
              placeholder="Ketik di sini"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sign-input-group">
            <label>Konfirmasi Kata Sandi</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Ketik di sini"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={errors.confirmPassword ? "input-error" : ""}
            />
            {errors.confirmPassword && (
              <div className="error-message">{errors.confirmPassword}</div>
            )}
          </div>
          <button type="submit" className="signup-button">
            Sign up
          </button>
        </form>
        <p>
          Sudah Punya Akun?{" "}
          <a href="#" className="signin-link" onClick={onLogin}>
            Masuk!
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpOverlay;
