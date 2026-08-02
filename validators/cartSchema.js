import { z } from "zod";

const cartSchema = z.object({
    productId: z
        .string()
        .trim()
        .min(1, "Product ID is required"),

    quantity: z
        .number({
            required_error: "Quantity is required",
            invalid_type_error: "Quantity must be a number",
        })
        .int("Quantity must be an integer")
        .min(1, "Quantity must be at least 1"),
});

export default cartSchema;