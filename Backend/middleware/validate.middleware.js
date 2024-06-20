import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("Token diterima:", token); // Logging token

  if (!token) {
    console.error("Token tidak ditemukan");
    return res.status(401).json({ msg: "Token tidak ditemukan" });
  }

  try {
    const secret = process.env.SECRETKEY;
    if (!secret) {
      throw new Error("Kunci rahasia tidak ditemukan");
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.error("Kesalahan verifikasi token:", err);
        return res.status(403).json({ msg: "Token tidak valid" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Token tidak valid:", error);
    return res.status(403).json({ msg: "Token tidak valid" });
  }
};

export { authenticateToken };
