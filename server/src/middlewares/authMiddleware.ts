import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import STATUS_CODES from '../utils/StatusCodes.js';
import RequestError from '../types/errors/RequestError.js';

const authHandler = asyncHandler( async (req, _res, next) => {
  const token = req.cookies.jwt;

  if (!token) 
    throw new RequestError('Not authorized, no token', STATUS_CODES.UNAUTHORIZED);
  
  if(!process.env.JWT_SECRET){
    console.error('JWT_SECRET not defined');
    process.exit(1);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    console.error(error);
    throw new RequestError('Not authorized, token failed', STATUS_CODES.UNAUTHORIZED);
  }
  
});

export { authHandler };