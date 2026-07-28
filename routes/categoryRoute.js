import categoryController from "../controllers/categoryController.js";
import express from "express";

const router=express.Router();

router.get("/",categoryController.getAllCategories);
router.get("/:id",categoryController.getCategoryById);
router.post("/",categoryController.createCategory);


export default router;