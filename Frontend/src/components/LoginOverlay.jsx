import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/LoginOverlay.css";

const LoginOverlay = ({ show, onClose, onRegister }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // State untuk menyimpan pesan kesalahan
  const [showPassword, setShowPassword] = useState(false); // State untuk menampilkan atau menyembunyikan kata sandi

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle state showPassword
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Login successful:", response);

      // Pastikan respons dari server mengandung properti Authorization di dalam data
      const token = response.data.Authorization;
      if (!token) {
        throw new Error("Token not found in response data");
      }

      localStorage.setItem("token", token); // Simpan token di localStorage
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      setError("Email atau kata sandi salah."); // Set pesan kesalahan dari server
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="login-overlay">
      <div className="login-overlay-content">
        <button onClick={onClose} className="login-close-button">
          ✕
        </button>
        <h2>Log in</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="login-input-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Ketik di sini"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="login-input-group">
            <label>Kata Sandi</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Ketik di sini"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="login-toggle-password-visibility"
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? "👁" : "👁️‍🗨️"}
            </button>
          </div>
          <a href="#" className="login-forgot-password">
            Lupa Password?
          </a>
          <button type="submit" className="login-button">
            Log in
          </button>
        </form>
        <p>
          Belum Punya Akun?{" "}
          <a href="#" className="signup-link" onClick={onRegister}>
            Daftar Sekarang!
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginOverlay;
