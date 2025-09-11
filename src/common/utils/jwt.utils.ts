import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export interface Payload {
  userId: Types.ObjectId;
  role: "user" | "admin";
}

const generateToken = (payload: Payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};

export default generateToken;
