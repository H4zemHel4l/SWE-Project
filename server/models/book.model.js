import mongoose from "mongoose";

// Define the book schema
const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  pdfLink: {
    type: String,
    required: true,
    // Add additional validation if needed, e.g., match: /^https?:\/\// for URL format
  },
});

// Create the Book model using the schema
export const Book = mongoose.model("Book", bookSchema);

// Optionally, you might want to export the bookSchema for potential reuse or reference
// export const BookSchema = bookSchema;
