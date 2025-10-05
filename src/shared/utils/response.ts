import { Response } from "express";

import { STATUS } from "../../shared/constants/statusCodes";

// types
export interface SuccessResponse {
  res: Response;
  status?: number;
  message: string;
  data?: any;
}

export const sendSuccess = ({
  res,
  status = STATUS.OK,
  message,
  data = null,
}: SuccessResponse) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

export interface ErrorResponse {
  res: Response;
  status?: number;
  message: string;
}

export const sendError = ({
  res,
  status = STATUS.INTERNAL_SERVER_ERROR,
  message,
}: ErrorResponse) => {
  return res.status(status).json({
    success: false,
    message,
  });
};
