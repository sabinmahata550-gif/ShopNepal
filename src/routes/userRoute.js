import userConteroller from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";
const router = express.Router();

router.get("/", authMiddleware, userConteroller.getAllUsers);
router.get("/:id", authMiddleware, userConteroller.getUserById);
router.put("/:id", authMiddleware, userConteroller.updateUser);
router.delete("/:id", authMiddleware, userConteroller.deleteUser);

export default router;