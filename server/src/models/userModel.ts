import mongoose from 'mongoose';
import User from '../types/User.js';

const userSchema = new mongoose.Schema<User>(
  {
    email: {
        type: String,
        required: true,
        minlength: 5,
        validate: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    },
    password: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);


const UserModel = mongoose.model('User', userSchema);

export default UserModel;