import express from "express";
import {
  transaksiPengeluaran,
  transaksiPemasukan,
  tambahTabungan,
  getTransaksi,
  deleteTransaksi,
  updateTransaksi,
  getTransaksiTerbaru,
} from "../Controller/transactions.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/transaksi_pengeluaran", verifyToken, transaksiPengeluaran);
router.post("/transaksi_pemasukan", verifyToken, transaksiPemasukan);
router.post("/transaksi_tabungan", verifyToken, tambahTabungan);
router.get("/laporan", verifyToken, getTransaksi);
router.get("/transaksi_terbaru", verifyToken, getTransaksiTerbaru);
router.delete("/hapus_transaksi/:transaksi_id", verifyToken, deleteTransaksi);
router.put("/edit_transaksi/:transaksi_id", verifyToken, updateTransaksi);

export default router;
