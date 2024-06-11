import express from "express";
import {
  updateUsers,
  updatePassword,
  deleteUser,
  getUsers,
} from "../Controller/users.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.put("/ubah_profil", verifyToken, updateUsers);
router.put("/ubah_password", verifyToken, updatePassword);
router.delete("/delete_user/:user_id", deleteUser);
router.get("/users", getUsers);

export default router;
