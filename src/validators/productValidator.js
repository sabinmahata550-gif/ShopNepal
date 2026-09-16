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
        .string(),

    stock: z
        .string()
});

export default productSchema;