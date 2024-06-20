import bcrypt from "bcrypt";
import { query } from "../database/db.js";

export const updateUsers = async (req, res) => {
  const { nama_depan, nama_belakang, jenis_kelamin, email, tlp, tgl_lahir } =
    req.body;
  const user_id = req.user.user_id; // Mengambil user_id dari token yang telah diverifikasi

  console.log("User ID dari token:", user_id); // Debugging

  try {
    const userResult = await query(
      "SELECT nama_depan, nama_belakang, jenis_kelamin, email, tlp, tgl_lahir FROM users WHERE user_id = ?",
      [user_id]
    );
    if (userResult.length === 0) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }
    const user = userResult[0];

    await query(
      "UPDATE users SET nama_depan=?, nama_belakang=?, jenis_kelamin=?, email=?, tlp=?, tgl_lahir=? WHERE user_id=?",
      [
        nama_depan || user.nama_depan,
        nama_belakang || user.nama_belakang,
        jenis_kelamin || user.jenis_kelamin,
        email || user.email,
        tlp || user.tlp,
        tgl_lahir || user.tgl_lahir,
        user_id,
      ]
    );

    const updatedUserResult = await query(
      "SELECT nama_depan, nama_belakang, jenis_kelamin, email, tlp, tgl_lahir FROM users WHERE user_id = ?",
      [user_id]
    );
    const updatedUser = updatedUserResult[0];

    return res.status(200).json({ msg: "User Diubah", user: updatedUser });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const updatePassword = async (req, res) => {
  const { password_lama, password_baru, confirmPassword } = req.body;
  const user_id = req.user.user_id;

  // Periksa apakah kata sandi baru dan konfirmasi kata sandi sesuai
  if (password_baru !== confirmPassword) {
    return res.status(400).json({ msg: "Konfirmasi kata sandi tidak sesuai" });
  }

  try {
    // Ambil data pengguna berdasarkan user_id
    const [user] = await query("SELECT password FROM users WHERE user_id = ?", [
      user_id,
    ]);

    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    // Periksa apakah kata sandi lama sesuai
    const isMatch = await bcrypt.compare(password_lama, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Kata sandi lama salah" });
    }

    // Hash kata sandi baru
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password_baru, salt);

    // Update kata sandi pengguna di database
    await query("UPDATE users SET password = ? WHERE user_id = ?", [
      hashedPassword,
      user_id,
    ]);

    return res.status(200).json({ msg: "Kata sandi berhasil diubah" });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const deleteUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    // Periksa apakah pengguna ada di database
    const userResult = await query("SELECT * FROM users WHERE user_id = ?", [
      user_id,
    ]);
    if (userResult.length === 0) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    const userData = userResult[0];

    // Hapus pengguna dari database
    await query("DELETE FROM users WHERE user_id = ?", [user_id]);

    return res.status(200).json({ msg: "User Dihapus", user: userData });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const result = await query("SELECT * FROM users");
    return res.status(200).json({ success: true, data: result });
  } catch (e) {
    console.log("Terjadi kesalahan", e);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const getUserProfile = async (req, res) => {
  const user_id = req.user.user_id; // Mengambil user_id dari token yang telah diverifikasi

  try {
    // Ambil data pengguna berdasarkan user_id
    const userResult = await query(
      "SELECT nama_depan, nama_belakang, jenis_kelamin, email, tlp, tgl_lahir FROM users WHERE user_id = ?",
      [user_id]
    );

    // Periksa apakah pengguna ada
    if (userResult.length === 0) {
      return res.status(404).json({ msg: "Data pengguna tidak ditemukan" });
    }

    // Mengembalikan data pengguna
    const userData = userResult[0];
    return res.status(200).json({ success: true, data: userData });
  } catch (error) {
    console.error("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};
