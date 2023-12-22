import { Book } from "../models/book.model.js";

import { validationResult } from "express-validator";

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({}, { __v: false });
    res.json({ status: "Success", data: { books } });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

const getSingleBook = async function (req, res) {
  try {
    const book = await Book.findById(req.params.id);
    if (!book)
      return res
        .status(404)
        .json({ status: "Fail", data: { book: "not found" } });
    return res.json({ status: "Success", data: { book } });
  } catch (err) {
    return res
      .status(400)
      .json({ status: "Error", data: null, message: err.message, code: 400 });
  }
};

const addBook = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ status: "Fail", data: { errors: errors.array() } });
  const book = new Book(req.body);
  await book.save();
  res.json({ status: "Success", data: { book } });
};

const updateBook = async function (req, res) {
  try {
    const book = await Book.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    return res.status(200).json({ status: "Success", data: { book } });
  } catch (err) {
    return res
      .status(400)
      .json({ status: "Error", data: null, message: err.message, code: 400 });
  }
};

const deleteBook = async function (req, res) {
  try {
    const book = await Book.deleteOne({ _id: req.params.id });
    return res.status(200).json({ status: "Success", data: null });
  } catch (err) {
    return res
      .status(400)
      .json({ status: "Error", data: null, message: err.message, code: 400 });
  }
};

export const bookController = {
  getAllBooks,
  getSingleBook,
  addBook,
  updateBook,
  deleteBook,
};
