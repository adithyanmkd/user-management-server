import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface JwtPayload {
  userId: string;
  email?: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

declare global {
  namespace NodeJs {
    interface ProcessEnv {
      JWT_SECRET: string;
    }
  }
}

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  // console.log("header log: ", req.header);

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        error: "Token missing",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
      if (err) {
        console.error(err);
        return res.sendStatus(403);
      }

      req.user = user as JwtPayload;
      next();
    });
  } else {
    console.error("Auth header not found");
    res.sendStatus(403);
  }
};
