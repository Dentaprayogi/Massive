import express from "express";
import usersRoute from "./users.route.js";
import transactionRoute from "./transactions.route.js";
import anggaranRoute from "./anggaran.route.js";
import authRoute from "./auth.route.js";
import { authenticateToken } from "../middleware/validate.middleware.js";

const router = express.Router();

router.use(authRoute);
router.use(authenticateToken, usersRoute);
router.use(authenticateToken, transactionRoute);
router.use(authenticateToken, anggaranRoute);

export default router;
