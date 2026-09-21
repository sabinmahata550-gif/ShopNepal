import { ADMIN_ROLE, SUPER_ADMIN_ROLE } from "../constants/userRole.js";
import User from "../models/User.js";
import uploadFile from "../utils/fileUploader.js";


const getAllUsers = async (query) => {

    try {
        const limit = Number(query.limit) || 10;
        const skip = Number(query.skip) || 0;
        const filters = {}
        const { name, email, phone } = query;
        if (email) filters.email = {
            $regex: email,
            $options: "i"
        };
        if (phone) filters.phone = {
            $regex: phone,
            $options: "i"
        };

        if (name) filters.name = {
            $regex: name,
            $options: "i"
        };
        const users = await User.find(filters).sort({ createdAt: 1 }).skip(skip).limit(limit);
        return users;
    } catch (error) {
        throw new Error("Error fetching users: " + error.message);
    }
}

const getUserById = async (id, authUser) => {
    try {
        if (authUser.id != id && !authUser.roles.includes(ADMIN_ROLE)) {
            throw {
                status: 403,
                message: "Access denied."
            }
        }
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw new Error("Error fetching user: " + error.message);
    }
}

const updateUser = async (id, data, authUser) => {
    try {
        if (authUser.id != id && !authUser.roles.includes(ADMIN_ROLE)) {
            throw {
                status: 403,
                message: "Access denied."
            }
        }
        const updatedUser = await User.findByIdAndUpdate(
            id, {
            name: data?.name,
            phone: data?.phone,
            address: data?.address,
            isActive: data?.isActive

        },
            { new: true });
        return updatedUser;
    } catch (error) {
        throw new Error("Error updating user: " + error.message);
    }

}

const deleteUser = async (id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
    } catch (error) {
        throw new Error("Error deleting user: " + error.message);
    }
}

const updateprofileImage = async (id, file) => {
    const profileUrl = await uploadFile([file]);
    return await User.findByIdAndUpdate(id, {
        profileImageUrl: profileUrl
    }, {
        new: true
    })
}

const updateUserRoles = async (id, roles, authUser) => {
    console.log(roles);
    console.log(authUser)
    if (roles.includes(ADMIN_ROLE) || roles.includes(SUPER_ADMIN_ROLE)
        && !authUser.roles.includes(SUPER_ADMIN_ROLE)) {
        throw {
            status: 403,
            message: "Access denied."
        }
    }

    return await User.findByIdAndUpdate(id, { roles }, { new: true })
}
export default {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    updateprofileImage,
    updateUserRoles
};