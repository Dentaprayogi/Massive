import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginOverlay.css";

const LoginOverlay = ({ show, onClose, onRegister }) => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Logika autentikasi bisa dimasukkan di sini
    navigate("/dashboard"); // Mengalihkan ke halaman Dashboard
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
        <form onSubmit={handleLogin}>
          <div className="login-input-group">
            <label>Email</label>
            <input type="text" placeholder="Ketik di sini" />
          </div>
          <div className="login-input-group">
            <label>Kata Sandi</label>
            <input type="password" placeholder="Ketik di sini" />
            <button type="button" className="login-toggle-password-visibility">
              👁
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
