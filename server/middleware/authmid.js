import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT = process.env.JWT_KEY;

const authverification = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization token missing " });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT, (error, user) => {
      if (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }

      req.user = user;
      next();
    });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default authverification;