import { Request, Response } from "express";
import authServices from "../services/auth.services";
import { sendSuccess, sendError } from "../../../shared/utils/response";

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await authServices.login({ username, password });

    return sendSuccess({
      res,
      message: "Admin logged successfully",
      data: { user, token },
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
      message: "Internal server error",
    });
  }
};

const authController = {
  login,
};

export default authController;
