import express from "express";
import {
  tambahAnggaran,
  hapusAnggaran,
  tampilkanAnggaran,
} from "../Controller/anggaran.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/tambah_anggaran", verifyToken, tambahAnggaran);
router.delete("/hapus_anggaran/:anggaran_id", verifyToken, hapusAnggaran);
router.get("/tampilkan_anggaran", verifyToken, tampilkanAnggaran);

export default router;
