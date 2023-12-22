import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Forbidden - Admin access required" });
  }
  next();
};

export const authMiddleware = { authenticateUser, authorizeAdmin };
