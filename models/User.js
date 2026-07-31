import mongoose from "mongoose";
import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_MERCHANT } from "../constants/userRole.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },

   role: {
  type: String,
  enum: [ROLE_CUSTOMER, ROLE_MERCHANT, ROLE_ADMIN],
  default: ROLE_CUSTOMER,
},
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;