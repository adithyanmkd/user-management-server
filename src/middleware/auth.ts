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
  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header missing",
    });
  }

  const [schema, token] = authHeader.split(" ");
  if (schema !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Invalid authorization format",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export const adminOnly = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(401).json({
      message: "Forbidden: admin only",
    });
  }

  next();
};
