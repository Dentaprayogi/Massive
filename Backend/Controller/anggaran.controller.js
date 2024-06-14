import { query } from "../database/db.js";

export const tambahAnggaran = async (req, res) => {
  const { kategori_id, jumlah, start_date, end_date } = req.body;
  const user_id = req.user.user_id; // Mengambil user_id dari token yang telah diverifikasi

  try {
    // Validasi input
    if (!kategori_id || !jumlah || !start_date || !end_date) {
      return res.status(400).json({ msg: "Semua kolom wajib diisi" });
    }

    // Tambahkan anggaran baru
    const result = await query(
      "INSERT INTO anggaran (user_id, kategori_id, jumlah, start_date, end_date) VALUES (?, ?, ?, ?, ?)",
      [user_id, kategori_id, jumlah, start_date, end_date]
    );

    // Ambil data anggaran yang baru saja ditambahkan
    const [newAnggaran] = await query(
      "SELECT * FROM anggaran WHERE anggaran_id = ?",
      [result.insertId]
    );

    return res.status(201).json({
      msg: "Anggaran berhasil ditambahkan",
      data: newAnggaran,
    });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const hapusAnggaran = async (req, res) => {
  const { anggaran_id } = req.params;
  const user_id = req.user.user_id; // Mengambil user_id dari token yang telah diverifikasi

  try {
    // Validasi input
    if (!anggaran_id) {
      return res.status(400).json({ msg: "Anggaran ID wajib diisi" });
    }

    // Cek apakah anggaran ada dan milik user yang sedang login
    const [anggaran] = await query(
      "SELECT * FROM anggaran WHERE anggaran_id = ? AND user_id = ?",
      [anggaran_id, user_id]
    );

    if (!anggaran) {
      return res.status(404).json({ msg: "Anggaran tidak ditemukan" });
    }

    // Hapus anggaran
    await query("DELETE FROM anggaran WHERE anggaran_id = ?", [anggaran_id]);

    return res.status(200).json({
      msg: "Anggaran berhasil dihapus",
    });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const tampilkanAnggaran = async (req, res) => {
  const user_id = req.user.user_id; // Mengambil user_id dari token yang telah diverifikasi
  const { page = 1, limit = 10 } = req.query; // Pagination

  try {
    // Validasi input
    const offset = (page - 1) * limit;

    // Ambil daftar anggaran untuk user yang sedang login, diurutkan dari yang terbaru ke yang terlama
    const anggaranList = await query(
      "SELECT * FROM anggaran WHERE user_id = ? ORDER BY start_date DESC LIMIT ? OFFSET ?",
      [user_id, parseInt(limit), offset]
    );

    // Cek total jumlah anggaran untuk pagination
    const [totalResult] = await query(
      "SELECT COUNT(*) as total FROM anggaran WHERE user_id = ?",
      [user_id]
    );
    const total = totalResult.total;

    // Hitung total terpakai, sisa anggaran, total saldo pemakaian, dan total saldo anggaran
    let totalSaldoPemakaian = 0;
    let totalSaldoAnggaran = 0;

    for (let anggaran of anggaranList) {
      const startDate = new Date(anggaran.start_date)
        .toISOString()
        .split("T")[0];
      const endDate = new Date(anggaran.end_date).toISOString().split("T")[0];

      const [totalTerpakaiResult] = await query(
        `SELECT SUM(jumlah) as totalTerpakai
         FROM transaksi
         WHERE user_id = ? AND kategori_id = ? AND jenis_id = 2 AND transaksi_date BETWEEN ? AND ?`,
        [user_id, anggaran.kategori_id, startDate, endDate]
      );

      const totalTerpakai = totalTerpakaiResult.totalTerpakai || 0;
      const sisaAnggaran = anggaran.jumlah - totalTerpakai;

      anggaran.totalTerpakai = totalTerpakai;
      anggaran.sisaAnggaran = sisaAnggaran;

      // Tambahkan ke total saldo pemakaian dan total saldo anggaran
      totalSaldoPemakaian += Number(totalTerpakai);
      totalSaldoAnggaran += Number(anggaran.jumlah);
    }

    return res.status(200).json({
      msg: "Daftar anggaran berhasil diambil",
      data: anggaranList,
      total, // Tambahkan total untuk pagination
      page: parseInt(page),
      limit: parseInt(limit),
      totalSaldoPemakaian,
      totalSaldoAnggaran,
    });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const tampilkanTigaAnggaranTerbaru = async (req, res) => {
  const user_id = req.user.user_id; // Mengambil user_id dari token yang telah diverifikasi

  try {
    // Ambil 3 anggaran terbaru untuk user yang sedang login
    const anggaranList = await query(
      "SELECT * FROM anggaran WHERE user_id = ? ORDER BY start_date DESC LIMIT 3",
      [user_id]
    );

    // Hitung total terpakai dan sisa anggaran untuk setiap anggaran
    for (let anggaran of anggaranList) {
      const startDate = new Date(anggaran.start_date)
        .toISOString()
        .split("T")[0];
      const endDate = new Date(anggaran.end_date).toISOString().split("T")[0];

      const [totalTerpakaiResult] = await query(
        `SELECT SUM(jumlah) as totalTerpakai
         FROM transaksi
         WHERE user_id = ? AND kategori_id = ? AND jenis_id = 2 AND transaksi_date BETWEEN ? AND ?`,
        [user_id, anggaran.kategori_id, startDate, endDate]
      );

      const totalTerpakai = totalTerpakaiResult.totalTerpakai || 0;
      const sisaAnggaran = anggaran.jumlah - totalTerpakai;

      anggaran.totalTerpakai = totalTerpakai;
      anggaran.sisaAnggaran = sisaAnggaran;
    }

    return res.status(200).json({
      msg: "Tiga anggaran terbaru berhasil diambil",
      data: anggaranList,
    });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};
