import { Request, Response } from "express";

import { sendSuccess, sendError } from "../../../shared/utils/response";

// import services
import userServices from "../services/adminUsers.services";
import adminUsersService from "../services/adminUsers.services";
import { User } from "../../../shared/types/user";

// fetch all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userServices.getAllUsers();
    console.log("users log: ", users);

    return sendSuccess({
      res,
      message: "Users fetched successfully.",
      data: users,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users.",
    });
  }
};

// delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      throw new Error("User id not found");
    }

    await adminUsersService.deleteUser(userId);
    const users = await adminUsersService.getAllUsers();

    return sendSuccess({
      res,
      message: "Successfully deleted user",
      data: users,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return sendError({
        res,
        message: error.message,
      });
    }

    return sendError({
      res,
      message: "Somthing went wrong",
    });
  }
};

// update user
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { name, role } = req.body;

    if (!userId) {
      throw new Error("User id not found");
    }

    // console.log("req.body:", req.body);
    const updatedUser = await userServices.updateUser({
      userId: userId,
      name: name,
      role: role,
    });

    const users = await userServices.getAllUsers();

    return sendSuccess({
      res,
      message: `${updatedUser.name} details successfully updated.`,
      data: users,
    });
  } catch (error) {
    if (error instanceof Error) {
      return sendError({
        res,
        message: error.message,
      });
    }

    return sendError({
      res,
      message: "Something went wrong",
    });
  }
};

const adminUsersController = {
  getAllUsers,
  deleteUser,
  updateUser,
};
export default adminUsersController;
