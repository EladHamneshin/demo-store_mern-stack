import UserModel from "../models/userModel.js";
import User from "../types/User.js";

const addUser = async (user: User) => {
    return await UserModel.create(user);
}

export default {addUser};