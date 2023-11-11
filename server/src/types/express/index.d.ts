import { Types } from "mongoose";

// Augment the Express Request type with a user property
declare global {
  namespace Express {
    interface Request {
      userId: Types.ObjectId;
    }
  }
}
