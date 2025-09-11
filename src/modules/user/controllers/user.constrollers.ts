import { Request, Response } from "express";

// import services
import userServices from "../services/user.services";

// fetch all users
const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = userServices.getAllUsers();
    return res.status(200).json({
      success: true,
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

const userControllers = {
  getAllUsers,
};

export default userControllers;
