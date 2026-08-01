import { z } from "zod";

const productSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Product name must be at least 3 characters"),

    price: z
        .number()
        .positive("Price must be greater than 0"),

    description: z
        .string()
        .trim()
        .min(10, "Description must be at least 10 characters"),

    stock: z
        .number()
        .int("Stock must be an integer")
        .min(0, "Stock cannot be negative"),

    category: z
        .string()
        .min(1, "Category is required"),

    images: z
        .array(z.string())
        .optional()
        .default([]),
});

export default productSchema;