import userService from "../services/userServices.js";

const getAllUsers = async (req, res) => {
    console.log(req.user)
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User retrieved successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userService.deleteUser(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};