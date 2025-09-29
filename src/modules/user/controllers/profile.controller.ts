import { Request, Response } from "express";

// import services
import profileServices from "../services/profile.services";

import { AuthenticatedRequest } from "../../../middleware/auth";

// update name, avatar
const changeName = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const userId = user.userId;
    let updatedUser = await profileServices.changeName({
      userId,
      name,
    });

    return res.status(200).json({
      success: true,
      message: "profile updated successfully.",
      data: updatedUser,
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
      message: "profile update failed!",
    });
  }
};

// change password
const changePassword = async (req: AuthenticatedRequest, res: Response) => {
  try {
    console.log("req.body log: ", req.body);
    const user = req.user;
    const { currentPassword, newPassword } = req.body;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const userId = user.userId;
    const updatedUser = await profileServices.changePassword({
      userId,
      currentPass: currentPassword,
      newPass: newPassword,
    });

    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
      user: updatedUser,
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
      message: "Internal server error.",
    });
  }
};

const profileController = {
  changeName,
  changePassword,
};

export default profileController;
