import React from "react";
import "../css/SignUpOverlay.css";

const SignUpOverlay = ({ show, onClose, onLogin }) => {
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
        <form>
          <div className="sign-input-group">
            <label>Nama Depan</label>
            <input type="text" placeholder="Ketik di sini" />
          </div>
          <div className="sign-input-group">
            <label>No Telepon</label>
            <input type="text" placeholder="Ketik di sini" />
          </div>
          <div className="sign-input-group">
            <label>Nama Belakang</label>
            <input type="text" placeholder="Ketik di sini" />
          </div>
          <div className="sign-input-group">
            <label>Kata Sandi</label>
            <input type="password" placeholder="Ketik di sini" />
            <button type="button" className="sign-toggle-password-visibility">
              👁
            </button>
          </div>
          <div className="sign-input-group">
            <label>Email</label>
            <input type="text" placeholder="Ketik di sini" />
          </div>
          <div className="sign-input-group">
            <label>Konfirmasi Kata Sandi</label>
            <input type="password" placeholder="Ketik di sini" />
            <button type="button" className="sign-toggle-password-visibility">
              👁
            </button>
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
