import userService from "../services/userServices.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers(req.query);

        res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id, req.user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User retrieved successfully", user });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }

}

const updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body, req.user);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
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


const updateprofileImage = async (req, res) => {
    try {
        const user = await userService.updateprofileImage(req.user.id, req.file);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }

}



const updateUserRoles = async (req, res) => {
    try {
        const user = await userService.updateUserRoles(req.params.id, req.body?.roles, req.user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }

}

export default {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    updateprofileImage,
    updateUserRoles
};