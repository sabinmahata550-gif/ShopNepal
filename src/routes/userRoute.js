import userConteroller from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ADMIN_ROLE } from "../constants/userRole.js";
import multer from "multer"
const upload = multer({ storage: multer.memoryStorage() })
const router = express.Router();

router.get("/", authMiddleware, roleBasedAuth(ADMIN_ROLE), userConteroller.getAllUsers);
router.put("/profile-image", authMiddleware,upload.single("image"), userConteroller.updateprofileImage);
router.get("/:id", authMiddleware, userConteroller.getUserById);
router.put("/:id", authMiddleware, roleBasedAuth(ADMIN_ROLE), userConteroller.updateUser);
router.patch("/:id/roles", authMiddleware, roleBasedAuth(ADMIN_ROLE), userConteroller.updateUserRoles);

router.delete("/:id", authMiddleware, roleBasedAuth(ADMIN_ROLE), userConteroller.deleteUser);

export default router;