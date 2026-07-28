import User from "../models/User.js";
import bcrypt from "bcrypt";


 const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ message: "getAllUsers retrieved successfully", users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

 const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default { getAllUsers, getUserById, createUser };