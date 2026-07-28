import Category from "../models/Category.js";

const getAllCategories = async () => {
  return await Category.find();
};

const getCategoryById = async (id) => {
  return await Category.findById(id);
};

const createCategory = async (categoryData) => {
  const existingCategory = await Category.findOne({
    name: categoryData.name,
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  return await Category.create(categoryData);
};

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
};