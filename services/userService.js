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

const loginUser = async ({ email, phone, password }) => {
  const user = await User.findOne({
    $or: [
      { email: email },
      { phone: phone }
    ]
  });

  if (!user) {
    throw new Error("Invalid email/phone or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email/phone or password");
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    address: user.address,
  };
};

const registerUser = async (userData) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      address
    } = userData;

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      throw new Error("Email or phone already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
    });

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    };
  } catch (error) {
    throw error;
  }
};
export default {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  registerUser,
};