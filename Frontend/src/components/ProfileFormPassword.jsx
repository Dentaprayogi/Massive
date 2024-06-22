import React, { useState } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../css/ProfileFormPassword.css";

function ProfileFormPassword() {
  const [passwordData, setPasswordData] = useState({
    password_lama: "",
    password_baru: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (passwordData.password_baru !== passwordData.confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Konfirmasi password baru tidak cocok",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      };

      const response = await fetch("http://localhost:3000/api/ubah_password", {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({
          password_lama: passwordData.password_lama,
          password_baru: passwordData.password_baru,
          confirmPassword: passwordData.confirmPassword,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Get error message from response body

        // Check specific error cases and show corresponding SweetAlert
        if (
          response.status === 400 &&
          errorMessage.includes("Kata sandi lama salah")
        ) {
          Swal.fire({
            title: "Error",
            text: "Password lama salah",
            icon: "error",
            confirmButtonText: "OK",
          });
        } else if (
          response.status === 400 &&
          errorMessage.includes("Konfirmasi kata sandi tidak sesuai")
        ) {
          Swal.fire({
            title: "Error",
            text: "Konfirmasi password baru tidak cocok",
            icon: "error",
            confirmButtonText: "OK",
          });
        } else {
          throw new Error(
            `HTTP error! Status: ${response.status}, Message: ${errorMessage}`
          );
        }
      } else {
        setPasswordData({
          password_lama: "",
          password_baru: "",
          confirmPassword: "",
        });

        Swal.fire({
          title: "Success",
          text: "Password berhasil diubah",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error updating password:", error);
      Swal.fire({
        title: "Error",
        text: "Gagal mengubah password",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (inputName) => {
    const inputType = document.getElementById(inputName).type;
    document.getElementById(inputName).type =
      inputType === "password" ? "text" : "password";
    setShowPassword(!showPassword);
  };

  return (
    <div className="profile-form-password">
      <h3>Ubah Password</h3>
      <div className="form-section-password">
        <div className="form-group-password">
          <label>Password lama</label>
          <div className="password-input-container">
            <input
              id="password_lama"
              type={showPassword ? "text" : "password"}
              name="password_lama"
              value={passwordData.password_lama}
              onChange={handleChange}
            />
            <button
              type="button"
              className="toggle-password-button"
              onClick={() => togglePasswordVisibility("password_lama")}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
        <div className="form-group-password">
          <label>Password baru</label>
          <div className="password-input-container">
            <input
              id="password_baru"
              type={showPassword ? "text" : "password"}
              name="password_baru"
              value={passwordData.password_baru}
              onChange={handleChange}
            />
            <button
              type="button"
              className="toggle-password-button"
              onClick={() => togglePasswordVisibility("password_baru")}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
        <div className="form-group-password">
          <label>Konfirmasi password baru</label>
          <div className="password-input-container">
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className="toggle-password-button"
              onClick={() => togglePasswordVisibility("confirmPassword")}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
      </div>
      <button
        className="save-button-password"
        onClick={handleSave}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Simpan"}
      </button>
    </div>
  );
}

export default ProfileFormPassword;
