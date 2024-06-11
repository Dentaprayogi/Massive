import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

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
    req.user = verified;
    console.log("Token terverifikasi, user_id:", verified.user_id); // Debugging
    next();
  } catch (error) {
    console.error("Token tidak valid:", error);
    res.status(400).json({ msg: "Token tidak valid" });
  }
};

export default verifyToken;
