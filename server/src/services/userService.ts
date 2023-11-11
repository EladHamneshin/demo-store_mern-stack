import User from "../types/User.js";
import userDal from "../dal/userDal.js";
import STATUS_CODES from "../utils/StatusCodes.js";
import RequestError from "../types/errors/RequestError.js";
import { hashPassword } from "../utils/encryptionUtils.js";

const addUser = async (user: User) => {
	const { email, password } = user;
	const isUserRegistered  = await userDal.getUserByEmail(email);

	if (isUserRegistered) 
		throw new RequestError('Email already exists', STATUS_CODES.BAD_REQUEST);

	const hashedPassword = await hashPassword(password);
	const newUser = userDal.addUser({ email, password: hashedPassword });

	return newUser;
}

export default { addUser };