import { email, z } from "zod";
import {
    emailRegex,
    passwordRegex,
    phoneRegex,
} from "../constants/authRegex.js";

export const registerSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50)
        .trim(),

    email: z
        .string()
        .regex(emailRegex, "Please enter a valid email")
        .trim()
        .toLowerCase(),

    phone: z
        .string()
        .regex(phoneRegex, "Please enter a valid Nepal phone number"),

    password: z
        .string()
        .regex(
            passwordRegex,
            "Password must contain 8+ characters, uppercase, lowercase, number and special character"
        ),

    address: z
        .string()
        .min(3, "Address must be at least 3 characters")
        .optional(),
});

export const loginSchema = z.object({
  email: z.string().regex(emailRegex).optional(),
  phone: z.string().regex(phoneRegex).optional(),
  password: z.string().min(1, "Password is required"),
}).refine(
  (data) => data.email || data.phone,
  {
    message: "Email or phone is required",
    path: ["email"],
  }
);