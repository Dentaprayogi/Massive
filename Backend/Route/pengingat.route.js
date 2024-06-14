import express from "express";
import {
  tambahPengingat,
  hapusPengingat,
  getPengingat,
} from "../Controller/pengingat.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/tambah_pengingat", verifyToken, tambahPengingat);
router.delete("/hapus_pengingat/:pengingat_id", verifyToken, hapusPengingat);
router.get("/tampilkan_pengingat", verifyToken, getPengingat);
export default router;
