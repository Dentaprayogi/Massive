import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../css/ProfileForm.css";

function ProfileForm() {
  const [profileData, setProfileData] = useState({
    nama_depan: "",
    nama_belakang: "",
    tgl_lahir: "",
    jenis_kelamin: "",
    email: "",
    tlp: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        };

        const response = await fetch("http://localhost:3000/api/userprofil", {
          method: "GET",
          headers: headers,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const result = await response.json();
        const profile = result.data;

        console.log("Fetched user profile:", profile);

        setProfileData({
          nama_depan: profile.nama_depan || "",
          nama_belakang: profile.nama_belakang || "",
          tgl_lahir: profile.tgl_lahir ? profile.tgl_lahir.split("T")[0] : "", // Remove time if it's included
          jenis_kelamin: profile.jenis_kelamin || "",
          email: profile.email || "",
          tlp: profile.tlp || "",
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      };

      const response = await fetch("http://localhost:3000/api/ubah_profil", {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      console.log("Profile updated successfully");

      // Tampilkan SweetAlert saat update berhasil
      Swal.fire({
        title: "Success",
        text: "Update Profile Berhasil",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-form">
      <h3>Ubah Profil</h3>
      <div className="form-section">
        <div className="data-diri">
          <h4>Data Diri</h4>
          <div className="nama-depan-belakang">
            <div className="form-group">
              <label>Nama depan</label>
              <input
                type="text"
                name="nama_depan"
                value={profileData.nama_depan}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Nama belakang</label>
              <input
                type="text"
                name="nama_belakang"
                value={profileData.nama_belakang}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Tanggal lahir</label>
            <input
              type="date"
              name="tgl_lahir"
              value={profileData.tgl_lahir}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Jenis kelamin</label>
            <select
              name="jenis_kelamin"
              value={profileData.jenis_kelamin}
              onChange={handleChange}
            >
              <option value="">Pilih</option>
              <option value="perempuan">Perempuan</option>
              <option value="laki-laki">Laki-laki</option>
            </select>
          </div>
        </div>
        <div className="kontak">
          <h4>Kontak</h4>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Nomor telepon</label>
            <input
              type="tel"
              name="tlp"
              value={profileData.tlp}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <button className="save-button" onClick={handleSave}>
        Simpan
      </button>
    </div>
  );
}

export default ProfileForm;
