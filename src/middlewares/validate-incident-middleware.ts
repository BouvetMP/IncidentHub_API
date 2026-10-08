import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export const validateIncidentMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, description, reporter, location, priority, estimatedMinutes } = req.body;

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    throw new AppError(400, "Title is required and must be a non-empty string");
  }


  if (!description || typeof description !== "string" || description.trim().length === 0) {
    throw new AppError(400, "Description is required and must be a non-empty string");
  }

  if (!reporter || typeof reporter !== "string" || reporter.trim().length === 0) {
    throw new AppError(400, "Reporter is required and must be a non-empty string");
  }


  if (!location || typeof location !== "string" || location.trim().length === 0) {
    throw new AppError(400, "Location is required and must be a non-empty string");
  }


  if (priority === undefined || priority === null) {
    throw new AppError(400, "Priority is required");
  }


  if (estimatedMinutes === undefined || estimatedMinutes === null) {
    throw new AppError(400, "Estimated minutes is required");
  }

  next();
};