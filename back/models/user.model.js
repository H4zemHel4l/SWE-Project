import mongoose from "mongoose";
const userShcema = new mongoose.Schema({
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
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
  bio: {
    type: String,
  },
  picture: {
    type: String,
  },
  favoriteBooks: {
    type: [mongoose.Schema.Types.ObjectId],
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
export const User = mongoose.model("User", userShcema);
