import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { query } from "../database/db.js";

export const register = async (req, res) => {
  const {
    nama_depan,
    nama_belakang,
    jenis_kelamin,
    password,
    confirmPassword,
    email,
    tlp,
    tgl_lahir,
  } = req.body;

  if (
    nama_depan === "" ||
    nama_depan === undefined ||
    nama_belakang === "" ||
    nama_belakang === undefined ||
    jenis_kelamin === "" ||
    jenis_kelamin === undefined ||
    password === "" ||
    password === undefined ||
    confirmPassword === "" ||
    confirmPassword === undefined ||
    email === "" ||
    email === undefined ||
    tlp === "" ||
    tlp === undefined ||
    tgl_lahir === "" ||
    tgl_lahir === undefined
  ) {
    return res.status(400).json({ error: "Field must not be empty" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Password not match" });
  }

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await query(
      "INSERT INTO users (nama_depan, nama_belakang, jenis_kelamin, password, email, tlp, tgl_lahir) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        nama_depan,
        nama_belakang,
        jenis_kelamin,
        hashedPassword,
        email,
        tlp,
        tgl_lahir,
      ]
    );

    const newUser = await query("SELECT * FROM users WHERE user_id = ?", [
      result.insertId,
    ]);

    return res.status(200).json({ msg: "User Ditambahkan", user: newUser[0] });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const login = async (req, res) => {
  const { email, password: inputPass } = req.body;

  try {
    const [validation] = await query(
      "SELECT user_id FROM users WHERE email=?",
      [email]
    );

    if (!validation) {
      return res.status(400).json({ error: "User not found" });
    }

    const [check] = await query(
      "SELECT user_id, email, password FROM users WHERE user_id=?",
      [validation.user_id]
    );

    const isMatch = await bcrypt.compare(inputPass, check.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Password is wrong" });
    }

    const data = {
      user_id: check.user_id,
      email: check.email,
    };

    jwt.sign(data, process.env.SECRETKEY, (err, token) => {
      if (err) throw err;
      return res.status(200).json({ Authorization: `Bearer ${token}` });
    });
  } catch (error) {
    return res.status(500).json({ error: "Terjadi kesalahan" });
  }
};
