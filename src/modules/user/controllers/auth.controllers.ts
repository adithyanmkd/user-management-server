import { Request, Response } from "express";

import authServices from "../services/auth.services";
import { AuthenticatedRequest } from "../../../middleware/auth";

// login controller
const login = async (req: Request, res: Response) => {
  try {
    const credentials = req.body;
    const user = await authServices.login(credentials);

    return res.status(200).json({
      success: true,
      message: "User logged successfully.",
      data: user,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "user login failed",
    });
  }
};

// create user controller
const register = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log("data log: ", data);
    const user = await authServices.register(data);

    return res.status(200).json({
      success: true,
      message: "User created successfully.",
      data: user,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create user.",
    });
  }
};

// get current user (for profile)
const currentUser = async (req: AuthenticatedRequest, res: Response) => {
  if (req.user) {
    return res.json({
      userId: req.user.userId,
      role: req.user.role,
    });
  } else {
    res.status(403).json({
      error: "User not authenticated.",
    });
  }
};

const authControllers = {
  login,
  register,
  currentUser,
};

export default authControllers;
