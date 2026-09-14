import { z } from "zod";

const productSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Product name must be at least 2 characters")
        .max(100, "Product name must not exceed 100 characters"),

    brand: z
        .string()
        .trim()
        .min(2, "Brand is required"),

    category: z
        .string()
        .trim()
        .min(2, "Category is required"),

    price: z
        .number()
        .positive("Price must be greater than 0"),

    stock: z
        .number()
        .int("Stock must be a whole number")
        .min(0, "Stock cannot be negative"),

    description: z
        .string()
        .trim()
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description must not exceed 1000 characters")
});

export default productSchema;