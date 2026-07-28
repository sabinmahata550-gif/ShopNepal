import userService from "../service/userService.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";


const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      message: "Users retrived successfully",
      users
    })
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }
    res.status(200).json({
      message: "User retrieved successfully",
      user
    })
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
};

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      message: "User created successfully",
      user
    })
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await userService.loginUser(req.body);

    const token = await generateToken.generateToken(user);
    console.log("decoded id", decoded);
    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

export default { getAllUsers, getUserById, createUser, loginUser };