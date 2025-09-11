// import models
import UserModel from "../models/user.model";

// import types
import { User } from "../../../common/types/user.types";

const userServices = {
  // fetch all users
  getAllUsers: async () => {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      throw error;
    }
  },

  // create user service
  createUser: async (data: User) => {
    try {
      let user = await UserModel.findOne({ email: data.email });

      if (user) {
        throw new Error("User already exists.");
      }

      user = await UserModel.create(data);
      return user;
    } catch (error) {
      throw error;
    }
  },
};

export default userServices;
