import { query } from "../database/db.js";

import { format, parse } from "date-fns";

// Fungsi untuk mem-parsing string 'dd-mm-yyyy' menjadi objek Date
const parseDateString = (dateString) => {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // Month dimulai dari 0 (Januari = 0)
};

// Fungsi untuk mem-format objek Date menjadi string 'dd-mm-yyyy'
const formatDateToString = (date) => {
  return format(date, "dd-MM-yyyy");
};

export const tambahPengingat = async (req, res) => {
  const { tanggal, deskripsi } = req.body;
  const user_id = req.user.user_id; // Mengambil user_id dari token yang telah diverifikasi

  try {
    // Validasi input
    if (!tanggal || !deskripsi) {
      return res.status(400).json({ msg: "Semua kolom wajib diisi" });
    }

    // Parse tanggal dari string 'dd-mm-yyyy' ke objek Date
    const parsedDate = parseDateString(tanggal);

    // Validasi tanggal yang sudah di-parse
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ msg: "Format tanggal tidak valid" });
    }

    // Format tanggal menjadi string 'yyyy-MM-dd' untuk penyimpanan di database
    const formattedDateForDB = format(parsedDate, "yyyy-MM-dd");

    // Tambahkan pengingat baru
    const result = await query(
      "INSERT INTO pengingat (user_id, tanggal, deskripsi) VALUES (?, ?, ?)",
      [user_id, formattedDateForDB, deskripsi]
    );

    // Ambil data pengingat yang baru saja ditambahkan dari database
    const [newReminder] = await query(
      "SELECT * FROM pengingat WHERE pengingat_id = ?",
      [result.insertId]
    );

    // Format ulang tanggal dari 'yyyy-MM-dd' ke 'dd-mm-yyyy' sebelum dikirimkan sebagai response
    newReminder.tanggal = formatDateToString(parsedDate);

    return res.status(201).json({
      msg: "Pengingat berhasil ditambahkan",
      data: newReminder,
    });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const hapusPengingat = async (req, res) => {
  const { pengingat_id } = req.params; // Mengambil pengingat_id dari parameter URL
  const user_id = req.user.user_id; // Mengambil user_id dari token yang telah diverifikasi

  try {
    // Validasi input
    if (!pengingat_id) {
      return res.status(400).json({ msg: "ID pengingat wajib disertakan" });
    }

    // Periksa apakah pengingat tersebut ada dan milik user yang sedang login
    const [existingReminder] = await query(
      "SELECT * FROM pengingat WHERE pengingat_id = ? AND user_id = ?",
      [pengingat_id, user_id]
    );

    if (!existingReminder) {
      return res
        .status(404)
        .json({ msg: "Pengingat tidak ditemukan atau tidak memiliki akses" });
    }

    // Hapus pengingat
    await query("DELETE FROM pengingat WHERE pengingat_id = ?", [pengingat_id]);

    return res.status(200).json({ msg: "Pengingat berhasil dihapus" });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const getPengingat = async (req, res) => {
  const user_id = req.user.user_id; // Mengambil user_id dari token yang telah diverifikasi

  try {
    // Query untuk mendapatkan semua pengingat berdasarkan user_id
    const result = await query(
      "SELECT * FROM pengingat WHERE user_id = ? ORDER BY tanggal DESC",
      [user_id]
    );

    // Mengonversi format tanggal dari 'yyyy-MM-dd' ke 'dd-mm-yyyy' sebelum mengirimkan sebagai response
    const pengingatWithFormattedDate = result.map((pengingat) => {
      return {
        ...pengingat,
        tanggal: formatDateToString(pengingat.tanggal),
      };
    });

    return res.status(200).json(pengingatWithFormattedDate);
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};
