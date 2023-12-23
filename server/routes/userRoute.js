import express from "express";
const router = express.Router();
import { userController } from "../controllers/userAuth.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get(
  "/profile",
  authMiddleware.authenticateUser,
  userController.getUserProfile
);

router.put(
  "/profile",
  authMiddleware.authenticateUser,
  userController.updateUserProfile
);
export const UserRouter = router;
