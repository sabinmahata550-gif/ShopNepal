import { z } from "zod";
import { emailRegex, passwordRegex } from "../constants/regex.js";
import { ADMIN_ROLE,MERCHANT_ROLE,CUSTOMER_ROLE } from "../constants/userRole.js";
const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must not exceed 50 characters"),

    email: z
        .string()
        .trim()
        .regex(emailRegex, "Invalid email address"),

    password: z
        .string()
        .regex(
            passwordRegex,
            "Password must contain 8+ characters, uppercase, lowercase, number and special character"
        ),
    role: z
        .enum([ADMIN_ROLE, MERCHANT_ROLE, CUSTOMER_ROLE])
        .optional(),
    phone: z
        .string()
        .regex(/^[0-9]{10}$/, "Phone must be exactly 10 digits"),

    address: z
        .array(
            z.object({
                province: z.string().min(2, "Province is required"),
                district: z.string().min(2, "District is required"),
                city: z.string().min(2, "City is required"),
                street: z.string().min(2, "Street is required")
            })
        )
        .min(1, "At least one address is required")
});

const loginSchema = z.object({
    identifier: z
        .string()
        .trim()
        .min(1, "Email or phone is required"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
});

export {
    registerSchema,
    loginSchema
};