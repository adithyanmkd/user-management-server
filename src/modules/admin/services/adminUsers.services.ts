// import models
import UserModel from "../../../shared/models/user.model";

// import types
import { User } from "../../../shared/types/user";

const adminUsersService = {
  // fetch all users
  getAllUsers: async () => {
    try {
      const users = await UserModel.find({ role: "user" });
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

  // delete user
  deleteUser: async (userId: string) => {
    try {
      const user = await UserModel.findByIdAndDelete(userId);
      if (!user) {
        throw Error("User not found");
      }

      return {
        name: user.name,
        email: user.email,
        role: user.role,
      };
    } catch (error) {
      throw error;
    }
  },

  // update user
  updateUser: async ({
    userId,
    name,
    role,
  }: {
    userId: string;
    name: string;
    role: "user" | "admin";
  }): Promise<User> => {
    try {
      const user = await UserModel.findByIdAndUpdate(
        userId,
        { name, role },
        { new: true }
      );

      if (!user) {
        throw Error("User not found!!.");
      }

      // console.log("updated user:", user);
      return user;
    } catch (error) {
      throw error;
    }
  },
};

export default adminUsersService;
