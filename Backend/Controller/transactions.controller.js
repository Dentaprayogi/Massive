import { query } from "../database/db.js";
import { format, parse } from "date-fns";

// Fungsi untuk mem-parsing string 'MM-dd-yyyy' menjadi objek Date
const parseDateString = (dateString) => {
  if (typeof dateString !== "string") {
    throw new TypeError("dateString should be a string");
  }
  const [month, day, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // Month dimulai dari 0 (Januari = 0)
};

// Fungsi untuk mem-format objek Date menjadi string 'MM-dd-yyyy'
const formatDateToString = (date) => {
  return format(date, "MM-dd-yyyy");
};

export const transaksiPengeluaran = async (req, res) => {
  const { kategori, jumlah, transaksi_date, keterangan, sumber_keuangan } =
    req.body;
  const user_id = req.user.user_id;
  const jenis_id = 2; // ID untuk jenis pengeluaran

  try {
    if (!kategori || !jumlah || !transaksi_date || !sumber_keuangan) {
      return res.status(400).json({ msg: "Semua kolom wajib diisi" });
    }

    const [kategoriResult] = await query(
      "SELECT kategori_id FROM kategori WHERE kategori = ?",
      [kategori]
    );
    if (!kategoriResult) {
      return res.status(404).json({ msg: "Kategori tidak ditemukan" });
    }
    const kategori_id = kategoriResult.kategori_id;

    const parsedDate = parseDateString(transaksi_date);
    const formattedDateForDB = format(parsedDate, "yyyy-MM-dd");

    const result = await query(
      "INSERT INTO transaksi (user_id, jenis_id, kategori_id, jumlah, transaksi_date, keterangan, sumber_keuangan) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        user_id,
        jenis_id,
        kategori_id,
        jumlah,
        formattedDateForDB,
        keterangan,
        sumber_keuangan,
      ]
    );

    const [newTransaction] = await query(
      "SELECT * FROM transaksi WHERE transaksi_id = ?",
      [result.insertId]
    );
    newTransaction.transaksi_date = formatDateToString(
      new Date(newTransaction.transaksi_date)
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
  const { kategori, jumlah, transaksi_date, keterangan, sumber_keuangan } =
    req.body;
  const user_id = req.user.user_id;
  const jenis_id = 1; // ID untuk jenis Pemasukan

  try {
    if (!kategori || !jumlah || !transaksi_date || !sumber_keuangan) {
      return res.status(400).json({ msg: "Semua kolom wajib diisi" });
    }

    const [kategoriResult] = await query(
      "SELECT kategori_id FROM kategori WHERE kategori = ?",
      [kategori]
    );
    if (!kategoriResult) {
      return res.status(404).json({ msg: "Kategori tidak ditemukan" });
    }
    const kategori_id = kategoriResult.kategori_id;

    const parsedDate = parseDateString(transaksi_date);
    const formattedDateForDB = format(parsedDate, "yyyy-MM-dd");

    const result = await query(
      "INSERT INTO transaksi (user_id, jenis_id, kategori_id, jumlah, transaksi_date, keterangan, sumber_keuangan) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        user_id,
        jenis_id,
        kategori_id,
        jumlah,
        formattedDateForDB,
        keterangan,
        sumber_keuangan,
      ]
    );

    const [newTransaction] = await query(
      "SELECT * FROM transaksi WHERE transaksi_id = ?",
      [result.insertId]
    );
    newTransaction.transaksi_date = formatDateToString(
      new Date(newTransaction.transaksi_date)
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
  const { kategori, jumlah, transaksi_date, keterangan, sumber_keuangan } =
    req.body;
  const user_id = req.user.user_id;
  const jenis_id = 3; // ID untuk jenis Tabungan

  try {
    if (!kategori || !jumlah || !transaksi_date || !sumber_keuangan) {
      return res.status(400).json({ msg: "Semua kolom wajib diisi" });
    }

    const [kategoriResult] = await query(
      "SELECT kategori_id FROM kategori WHERE kategori = ?",
      [kategori]
    );
    if (!kategoriResult) {
      return res.status(404).json({ msg: "Kategori tidak ditemukan" });
    }
    const kategori_id = kategoriResult.kategori_id;

    const parsedDate = parseDateString(transaksi_date);
    const formattedDateForDB = format(parsedDate, "yyyy-MM-dd");

    const result = await query(
      "INSERT INTO transaksi (user_id, jenis_id, kategori_id, jumlah, transaksi_date, keterangan, sumber_keuangan) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        user_id,
        jenis_id,
        kategori_id,
        jumlah,
        formattedDateForDB,
        keterangan,
        sumber_keuangan,
      ]
    );

    const [newTransaction] = await query(
      "SELECT * FROM transaksi WHERE transaksi_id = ?",
      [result.insertId]
    );
    newTransaction.transaksi_date = formatDateToString(
      new Date(newTransaction.transaksi_date)
    );

    return res
      .status(201)
      .json({ msg: "Tabungan berhasil ditambahkan", data: newTransaction });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const getTransaksi = async (req, res) => {
  const { bulan, tahun, jenis } = req.body;
  const user_id = req.user.user_id;

  const bulanMap = {
    Januari: 1,
    Februari: 2,
    Maret: 3,
    April: 4,
    Mei: 5,
    Juni: 6,
    Juli: 7,
    Agustus: 8,
    September: 9,
    Oktober: 10,
    November: 11,
    Desember: 12,
  };

  let sql = `
    SELECT t.transaksi_id, t.user_id, jt.jenis, k.kategori, t.jumlah, DATE_FORMAT(t.transaksi_date, '%m-%d-%Y') AS transaksi_date, t.keterangan, t.sumber_keuangan
    FROM transaksi t
    JOIN kategori k ON t.kategori_id = k.kategori_id
    JOIN jenistransaksi jt ON t.jenis_id = jt.jenis_id
    WHERE t.user_id = ?`;
  let params = [user_id];

  if (bulan) {
    const bulanNomor = bulanMap[bulan];
    if (!bulanNomor) {
      return res.status(400).json({ msg: "Nama bulan tidak valid" });
    }
    sql += " AND MONTH(t.transaksi_date) = ?";
    params.push(bulanNomor);
  }

  if (tahun) {
    sql += " AND YEAR(t.transaksi_date) = ?";
    params.push(tahun);
  }

  if (jenis) {
    sql += " AND jt.jenis = ?";
    params.push(jenis);
  }

  sql += " ORDER BY t.transaksi_date DESC";

  try {
    const result = await query(sql, params);

    const [totalPemasukan] = await query(
      "SELECT SUM(jumlah) AS total FROM transaksi WHERE user_id = ? AND jenis_id = (SELECT jenis_id FROM jenistransaksi WHERE jenis = 'Pemasukan')",
      [user_id]
    );

    const [totalPengeluaran] = await query(
      "SELECT SUM(jumlah) AS total FROM transaksi WHERE user_id = ? AND jenis_id = (SELECT jenis_id FROM jenistransaksi WHERE jenis = 'Pengeluaran')",
      [user_id]
    );

    const [totalTabungan] = await query(
      "SELECT SUM(jumlah) AS total FROM transaksi WHERE user_id = ? AND jenis_id = (SELECT jenis_id FROM jenistransaksi WHERE jenis = 'Tabungan')",
      [user_id]
    );

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

export const getTransaksiTerbaru = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const result = await query(
      `SELECT t.transaksi_id, t.user_id, jt.jenis, k.kategori, t.jumlah, DATE_FORMAT(t.transaksi_date, '%m-%d-%Y') AS transaksi_date, t.keterangan, t.sumber_keuangan
       FROM transaksi t
       JOIN kategori k ON t.kategori_id = k.kategori_id
       JOIN jenistransaksi jt ON t.jenis_id = jt.jenis_id
       WHERE t.user_id = ?
       ORDER BY t.transaksi_date DESC, t.transaksi_id DESC
       LIMIT 3`,
      [user_id]
    );

    return res.status(200).json(result);
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const updateTransaksi = async (req, res) => {
  const { transaksi_id } = req.params;
  const { jumlah, transaksi_date, keterangan, sumber_keuangan } = req.body;
  const user_id = req.user.user_id;

  try {
    const [transaksi] = await query(
      "SELECT * FROM transaksi WHERE transaksi_id = ? AND user_id = ?",
      [transaksi_id, user_id]
    );

    if (!transaksi) {
      return res
        .status(404)
        .json({ msg: "Transaksi tidak ditemukan atau bukan milik Anda" });
    }

    let formattedDateForDB = transaksi.transaksi_date;
    if (transaksi_date) {
      const parsedDate = parseDateString(transaksi_date);
      formattedDateForDB = format(parsedDate, "yyyy-MM-dd");
    }

    await query(
      "UPDATE transaksi SET jumlah = ?, transaksi_date = ?, keterangan = ?, sumber_keuangan = ? WHERE transaksi_id = ? AND user_id = ?",
      [
        jumlah || transaksi.jumlah,
        formattedDateForDB,
        keterangan || transaksi.keterangan,
        sumber_keuangan || transaksi.sumber_keuangan,
        transaksi_id,
        user_id,
      ]
    );

    const [updatedTransaksi] = await query(
      "SELECT * FROM transaksi WHERE transaksi_id = ?",
      [transaksi_id]
    );
    updatedTransaksi.transaksi_date = formatDateToString(
      new Date(updatedTransaksi.transaksi_date)
    );

    return res
      .status(200)
      .json({ msg: "Transaksi berhasil diperbarui", data: updatedTransaksi });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const deleteTransaksi = async (req, res) => {
  const { transaksi_id } = req.params;
  const user_id = req.user.user_id;

  try {
    const [transaksi] = await query(
      "SELECT * FROM transaksi WHERE transaksi_id = ? AND user_id = ?",
      [transaksi_id, user_id]
    );

    if (!transaksi) {
      return res
        .status(404)
        .json({ msg: "Transaksi tidak ditemukan atau bukan milik Anda" });
    }

    await query("DELETE FROM transaksi WHERE transaksi_id = ?", [transaksi_id]);

    return res.status(200).json({ msg: "Transaksi berhasil dihapus" });
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const getTransaksiById = async (req, res) => {
  const { transaksi_id } = req.params;
  const user_id = req.user.user_id;

  try {
    const [transaksi] = await query(
      `SELECT t.transaksi_id, t.user_id, jt.jenis, k.kategori, t.jumlah, DATE_FORMAT(t.transaksi_date, '%m-%d-%Y') AS transaksi_date, t.keterangan, t.sumber_keuangan
       FROM transaksi t
       JOIN kategori k ON t.kategori_id = k.kategori_id
       JOIN jenistransaksi jt ON t.jenis_id = jt.jenis_id
       WHERE t.transaksi_id = ? AND t.user_id = ?`,
      [transaksi_id, user_id]
    );

    if (!transaksi) {
      return res
        .status(404)
        .json({ msg: "Transaksi tidak ditemukan atau bukan milik Anda" });
    }

    transaksi.transaksi_date = formatDateToString(
      new Date(transaksi.transaksi_date)
    );

    return res.status(200).json(transaksi);
  } catch (error) {
    console.log("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};
