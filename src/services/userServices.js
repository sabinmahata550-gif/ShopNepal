import User from "../models/User.js";


const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    }catch (error) {
        throw new Error("Error fetching users: " + error.message);
    }
}

const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    }catch (error) {
        throw new Error("Error fetching user: " + error.message);
    }
}

const updateUser = async (id, updateData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id, updateData,
            { new: true });
        return updatedUser;
    }catch (error) {
        throw new Error("Error updating user: " + error.message);
    }

}

const deleteUser = async (id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
    }catch (error) {
        throw new Error("Error deleting user: " + error.message);
    }
}

export default {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};