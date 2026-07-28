import User from "../models/User.js";
import bcrypt from "bcrypt";
const getAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

const getUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
};

const createUser = async (userData) => {
  try {
    const existingUser = await User.findOne({
      email: userData.email,
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return await User.create({
      ...userData,
      password: hashedPassword,
    });
  } catch (error) {
    throw error;
  }
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  }

};

export default {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
};