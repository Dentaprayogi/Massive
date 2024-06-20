import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(403)
      .json({ msg: "Akses ditolak, token tidak ditemukan" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ msg: "Token tidak ditemukan" });
  }

  try {
    const secret = process.env.SECRETKEY;
    if (!secret) {
      throw new Error("Kunci rahasia tidak ditemukan");
    }

    const verified = jwt.verify(token, secret);
    req.user = verified; // Menyimpan informasi user ke req.user
    console.log("Token terverifikasi, user_id:", verified.user_id); // Debugging
    next();
  } catch (error) {
    console.error("Token tidak valid:", error);
    return res.status(403).json({ msg: "Token tidak valid" });
  }
};

export default verifyToken;
