import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    // Add additional validation or complexity requirements if needed
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
  token: [
    {
      type: Object,
      // Consider providing more specific details about the structure of these objects
    },
  ],
  bio: {
    type: String,
  },
  picture: {
    type: String,
  },
  favoriteBooks: {
    type: [mongoose.Schema.Types.ObjectId],
    // Consider referencing another collection (e.g., "Book") using ObjectId
  },
  freqList: {
    type: [
      {
        category: String,
        frequency: Number,
      },
    ],
  },
});

// Create the User model using the schema
export const User = mongoose.model("User", userSchema);
