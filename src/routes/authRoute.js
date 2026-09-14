import authController from "../controllers/authController.js";
import express from "express";
import { loginSchema, registerSchema } from "../validators/authValidator.js";
import validate from "../middlewares/validate.js";
const router = express.Router();

router.post("/register",validate(registerSchema), authController.registerUser);
router.post("/login",validate(loginSchema), authController.loginUser);

export default router;