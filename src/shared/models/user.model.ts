import mongoose, { Document } from "mongoose";
import type { UserDocument } from "../types/user.types";

const UserSchema = new mongoose.Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
