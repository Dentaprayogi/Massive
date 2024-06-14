import { query } from "../database/db.js";

export const transaksiPengeluaran = async (req, res) => {
  const { kategori_id, jumlah, transaksi_date, keterangan, sumber_keuangan } =
    req.body;
  const user_id = req.user.user_id; // Mengambil user_id dari token yang telah diverifikasi
  const jenis_id = 2; // ID untuk jenis pengeluaran

  try {
    // Validasi input
    if (!kategori_id || !jumlah || !transaksi_date || !sumber_keuangan) {
      return res.status(400).json({ msg: "Semua kolom wajib diisi" });
    }

    // Tambahkan transaksi baru
    const result = await query(
      "INSERT INTO transaksi (user_id, jenis_id, kategori_id, jumlah, transaksi_date, keterangan, sumber_keuangan) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        user_id,
        jenis_id,
        kategori_id,
        jumlah,
        transaksi_date,
        keterangan,
        sumber_keuangan,
      ]
    );

    // Ambil data transaksi yang baru saja ditambahkan
    const [newTransaction] = await query(
      "SELECT * FROM transaksi WHERE transaksi_id = ?",
      [result.insertId]
    );

    return res.status(201).json({
      msg: "Transaksi pengeluaran berhasil ditambahkan",
      data: newTransaction,
    });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const transaksiPemasukan = async (req, res) => {
  const { kategori_id, jumlah, transaksi_date, keterangan, sumber_keuangan } =
    req.body;
  const user_id = req.user.user_id; // Mengambil user_id dari token yang telah diverifikasi
  const jenis_id = 1; // ID untuk jenis Pemasukan

  try {
    // Validasi input
    if (!kategori_id || !jumlah || !transaksi_date || !sumber_keuangan) {
      return res.status(400).json({ msg: "Semua kolom wajib diisi" });
    }

    // Tambahkan transaksi baru
    const result = await query(
      "INSERT INTO transaksi (user_id, jenis_id, kategori_id, jumlah, transaksi_date, keterangan, sumber_keuangan) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        user_id,
        jenis_id,
        kategori_id,
        jumlah,
        transaksi_date,
        keterangan,
        sumber_keuangan,
      ]
    );

    // Ambil data transaksi yang baru saja ditambahkan
    const [newTransaction] = await query(
      "SELECT * FROM transaksi WHERE transaksi_id = ?",
      [result.insertId]
    );

    return res.status(201).json({
      msg: "Transaksi pemasukan berhasil ditambahkan",
      data: newTransaction,
    });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const tambahTabungan = async (req, res) => {
  const { kategori_id, jumlah, transaksi_date, keterangan, sumber_keuangan } =
    req.body;
  const user_id = req.user.user_id; // Mengambil user_id dari token yang telah diverifikasi
  const jenis_id = 3; // ID untuk jenis Tabungan

  try {
    // Validasi input
    if (!kategori_id || !jumlah || !transaksi_date || !sumber_keuangan) {
      return res.status(400).json({ msg: "Semua kolom wajib diisi" });
    }

    // Tambahkan transaksi baru
    const result = await query(
      "INSERT INTO transaksi (user_id, jenis_id, kategori_id, jumlah, transaksi_date, keterangan, sumber_keuangan) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        user_id,
        jenis_id,
        kategori_id,
        jumlah,
        transaksi_date,
        keterangan,
        sumber_keuangan,
      ]
    );

    // Ambil data transaksi yang baru saja ditambahkan
    const [newTransaction] = await query(
      "SELECT * FROM transaksi WHERE transaksi_id = ?",
      [result.insertId]
    );

    return res.status(201).json({
      msg: "Tabungan berhasil ditambahkan",
      data: newTransaction,
    });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const getTransaksi = async (req, res) => {
  const { bulan, tahun, jenis_id } = req.body;
  const user_id = req.user.user_id; // Mengambil user_id dari token yang telah diverifikasi

  let sql = "SELECT * FROM transaksi WHERE user_id = ?";
  let params = [user_id];

  if (bulan) {
    sql += " AND MONTH(transaksi_date) = ?";
    params.push(bulan);
  }

  if (tahun) {
    sql += " AND YEAR(transaksi_date) = ?";
    params.push(tahun);
  }

  if (jenis_id) {
    sql += " AND jenis_id = ?";
    params.push(jenis_id);
  }

  // Tambahkan ORDER BY untuk mengurutkan dari yang terbaru ke yang terlama
  sql += " ORDER BY transaksi_date DESC";

  try {
    const result = await query(sql, params);

    // Hitung total pemasukan
    const [totalPemasukan] = await query(
      "SELECT SUM(jumlah) AS total FROM transaksi WHERE user_id = ? AND jenis_id = 1",
      [user_id]
    );

    // Hitung total pengeluaran
    const [totalPengeluaran] = await query(
      "SELECT SUM(jumlah) AS total FROM transaksi WHERE user_id = ? AND jenis_id = 2",
      [user_id]
    );

    // Hitung total tabungan
    const [totalTabungan] = await query(
      "SELECT SUM(jumlah) AS total FROM transaksi WHERE user_id = ? AND jenis_id = 3",
      [user_id]
    );

    // Hitung total saldo
    const totalSaldo =
      (totalPemasukan.total || 0) -
      (totalPengeluaran.total || 0) -
      (totalTabungan.total || 0);

    return res.status(200).json({
      totalSaldo,
      totalPemasukan: totalPemasukan.total || 0,
      totalPengeluaran: totalPengeluaran.total || 0,
      totalTabungan: totalTabungan.total || 0,
      transaksi: result,
    });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const updateTransaksi = async (req, res) => {
  const { transaksi_id } = req.params;
  const { jumlah, transaksi_date, keterangan, sumber_keuangan } = req.body;
  const user_id = req.user.user_id; // Mengambil user_id dari token yang telah diverifikasi

  try {
    // Cek apakah transaksi milik pengguna yang sedang login
    const [transaksi] = await query(
      "SELECT * FROM transaksi WHERE transaksi_id = ? AND user_id = ?",
      [transaksi_id, user_id]
    );

    if (!transaksi) {
      return res
        .status(404)
        .json({ msg: "Transaksi tidak ditemukan atau bukan milik Anda" });
    }

    // Update transaksi
    await query(
      "UPDATE transaksi SET jumlah = ?, transaksi_date = ?, keterangan = ?, sumber_keuangan = ? WHERE transaksi_id = ? AND user_id = ?",
      [
        jumlah || transaksi.jumlah,
        transaksi_date || transaksi.transaksi_date,
        keterangan || transaksi.keterangan,
        sumber_keuangan || transaksi.sumber_keuangan,
        transaksi_id,
        user_id,
      ]
    );

    // Ambil data transaksi yang baru diupdate
    const [updatedTransaksi] = await query(
      "SELECT * FROM transaksi WHERE transaksi_id = ?",
      [transaksi_id]
    );

    return res.status(200).json({
      msg: "Transaksi berhasil diperbarui",
      data: updatedTransaksi,
    });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const deleteTransaksi = async (req, res) => {
  const { transaksi_id } = req.params;
  const user_id = req.user.user_id; // Mengambil user_id dari token yang telah diverifikasi

  try {
    // Cek apakah transaksi milik pengguna yang sedang login
    const [transaksi] = await query(
      "SELECT * FROM transaksi WHERE transaksi_id = ? AND user_id = ?",
      [transaksi_id, user_id]
    );

    if (!transaksi) {
      return res
        .status(404)
        .json({ msg: "Transaksi tidak ditemukan atau bukan milik Anda" });
    }

    // Hapus transaksi
    await query("DELETE FROM transaksi WHERE transaksi_id = ?", [transaksi_id]);

    return res.status(200).json({ msg: "Transaksi berhasil dihapus" });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const getTransaksiTerbaru = async (req, res) => {
  const user_id = req.user.user_id; // Mengambil user_id dari token yang telah diverifikasi

  try {
    // Query untuk mendapatkan 3 transaksi terbaru
    const result = await query(
      "SELECT * FROM transaksi WHERE user_id = ? ORDER BY transaksi_date DESC, transaksi_id DESC LIMIT 3",
      [user_id]
    );

    return res.status(200).json(result);
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};
