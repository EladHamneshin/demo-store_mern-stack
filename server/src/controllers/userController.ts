import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import STATUS_CODES from "../utils/StatusCodes.js";
import RequestError from "../types/errors/RequestError.js";
import userService from "../services/userService.js";
import userValidation from "../utils/validations/userValidation.js";


// @desc    Register a new user
// @route   POST  /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {

    const { error } = userValidation(req.body);
    if (error)
      throw new RequestError(error.message, STATUS_CODES.BAD_REQUEST);
    
    const user = await userService.addUser(req.body);
  
    res.status(STATUS_CODES.CREATED).json({
      _id: user._id,
      email: user.email,
    });
});

// @desc    Get user
// @route   GET /api/users
// @access  Private
const getUser = asyncHandler(async (req, res) => {  
  const user = await userService.getUser(req.userId);

  res.json({
    _id: user._id,
    email: user.email,
  });
});

export default { registerUser, getUser };