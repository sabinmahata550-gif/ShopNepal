import express from "express";
import userController from "../controllers/userController.js";
import validate from "../middlewares/validateMiddleware.js";
import { loginSchema, registerSchema } from "../validators/userValidator.js";
const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.post("/login",validate(loginSchema), userController.loginUser);
router.post("/register",validate(registerSchema), userController.registerUser);
export default router;