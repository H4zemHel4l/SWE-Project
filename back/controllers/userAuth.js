import validator from "validator";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sendVerificationEmail from "../middleware/emailVerfication.js";
const creatToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
// regesiter

const register = async (req, res) => {
  try {
    let { name, email, userName, password, role } = req.body;

    let user = await User.findOne({ email });

    if (user) return res.status(400).send("User already exists");

    if (!validator.isEmail(email)) return res.status(400).send("Invalid Email");

    if (!validator.isStrongPassword(password))
      return res.status(400).send("Password not strong");

    user = new User({ name, email, userName, password, role });

    user.password = await bcrypt.hash(password, 10);

    await user.save();

    sendVerificationEmail(user.email, user._id);

    const token = creatToken(user._id);

    res
      .status(200)
      .send({ _id: user._id, name: user.name, email, role, token });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
// login
const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) return res.status(400).send("Invalid Email or password");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).send("Invalid password");

    const token = creatToken(user._id);

    res
      .status(200)
      .send({ _id: user._id, name: user.name, email, role: user.role, token });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

//get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//update
const updateUserProfile = async (req, res) => {
  try {
    const { name, bio, picture } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, bio, picture },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// logout the user
const logoutUser = (req, res) => {
  res.status(200).send("User logged out successfully");
};
export const userController = {
  register,
  login,
  getUserProfile,
  updateUserProfile,
};
