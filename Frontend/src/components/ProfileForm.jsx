import React from "react";
import "../css/ProfileForm.css";

function ProfileForm() {
  return (
    <div className="profile-form">
      <h3>Ubah Profil</h3>
      <div className="form-section">
        <div className="data-diri">
          <h4>Data Diri</h4>
          <div className="nama-depan-belakang">
            <div className="form-group">
              <label>Nama depan</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Nama belakang</label>
              <input type="text" />
            </div>
          </div>
          <div className="form-group">
            <label>Tanggal lahir</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Jenis kelamin</label>
            <select>
              <option>Perempuan</option>
              <option>Laki-laki</option>
            </select>
          </div>
        </div>
        <div className="kontak">
          <h4>Kontak</h4>
          <div className="form-group">
            <label>Email</label>
            <input type="email" />
          </div>
          <div className="form-group">
            <label>Nomor telepon</label>
            <input type="tel" />
          </div>
        </div>
      </div>
      <button className="save-button">Simpan</button>
    </div>
  );
}

export default ProfileForm;
