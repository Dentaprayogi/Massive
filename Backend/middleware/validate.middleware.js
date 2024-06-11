import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateToken = (req, res, next) => {
  // Tambahkan logging untuk memeriksa nilai process.env.SECRETKEY
  // console.log("Nilai SECRETKEY:", process.env.SECRETKEY);

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err) {
      // Tambahkan logging untuk memeriksa kesalahan verifikasi token
      console.error("Kesalahan verifikasi token:", err);
      return res.sendStatus(403);
    }
    req.user = decoded;
    next();
  });
};

export { authenticateToken };
