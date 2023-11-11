import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const generateToken = (res: Response, userId: Types.ObjectId) => {
    if(!process.env.JWT_SECRET) {
        console.error('JWT_SECRET not defined');
        process.exit(1);
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
    });

    res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
};

export default generateToken;