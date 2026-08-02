import { z } from "zod";

const updateCartSchema = z.object({
    quantity: z
        .number()
        .int()
        .min(1, "Quantity must be at least 1"),
});

export default updateCartSchema;