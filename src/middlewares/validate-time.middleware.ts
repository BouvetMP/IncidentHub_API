import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export const validateTimeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { estimatedMinutes } = req.body;

  if (typeof estimatedMinutes !== "number" || isNaN(estimatedMinutes)) {
    throw new AppError(400, "Estimated minutes must be a valid number");
  }

  if (!Number.isInteger(estimatedMinutes)) {
    throw new AppError(400, "Estimated minutes must be an integer");
  }

  if (estimatedMinutes <= 0) {
    throw new AppError(400, "Estimated minutes must be greater than 0");
  }

  if (estimatedMinutes > 480) {
    throw new AppError(400, "Estimated minutes cannot exceed 480 (8 hours)");
  }

  next();
};