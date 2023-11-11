import { Types } from "mongoose";
import UserModel from "../models/userModel.js";
import User from "../types/User.js";

const addUser = async (user: User) => {
    return await UserModel.create(user);
}

const getUser = async (userId: Types.ObjectId) => {
	return await UserModel.findById(userId);
}

const getUserByEmail = async (email: string) => {
    return await UserModel.findOne({email});
}


export default {addUser, getUser, getUserByEmail};
