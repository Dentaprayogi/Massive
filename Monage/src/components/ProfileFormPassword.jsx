import React from "react";
import "../css/ProfileFormPassword.css";

function ProfileFormPassword() {
  return (
    <div className="profile-form-password">
      <h3>Ubah Password</h3>
      <div className="form-section-password">
        <div className="form-group-password">
          <label>Password lama</label>
          <input type="password" />
        </div>
        <div className="form-group-password">
          <label>Password Baru</label>
          <input type="password" />
        </div>
        <div className="form-group-password">
          <label>Konfirmasi password baru</label>
          <input type="password" />
        </div>
      </div>
      <button className="save-button-password">Simpan</button>
    </div>
  );
}

export default ProfileFormPassword;
