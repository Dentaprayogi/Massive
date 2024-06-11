import express from "express";
import usersRoute from "./users.route.js";
import transactionRoute from "./transactions.route.js"; // Tambahkan ini
import authRoute from "./auth.route.js";
import { authenticateToken } from "../middleware/validate.middleware.js";

const router = express.Router();

router.use(authRoute);
router.use(authenticateToken, usersRoute);
router.use(authenticateToken, transactionRoute); // Tambahkan ini

export default router;
