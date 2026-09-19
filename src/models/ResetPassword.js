import mongoose from "mongoose";

const resetPasswordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User id is required."],
    },

    token: {
        type: String,
        required: [true, "Token is required."],

    },

    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 3600000),
        immutable: true
    },
    isUsed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export default mongoose.model("ResetPassword", resetPasswordSchema);