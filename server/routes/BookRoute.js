import express from "express";
import { bookController } from "../controllers/bookCRUD.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/:id", bookController.getSingleBook);
router.get("/", bookController.getAllBooks);
router.post(
  "/create",
  authMiddleware.authenticateUser,
  authMiddleware.authorizeAdmin,
  bookController.addBook
);

router.put(
  "/update/:id",
  authMiddleware.authenticateUser,
  authMiddleware.authorizeAdmin,
  bookController.updateBook
);
router.delete(
  "/delete/:id",
  authMiddleware.authenticateUser,
  authMiddleware.authorizeAdmin,
  bookController.deleteBook
);

export const BookRouter = router;
