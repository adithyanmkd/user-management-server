import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// import models
import UserModel from "../../../shared/models/user.model";
import { verifyPassword } from "../../../shared/utils/password.utils";

type ChangeNameType = {
  userId: string;
  name: string;
};

type ChangePasswordType = {
  userId: String;
  currentPass: string;
  newPass: string;
};

const profileServices = {
  // change name service
  changeName: async ({ userId, name }: ChangeNameType) => {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { name },
        { new: true }
      );

      return updatedUser;
    } catch (error) {
      throw error;
    }
  },

  // edit password service
  changePassword: async ({
    currentPass,
    newPass,
    userId,
  }: ChangePasswordType) => {
    let user = await UserModel.findById(userId);
    if (!user) {
      throw Error("User not found");
    }

    const isMatch = await verifyPassword(currentPass, user.password);
    if (!isMatch) {
      throw Error("Invalid password");
    }

    // hash passoword
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPass, salt);
    await user.save();

    try {
    } catch (error) {
      throw error;
    }
  },
};

export default profileServices;
