import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  
  if (req.userRole !== "admin") {
    throw new AppError(403, "Access denied. Admin privileges required");
  }

  next();
};